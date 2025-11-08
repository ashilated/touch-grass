import prisma from '@/lib/prisma'

const user = await prisma.user.findMany();
export default async function Dashboard() {

}