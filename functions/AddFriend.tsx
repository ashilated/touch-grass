'use server'

import {cookies} from "next/headers";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export default async function AddFriend(friendName: string, friendUsername: string) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")
    if (!userId) {redirect("/login")}

    await prisma.friend.create({
        data: {
            friendName: friendName,
            friendUsername: friendUsername,
            userId: userId.value
        }
    })

   revalidatePath(`/profile/${friendUsername}`)
}