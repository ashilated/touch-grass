import {PrismaClient, Prisma, $Enums} from "@/app/generated/prisma";
import PlantRegion = $Enums.PlantRegion;

const prisma = new PrismaClient();

export async function main() {
    const testUser = await prisma.user.create({
        data: {
            username: "john123",
            name: "John Vercel",
            password: "test",
            posts: {},
            garden: {
                create: {}
            }
        }
    })

    const testUser2 = await prisma.user.create({
        data: {
            username: "bob123",
            name: "Bob Prisma",
            password: "test",
            posts: {},
            garden: {
                create: {}
            }
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const tulsi = await prisma.plant.create({
        data: {
            imageUrl: "/plants/tulsi.png",
            plantRegion: PlantRegion.INDIA,
            gardens: {}
        }
    })

    const protea = await prisma.plant.create({
        data: {
            imageUrl: "/plants/protea.png",
            plantRegion: PlantRegion.SOUTH_AFRICA,
            gardens: {}
        }
    })

    const princessFlower = await prisma.plant.create({
        data: {
            imageUrl: "/plants/princessflower.png",
            plantRegion: PlantRegion.BRAZIL,
            gardens: {}
        }
    })

    const mexicanMarigold = await prisma.plant.create({
        data: {
            imageUrl: "/plants/mexicanmarigold.png",
            plantRegion: PlantRegion.MEXICO,
            gardens: {}
        }
    })

    const lavender = await prisma.plant.create({
        data: {
            imageUrl: "/plants/lavender.png",
            plantRegion: PlantRegion.FRANCE,
            gardens: {}
        }
    })

    const kangarooPaw = await prisma.plant.create({
        data: {
            imageUrl: "/plants/kangaroopaw.png",
            plantRegion: PlantRegion.AUSTRALIA,
            gardens: {}
        }
    })

    const commonMilkweed = await prisma.plant.create({
        data: {
            imageUrl: "/plants/commonmilkweed.png",
            plantRegion: PlantRegion.CANADA,
            gardens: {}
        }
    })

    const cherryBlossom = await prisma.plant.create({
        data: {
            imageUrl: "/plants/cherryblossom.png",
            plantRegion: PlantRegion.JAPAN,
            gardens: {}
        }
    })

    const blackEyedSusan = await prisma.plant.create({
        data: {
            imageUrl: "/plants/blackeyedsusan.png",
            plantRegion: PlantRegion.USA,
            gardens: {}
        }
    })

    // seed a garden for testuser
    await prisma.user.update({
        where: {username: "john123"},
        data: {
            garden: {
                update: {
                    plants: {
                        connect: [
                            { id: bamboo.id },
                            { id: tulsi.id },
                            { id: lavender.id },
                            { id: cherryBlossom.id },
                            { id: blackEyedSusan.id },
                            { id: bamboo.id },
                            { id: tulsi.id },
                            { id: lavender.id },
                            { id: cherryBlossom.id },
                            { id: blackEyedSusan.id }
                        ]
                    }
                }
            }
        }
    })



}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })