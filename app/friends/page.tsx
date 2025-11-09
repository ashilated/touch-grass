import {cookies} from "next/headers";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function FriendsPage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')
    if (!userId) {redirect("/login")}
    const user = await prisma.user.findUnique({
        where: {id: userId.value},
        include: {friends: true}
    })
    if (!user) {redirect("/login")}
    return (
        <div className="min-h-screen bg-emerald-100 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Friends</h1>

                {user.friends.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {user.friends.map(friend => (
                            <Link
                                key={friend.id}
                                href={`/profile/${friend.friendUsername}`}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                    <Image
                                        src="/defaultpic.png"
                                        alt={`${friend.friendUsername}'s profile picture`}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-3">
                                    <p className="text-sm text-gray-600 truncate">
                                        @{friend.friendUsername}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <p className="text-gray-600 mb-4">No friends yet! Add some!</p>
                        <Link
                            href="/search"
                            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Find Friends
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}