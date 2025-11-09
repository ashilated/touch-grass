import prisma from "@/lib/prisma";
import Link from "next/link";
import GardenScroll from "@/components/garden/GardenScroll";
import GardenDesktop from "@/components/garden/GardenDesktop";

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
        <>
            {/* Mobile View */}
            <div className="md:hidden h-screen flex flex-col overflow-hidden">
                {/* Header - Fixed at top */}
                <div className="bg-emerald-100 px-4 py-4 z-10 flex-shrink-0">
                    <Link
                        href={`/profile/${username}`}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-3 text-sm font-medium"
                    >
                        ← Back to Profile
                    </Link>
                    <h1 className="text-xl font-bold mb-1">
                        {user.name}&#39;s Garden
                    </h1>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                    <p className="text-gray-500 text-xs mt-1">
                        {plants.length} {plants.length === 1 ? "plant" : "plants"}
                    </p>
                </div>

                {/* Scrollable Garden */}
                <GardenScroll plants={plants} />
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex md:flex-col h-screen overflow-hidden">
                {/* Header - Fixed at top */}
                <div className="bg-emerald-100 px-8 py-6 z-10 flex-shrink-0">
                    <Link
                        href={`/profile/${username}`}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4 text-sm font-medium"
                    >
                        ← Back to Profile
                    </Link>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                        {user.name}&#39;s Garden
                    </h1>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                    <p className="text-gray-500 text-sm mt-1">
                        {plants.length} {plants.length === 1 ? "plant" : "plants"}
                    </p>
                </div>

                {/* Static Garden */}
                <div className="flex-1 min-h-0">
                    <GardenDesktop plants={plants} />
                </div>
            </div>
        </>
    );
}