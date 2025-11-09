import prisma from '@/lib/prisma'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {Post} from "@/app/generated/prisma";

export default async function Dashboard() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')
    if (!userId) {
        redirect("/")
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId.value) }
    })

    if (!user) {
        redirect("/")
    }

    const posts = await prisma.user.findUnique({
        where: { id: parseInt(userId.value) }
    }).posts()


    return (
        <div className="min-h-screen bg-emerald-100">
            {/* Main Content Container with side padding */}
            <div className="max-w-5xl mx-auto px-0 sm:px-8 lg:px-16">
                {/* Banner Section with Profile Picture */}
                <div className="relative">
                    {/* Garden Banner - Clickable */}
                    <Button className="w-full h-32 sm:h-48 rounded-none bg-gradient-to-r from-green-400 to-emerald-500 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="w-full h-full flex items-center justify-center text-white text-base sm:text-lg">
                            My Garden
                        </div>
                    </Button>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-lg">
                            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                {/* Replace with actual profile image */}
                                <Image src="/defaultpic.png" alt="user pfp" width={100} height={100} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-4 sm:pb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                </div>

                {/* Images Grid */}
                <div className="px-4 sm:px-8 pb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">My Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {/* Upload New Image Card */}
                        <Button className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-sm w-full h-full">
                            <Link href="/upload" className="text-xs sm:text-sm text-emerald-700 size-full inline-flex items-center justify-center">Upload Image</Link>
                        </Button>

                        {/* User Images */}
                        {posts && posts.map((post) => (
                            <div
                                key={post.id}
                                className="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                            >
                                {/* Replace with actual images */}
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    📷<h2>{post.title}</h2>
                                        <Image src={post.image} alt="user image" width={400} height={400}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}