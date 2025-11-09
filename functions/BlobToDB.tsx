'use server'

import prisma from '@/lib/prisma'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {$Enums} from "@/app/generated/prisma";
import PlantRegion = $Enums.PlantRegion;

export default async function BlobToDB(url:string, location:string) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')
    if (!userId) {
        redirect("/")
    }

    const title = location
    const image = url

    let locEnum: PlantRegion
    switch (location) {
        case 'China':
            locEnum = 'CHINA' as PlantRegion
            break
        case 'Japan':
            locEnum = 'JAPAN' as PlantRegion
            break
        case 'India':
            locEnum = 'INDIA' as PlantRegion
            break
        case 'France':
            locEnum = 'FRANCE' as PlantRegion
            break
        case 'South Africa':
            locEnum = 'SOUTH_AFRICA' as PlantRegion
            break
        case 'Canada':
            locEnum = 'CANADA' as PlantRegion
            break
        case 'Mexico':
            locEnum = 'MEXICO' as PlantRegion
            break
        case 'Brazil':
            locEnum = 'BRAZIL' as PlantRegion
            break
        case 'Australia':
            locEnum = 'AUSTRALIA' as PlantRegion
            break
        default:
            locEnum = 'USA' as PlantRegion
    }


    const plant = await prisma.plantType.findFirst({
        where: {plantRegion: locEnum},
    })


    await prisma.user.update({
        where: {id: userId.value},
        data: {
            posts: {
                create: {
                    title,
                    image
                }
            },
            garden: {
                update: {
                    plants: {
                        create: {
                            // @ts-expect-error this will never be null
                            plantTypeId: plant.id
                        }
                    }
                }
            }
        }
    })
}