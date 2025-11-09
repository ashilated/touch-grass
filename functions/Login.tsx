'use server'

import prisma from "@/lib/prisma";
import {cookies} from "next/headers";


export default async function Login(formData: FormData) {
    const un = formData.get("username") as string
    const pw = formData.get("password") as string

    const user = await prisma.user.findUnique({
        where: { username: un },
    })
    if (!user) {
        throw new Error("No user found")
    }
    if (pw !== user.password) {
        throw new Error("Wrong password")
    }
    console.log("logged in")
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id.toString(), {expires: 60 * 100 * 100})
}