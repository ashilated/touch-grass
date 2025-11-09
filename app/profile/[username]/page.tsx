import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import {cookies} from "next/headers";
import {User} from "@/app/generated/prisma";
import AddFriendButton from "@/components/add-friend-button";

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
                include: {
                    plants: {
                        include: {
                            plantType: true
                        }
                    }
                },
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

    // Check if viewing own profile
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId');
    const isOwnProfile = userId?.value === user.id;

    let isFriend = false;
    if (userId && !isOwnProfile) {
        const existingFriend = await prisma.friend.findFirst({
            where: {
                userId: userId.value,
                friendUsername: user.username
            }
        });
        isFriend = existingFriend !== null;
    }

    const posts = user.posts;
    const plants = user.garden?.plants || [];


    return (
        <div className="min-h-screen bg-emerald-100">
            <div className="max-w-5xl mx-auto px-0 sm:px-8 lg:px-16">
                {/* Banner Section */}
                <div className="relative">
                    <div className="w-full w-min-56 h-32 sm:h-48 bg-[url('garden_bg.webp')] bg-cover bg-center rounded-none flex items-end justify-end p-2 text-white text-lg sm:text-xl font-semibold shadow-sm">
                        {user.name}&#39;s Garden
                    </div>

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
                {!isOwnProfile && !isFriend && (
                    <div className="float-right mt-3 mr-3 sm:mr-0 ">
                        <AddFriendButton user={user as User}/>
                    </div>
                )}
                {!isOwnProfile && isFriend && (
                    <button className="float-right mt-3 mr-3 sm:mr-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        Friends ✓
                    </button>
                )}

                {/* User Info */}
                <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-4 sm:pb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                            <p className="text-gray-600 text-sm">@{user.username}</p>
                        </div>

                    </div>
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
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            Garden Plants
                        </h2>
                        {plants.length > 0 && (
                            <Link
                                href={`/profile/${username}/garden`}
                                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                            >
                                View Garden →
                            </Link>
                        )}
                    </div>

                    {plants.length === 0 ? (
                        <p className="text-gray-600 text-sm">No plants in garden.</p>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
                            {plants.slice(0, 6).map((plant) => (
                                <div
                                    key={plant.id}
                                    className="aspect-square rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={plant.plantType.imageUrl}
                                        alt={plant.plantType.plantRegion}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="p-2 text-center text-xs sm:text-sm text-gray-700">
                                        {plant.plantType.plantRegion.replace('_', ' ')}
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