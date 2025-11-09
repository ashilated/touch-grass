import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddFriend from "@/functions/AddFriend";

// --- helper to get the logged-in user ---
async function getUserFromCookies() {
    const cookieStore = cookies();
    const userId = (await cookieStore).get("userId");
    if (!userId) redirect("/login");

    const user = await prisma.user.findUnique({ where: { id: userId.value } });
    if (!user) redirect("/login");
    return user;
}

// --- server action wrapper ---
async function addFriendWrapper(formData: FormData) {
    "use server"; // ✅ This marks it as a server action

    const friendName = formData.get("friendName") as string;
    const friendUsername = formData.get("friendUsername") as string;

    await AddFriend(friendName, friendUsername);
}

// --- main page ---
export default async function LookupPage({
                                             searchParams,
                                         }: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const user = await getUserFromCookies();

    const query = params?.q?.trim() || "";

    // --- search users ---
    const results = query
        ? await prisma.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: "insensitive",
                },
                NOT: { id: user.id },
            },
            select: { id: true, name: true, username: true },
        })
        : [];

    // --- existing friends ---
    const friends = await prisma.friend.findMany({
        where: { userId: user.id },
        select: { friendUsername: true },
    });
    const friendUsernames = friends.map((f) => f.friendUsername);

    return (
        <div className="max-w-2xl mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-bold">🔍 Friend Lookup</h1>

            <form className="flex gap-2">
                <Input
                    type="text"
                    name="q"
                    placeholder="Search by username..."
                    defaultValue={query}
                />
                <Button type="submit">Search</Button>
            </form>

            {query && (
                <div className="space-y-4 mt-6">
                    <h2 className="text-lg font-semibold">Results for "{query}"</h2>
                    {results.length === 0 && <p>No users found.</p>}
                    {results.map((r) => (
                        <form
                            key={r.id}
                            action={addFriendWrapper}
                            className="flex justify-between items-center border p-3 rounded-lg"
                        >
                            <div>
                                <p className="font-medium">{r.name}</p>
                                <p className="text-sm text-gray-500">@{r.username}</p>
                            </div>

                            {friendUsernames.includes(r.username) ? (
                                <span className="text-green-600 font-medium">✅ Added</span>
                            ) : (
                                <>
                                    <input type="hidden" name="friendName" value={r.name} />
                                    <input type="hidden" name="friendUsername" value={r.username} />
                                    <Button type="submit" variant="secondary">
                                        Add
                                    </Button>
                                </>
                            )}
                        </form>
                    ))}
                </div>
            )}
        </div>
    );
}