import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

export default async function FriendsLeaderboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    if (!userId) redirect("/login");

    // Fetch user + friends
    const user = await prisma.user.findUnique({
        where: { id: userId.value },
        select: {
            id: true,
            username: true,
            name: true,
            garden: { include: { plants: true } },
            friends: {
                select: {
                    friendUsername: true,
                    friendName: true,
                },
            },
        },
    });

    if (!user) redirect("/login");

    // Collect usernames (you + friends)
    const usernames = [user.username, ...user.friends.map((f) => f.friendUsername)];

    // Get plant counts
    const leaderboardData = await prisma.user.findMany({
        where: { username: { in: usernames } },
        select: {
            id: true,
            username: true,
            name: true,
            garden: { select: { plants: true } },
        },
    });

    // Sort leaderboard
    const leaderboard = leaderboardData
        .map((u) => ({
            id: u.id,
            username: u.username,
            name: u.name,
            plantCount: u.garden?.plants?.length || 0,
        }))
        .sort((a, b) => b.plantCount - a.plantCount);

    // Helper to color top 3
    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-500 drop-shadow-sm";
            case 2:
                return "text-gray-400 drop-shadow-sm";
            case 3:
                return "text-amber-700 drop-shadow-sm";
            default:
                return "text-emerald-700";
        }
    };

    return (
        <div className="min-h-screen bg-emerald-100 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Friends Leaderboard</h1>

                <Card className="shadow-md border border-emerald-200">
                    <CardContent>
                        <div className="divide-y divide-emerald-100">
                            {leaderboard.map((person, index) => (
                                <Link
                                    key={person.id}
                                    href={`/profile/${person.username}`}
                                    className={`flex items-center justify-between gap-4 p-4 rounded-lg transition-all transform ${person.username === user.username
                                        ? "bg-green-200 font-semibold"
                                        : "hover:bg-green-100 hover:scale-[1.01]"
                                    }`}
                                >
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <span
                                            className={`w-6 text-lg font-bold text-right flex-shrink-0 ${getRankColor(
                                                index + 1
                                            )}`}
                                        >
                                            {index + 1}.
                                        </span>
                                        <Image
                                            src="/defaultpic.png"
                                            alt={`${person.username}'s profile picture`}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-gray-900 truncate">{person.name}</p>
                                            <p className="text-sm text-gray-500 truncate">
                                                @{person.username}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-emerald-700 font-bold flex-shrink-0 whitespace-nowrap">
                                        {person.plantCount} {person.plantCount === 1 ? 'plant' : 'plants'}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}