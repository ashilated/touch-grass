import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center -mt-16">
            <h1>Log in</h1>
            <Button>
                <Link href="/signup">Sign up</Link>
            </Button>
        </div>
    );
}