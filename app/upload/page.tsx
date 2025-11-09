"use client";
import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import {useState, ChangeEvent, FormEvent, useRef} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlobToDB from "@/functions/BlobToDB";
import UploadFile from "@/functions/UploadFile";
import ImageAnalyzer from "@/functions/ImageAnalyzer";
import {redirect} from "next/navigation";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputFileRef.current?.files) {
            setMessage("Please choose a JPEG file first.");
            return;
        }
        const file = inputFileRef.current.files[0];

        const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/image/upload'
        })

        setBlob(newBlob);

        if (newBlob) await BlobToDB(newBlob.url, await ImageAnalyzer(file))

        redirect("/dashboard")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="p-6 border rounded-2xl shadow-sm bg-background w-full max-w-md bg-green-200">
                <h1 className="text-2xl font-semibold mb-4 text-center">Upload</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="file"
                        ref={inputFileRef}
                        accept="image/jpeg"
                        name="file"
                        className="bg-white"
                    />

                    {previewUrl && (
                        <div className="border rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewUrl} alt="Preview" className="object-contain w-full max-h-64" />
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isUploading}>
                        {isUploading ? "Uploading…" : "Upload JPEG"}
                    </Button>
                </form>

                {message && (
                    <p className="text-sm mt-4 text-center text-muted-foreground">{message}</p>
                )}
            </div>
        </div>
    );
}