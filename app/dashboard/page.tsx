import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");

    if (!userId) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: userId.value },
        include: { posts: true },
    });

    if (!user) redirect("/login");

    return (
        <div className="min-h-screen bg-emerald-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
                {/* --- Banner --- */}
                <div className="relative">
                    <div className="w-full w-min-56 h-32 sm:h-48 bg-gradient-to-r from-green-400 to-emerald-500 rounded-none flex items-center justify-center text-white text-lg sm:text-xl font-semibold shadow-sm">
                        My Garden
                    </div>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-lg">
                            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                                <Image
                                    src="/defaultpic.png"
                                    alt="Profile Picture"
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- User Info --- */}
                <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-4 sm:pb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {user.name}
                    </h1>
                    <p className="text-gray-600">@{user.username}</p>
                </div>

                {/* --- Images Grid --- */}
                <div className="px-4 sm:px-8 pb-10">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        My Images
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Upload New Image */}
                        <Link
                            href="/upload"
                            className="aspect-rectangle bg-white rounded-lg flex items-center justify-center text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition"
                        >
                            <span className="text-sm sm:text-base font-medium">
                                + Upload Image
                            </span>
                        </Link>

                        {/* User Images */}
                        {user.posts.length > 0 ? (
                            user.posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={500}
                                        height={500}
                                        className="size-full sm:h-60 object-cover"
                                    />

                                    <div className="absolute bottom-0 left-0 w-full px-2 py-1 sm:px-3 sm:py-2">
                                        <h3 className="text-white text-xs sm:text-sm font-medium truncate text-center drop-shadow-md">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <div className="col-span-full text-gray-500 text-center py-6">
                                You haven’t uploaded any plants yet 🌱
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
