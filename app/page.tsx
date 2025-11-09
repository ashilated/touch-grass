import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    return (
        <div className="min-h-screen bg-emerald-100">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {/* Main Content */}
                    <div className="text-center space-y-8 max-w-3xl">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
                            Touch Grass
                        </h1>

                        <p className="text-xl sm:text-2xl text-green-800 max-w-2xl mx-auto">
                            A gamified social site to share your adventures while competing with friends to grow the best garden.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg w-48"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg w-48"
                                >
                                    Log In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}