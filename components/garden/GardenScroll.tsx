'use client';

import { useRef, useState, useEffect } from 'react';
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

export default function GardenScroll({ plants }: { plants: PlantWithType[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const posRef = useRef({ left: 0, x: 0 });

    // Set initial scroll position to center
    useEffect(() => {
        if (scrollRef.current) {
            const scrollWidth = scrollRef.current.scrollWidth;
            const clientWidth = scrollRef.current.clientWidth;
            scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
        }
    }, [plants]);

    // Generate positions using plant ID as seed for consistency
    const getPlantPosition = (plantId: string) => {
        const random1 = seededRandom(plantId + '_bottom');

        // Random vertical position in bottom 1/3 (0% to 33% from bottom)
        // Round to 4 decimal places to ensure server/client match
        const bottom = Math.round(random1 * 33 * 10000) / 10000;

        // Size based on vertical position (further back = smaller)
        const sizeMultiplier = Math.round((0.4 + (1 - bottom / 33) * 0.6) * 10000) / 10000;

        // Z-index based on vertical position
        const zIndex = Math.floor((1 - bottom / 33) * 50);

        return {
            bottom: `${bottom}%`,
            size: sizeMultiplier,
            zIndex: zIndex,
        };
    };

    // Calculate horizontal position with center clustering for first plants
    const getHorizontalPosition = (index: number, totalPlants: number) => {
        // Center is at 50vw (since total width is 200vw, center is at 100vw, which is 50% of 200vw)
        const center = 50; // vw units

        if (totalPlants <= 3) {
            // For few plants, cluster them tightly in the center
            return `${center + (index - totalPlants / 2) * 8}vw`;
        } else {
            // First 3-5 plants cluster near center, rest spread out
            if (index < 3) {
                // First 3 plants very close to center
                return `${center + (index - 1) * 10}vw`;
            } else {
                // Remaining plants spread out more
                return `${center + (index - 1) * 15 - 10}vw`;
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const ele = scrollRef.current;
        if (!ele) return;

        setIsDragging(true);

        posRef.current = {
            left: ele.scrollLeft,
            x: e.clientX,
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!ele) return;

            const dx = e.clientX - posRef.current.x;
            ele.scrollLeft = posRef.current.left - dx;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <>
            <div
                ref={scrollRef}
                className={`flex-1 overflow-x-auto overflow-y-hidden relative ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
                onMouseDown={handleMouseDown}
                style={{ userSelect: 'none' }}
            >
                {/* Scrolling Background */}
                <div className="absolute inset-0 pointer-events-none" style={{ minWidth: '200vw' }}>
                    <Image
                        src="/background.jpg"
                        alt="Garden background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {plants.length === 0 ? (
                    <div></div>
                ) : (
                    <div className="h-full relative" style={{ minWidth: '200vw' }}>
                        {plants.map((plant, index) => {
                            const position = getPlantPosition(plant.id);
                            const horizontalPos = getHorizontalPosition(index, plants.length);
                            return (
                                <div
                                    key={plant.id}
                                    className="absolute select-none pointer-events-none"
                                    style={{
                                        left: horizontalPos,
                                        bottom: position.bottom,
                                        zIndex: position.zIndex,
                                        transform: `scale(${position.size})`,
                                        transformOrigin: 'bottom center',
                                    }}
                                >
                                    <Plant name={plant.plantType.plantRegion} plant={plant.plantType.imageUrl} />
                                </div>
                            );
                        })}
                        {/* Spacer to ensure scrollability */}
                        <div className="absolute right-0 w-screen h-full"></div>
                    </div>
                )}
            </div>

            {/* Scroll hint */}
            {plants.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-emerald-700 text-sm font-medium animate-pulse shadow-lg pointer-events-none z-[100]">
                    <span className="hidden sm:inline">Drag to scroll →</span>
                    <span className="sm:hidden">Swipe →</span>
                </div>
            )}
        </>
    );
}