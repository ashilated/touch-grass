import {PrismaClient, Prisma, $Enums} from "@/app/generated/prisma";
import PlantRegion = $Enums.PlantRegion;

const prisma = new PrismaClient();

export async function main() {
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
}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })