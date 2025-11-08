export default async function analyzeImage(imageUrl: string) {
    fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
            }
            reader.readAsDataURL(blob)
        })
}