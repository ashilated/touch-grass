import {PrismaClient, Prisma, $Enums} from "@/app/generated/prisma";
import PlantRegion = $Enums.PlantRegion;

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [

];

export async function main() {
    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
            gardens: {}
        }
    })

    const bamboo = await prisma.plant.create({
        data: {
            imageUrl: "/plants/bamboo.png",
            plantRegion: PlantRegion.CHINA,
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
            plantRegion: PlantRegion.US,
            gardens: {}
        }
    })
}

main();