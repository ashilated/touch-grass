import ImageAnalyzer from "@/functions/ImageAnalyzer";

export default async function UploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    return await ImageAnalyzer(file)
}
