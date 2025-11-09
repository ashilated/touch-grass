'use server'

import prisma from '@/lib/prisma'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function BlobToDB(url:string, location:string) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')
    if (!userId) {
        redirect("/")
    }

    const title = location
    const image = url

    await prisma.user.update({
        where: {id: userId.value},
        data: {
            posts: {
                create: {
                    title,
                    image
                }
            }
        },
        include: {
            posts: true
        }
    })
}