import {Button} from "@/components/ui/button";
import Link from "next/link";
import analyzeImage from "@/functions/ImageAnalyzer";

export default async function Home() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <Button><Link href="/login">Log In</Link></Button>
            <Button><Link href="/signup">Sign Up</Link></Button>
        </div>
    );
}