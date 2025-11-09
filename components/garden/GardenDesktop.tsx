'use client';

import Image from 'next/image';
import Plant from "@/components/plants/plant";

interface PlantType {
    id: string;
    imageUrl: string;
    plantRegion: string;
}

interface PlantWithType {
    id: string;
    plantType: PlantType;
}

// Seeded random function for consistent server/client rendering
function seededRandom(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash;
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

export default function GardenDesktop({ plants }: { plants: PlantWithType[] }) {
    // Generate positions using plant ID as seed for consistency
    const getPlantPosition = (plantId: string, index: number, totalPlants: number) => {
        const random1 = seededRandom(plantId + '_bottom');
        const random2 = seededRandom(plantId + '_horizontal');

        // Random vertical position in bottom 1/3 (0% to 33% from bottom)
        // Round to 4 decimal places to ensure server/client match
        const bottom = Math.round(random1 * 33 * 10000) / 10000;

        // Size based on vertical position (further back = smaller)
        const sizeMultiplier = Math.round((0.4 + (1 - bottom / 33) * 0.6) * 10000) / 10000;

        // Z-index based on vertical position
        const zIndex = Math.floor((1 - bottom / 33) * 50);

        // Horizontal position spread across the width
        const left = Math.round((random2 * 80 + 10) * 10000) / 10000; // 10% to 90% from left

        return {
            bottom: `${bottom}%`,
            left: `${left}%`,
            size: sizeMultiplier,
            zIndex: zIndex,
        };
    };

    return (
        <div className="w-full h-full relative">
            {/* Background Image - fills container */}
            <Image
                src="/background.jpg"
                alt="Garden background"
                fill
                className="object-cover"
                priority
            />

            {plants.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center px-4 z-10 bg-gray-400 opacity-80">
                    <div className="text-center">
                        <p className="text-white font semibold text-lg">No plants in garden yet.</p>
                        <p className="text-white font-semibold text-sm">
                            Start posting to grow your garden!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0">
                    {plants.map((plant, index) => {
                        const position = getPlantPosition(plant.id, index, plants.length);
                        return (
                            <div
                                key={plant.id}
                                className="absolute select-none"
                                style={{
                                    left: position.left,
                                    bottom: position.bottom,
                                    zIndex: position.zIndex,
                                    transform: `scale(${position.size})`,
                                    transformOrigin: 'bottom center',
                                }}
                            >
                                <Plant name={plant.id} plant={plant.plantType.imageUrl} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}