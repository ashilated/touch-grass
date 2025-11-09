import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            posts: true,
            garden: {
                include: { plants: true },
            },
        },
    });

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-emerald-100">
                <p className="text-gray-700 text-center">User not found.</p>
            </div>
        );
    }

    const posts = user.posts;
    const plants = user.garden?.plants || [];

    return (
        <div className="min-h-screen bg-emerald-100">
            <div className="max-w-5xl mx-auto px-0 sm:px-8 lg:px-16">
                {/* Banner Section */}
                <div className="relative">
                    <Button className="w-full h-32 sm:h-48 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-base sm:text-lg font-medium">
                        <Link href={`/profile/${username}/garden`}>{user.name}&#39;s Garden</Link>
                    </Button>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-lg">
                            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                <Image
                                    src={"/defaultpic.png"}
                                    alt={`${user.username}'s profile picture`}
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-4 sm:pb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                </div>

                {/* Posts Section */}
                <div className="px-4 sm:px-8 pb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        {user.name}&#39;s Posts
                    </h2>

                    {posts.length === 0 ? (
                        <p className="text-gray-600 text-sm">No posts yet.</p>
                    ) : (
                        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:opacity-90 transition-opacity"
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Garden Plants Section */}
                <div className="px-4 sm:px-8 pb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Garden Plants
                    </h2>

                    {plants.length === 0 ? (
                        <p className="text-gray-600 text-sm">No plants in garden.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {plants.map((plant) => (
                                <div
                                    key={plant.id}
                                    className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm"
                                >
                                    <Image
                                        src={plant.imageUrl}
                                        alt={plant.plantRegion}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="p-2 text-center text-xs sm:text-sm text-gray-700 bg-white">
                                        {plant.plantRegion}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
