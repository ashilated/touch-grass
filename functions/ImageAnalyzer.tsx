import exifr from 'exifr'
import { getNearestCity } from 'offline-geocode-city'

export default async function ImageAnalyzer(image: File) {

    try {
        const {latitude, longitude} = await exifr.gps(image)
        console.log(latitude, longitude)
        const nearestCity = getNearestCity(latitude, longitude)
        console.log(nearestCity)

    } catch (error) {
        console.log("no metadata for this image")
    }
}
