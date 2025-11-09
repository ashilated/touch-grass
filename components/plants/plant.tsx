import Image from "next/image";

export default function Plant(props: {name: string, plant: string}) {
    const name = props.name
    const plant = props.plant

    return (
        <div className="relative w-24 sm:w-32 hover:text-white text-white/0">
            <Image
                className="w-full h-auto object-contain drop-shadow-lg"
                src={plant}
                alt={name}
                width={128}
                height={192}
                unoptimized
            />
            <p className="absolute text-center text-3xl pb-32">{name}</p>
        </div>
    )
}