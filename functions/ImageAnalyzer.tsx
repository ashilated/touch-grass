import exifr from 'exifr'

export default async function ImageAnalyzer(image: File) {
    try {
        const {latitude, longitude} = await exifr.gps(image)
        console.log(latitude, longitude)
    } catch (error) {
        console.log("no metadata for this image")
    }
}