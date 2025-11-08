import exifr from 'exifr'

export default async function ImageAnalyzer() {
    await exifr.parse('https://github.com/ianare/exif-samples/blob/master/jpg/Canon_40D_photoshop_import.jpg?raw=true')
        .then(output => console.log(output))
}