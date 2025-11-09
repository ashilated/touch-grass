import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddFriend from "@/functions/AddFriend";
import Link from "next/link";

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
    "use server";

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
        <div className="min-h-screen bg-emerald-100">
            <div className="max-w-2xl mx-auto p-8 space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">Search For Users</h1>

                <form className="flex gap-2">
                    <Input
                        type="text"
                        name="q"
                        placeholder="Search by username..."
                        defaultValue={query}
                        className="bg-white"
                    />
                    <Button type="submit">Search</Button>
                </form>

                {query && (
                    <div className="space-y-4 mt-6">
                        <h2 className="text-lg font-semibold">Results for &#34;{query}&#34;</h2>
                        {results.length === 0 && <p>No users found.</p>}
                        {results.map((r) => (
                            <div
                                key={r.id}
                                className="flex justify-between items-center border p-3 rounded-lg bg-white hover:bg-green-50"
                            >
                                {/* User info - clickable link */}
                                <Link
                                    href={`/profile/${r.username}`}
                                    className="flex-1 min-w-0"
                                >
                                    <div>
                                        <p className="font-medium hover:text-emerald-600">{r.name}</p>
                                        <p className="text-sm text-gray-500">@{r.username}</p>
                                    </div>
                                </Link>

                                {/* Add friend button - separate from link */}
                                {friendUsernames.includes(r.username) ? (
                                    <span className="text-green-600 font-medium flex-shrink-0 ml-4">✅ Added</span>
                                ) : (
                                    <form action={addFriendWrapper} className="flex-shrink-0 ml-4">
                                        <input type="hidden" name="friendName" value={r.name} />
                                        <input type="hidden" name="friendUsername" value={r.username} />
                                        <Button type="submit" variant="secondary" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                            Add
                                        </Button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}