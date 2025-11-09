import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AppRootPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");

    if (!userId) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId.value },
    });

    if (!user) {
        redirect("/login");
    } else {
        redirect("/dashboard");
    }

    return null;
}
