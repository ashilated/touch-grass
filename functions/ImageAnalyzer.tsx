import exifr from 'exifr'

export default async function ImageAnalyzer() {
    try {
        const {latitude, longitude} = await exifr.gps('https://github.com/ianare/exif-samples/blob/master/jpg/Canon_40D_photoshop_import.jpg?raw=true')
        console.log(latitude, longitude)
    } catch (error) {
        console.log("no metadata for this image")
    }
}