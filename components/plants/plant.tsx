import Image from "next/image";

export default function Plant(url: string) {
    return (
        <Image src={url} alt="flower" width={48} height={48}/>
    )
}