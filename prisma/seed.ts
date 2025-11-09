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
            },
            friends: {}
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
            },
            friends: {}
        }
    })

    const bamboo = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            plants: {}
        }
    })

    const tulsi = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/tulsi.png",
            plantRegion: PlantRegion.INDIA,
            plants: {}
        }
    })

    const protea = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/protea.png",
            plantRegion: PlantRegion.SOUTH_AFRICA,
            plants: {}
        }
    })

    const princessFlower = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/princessflower.png",
            plantRegion: PlantRegion.BRAZIL,
            plants: {}
        }
    })

    const mexicanMarigold = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/mexicanmarigold.png",
            plantRegion: PlantRegion.MEXICO,
            plants: {}
        }
    })

    const lavender = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/lavender.png",
            plantRegion: PlantRegion.FRANCE,
            plants: {}
        }
    })

    const kangarooPaw = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/kangaroopaw.png",
            plantRegion: PlantRegion.AUSTRALIA,
            plants: {}
        }
    })

    const commonMilkweed = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/commonmilkweed.png",
            plantRegion: PlantRegion.CANADA,
            plants: {}
        }
    })

    const cherryBlossom = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/cherryblossom.png",
            plantRegion: PlantRegion.JAPAN,
            plants: {}
        }
    })

    const blackEyedSusan = await prisma.plantType.create({
        data: {
            imageUrl: "/plants/blackeyedsusan.png",
            plantRegion: PlantRegion.USA,
            plants: {}
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