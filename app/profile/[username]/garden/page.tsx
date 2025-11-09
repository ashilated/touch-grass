import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function GardenPage({
                                             params,
                                         }: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    const user = await prisma.user.findUnique({
        where: { username },
        include: {
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

    const plants = user.garden?.plants || [];

    return (
        <div className="min-h-screen bg-emerald-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
                {/* Back Button */}
                <Link
                    href={`/profile/${username}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 text-sm font-medium"
                >
                    ← Back to Profile
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        {user.name}&#39;s Garden
                    </h1>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                    <p className="text-gray-500 text-sm mt-2">
                        {plants.length} {plants.length === 1 ? "plant" : "plants"}
                    </p>
                </div>

                {/* Garden Grid */}
                {plants.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No plants in garden yet.</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Start posting to grow your garden!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {plants.map((plant) => (
                            <div
                                key={plant.id}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-square relative">
                                    <Image
                                        src={plant.imageUrl}
                                        alt={plant.plantRegion}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <p className="text-center text-sm font-medium text-gray-700">
                                        {plant.plantRegion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}