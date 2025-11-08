import ImageAnalyzer from "@/functions/ImageAnalyzer";

export default function UploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    ImageAnalyzer(file)
}