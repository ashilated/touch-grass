'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Plant from "@/components/plants/plant";

interface PlantType {
    id: string;
    imageUrl: string;
    plantRegion: string;
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

export default function GardenScroll({ plants }: { plants: PlantType[] }) {
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
    const getPlantPosition = (plantId: string, index: number, totalPlants: number) => {
        const random1 = seededRandom(plantId + '_bottom');

        // Random vertical position in bottom 2/3 (0% to 67% from bottom)
        const bottom = random1 * 67;

        // Size based on vertical position (further back = smaller)
        const sizeMultiplier = 0.4 + (1 - bottom / 67) * 0.6;

        // Z-index based on vertical position
        const zIndex = Math.floor((1 - bottom / 67) * 50);

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
                    <div className="h-full w-[200vw] flex items-center justify-center px-4 relative z-10">
                        <div className="text-center">
                            <p className="text-white text-lg drop-shadow-lg">No plants in garden yet.</p>
                            <p className="text-white/80 text-sm mt-2 drop-shadow">
                                Start posting to grow your garden!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full relative" style={{ minWidth: '200vw' }}>
                        {plants.map((plant, index) => {
                            const position = getPlantPosition(plant.id, index, plants.length);
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
                                    <Plant name={plant.id} plant={plant.imageUrl} />
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