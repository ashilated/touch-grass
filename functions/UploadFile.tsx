import ImageAnalyzer from "@/functions/ImageAnalyzer";
import { put } from "@vercel/blob";

export default async function UploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    await ImageAnalyzer(file)

}