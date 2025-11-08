"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadFile from "@/functions/UploadFile";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        if (!f) return;

        if (f.type !== "image/jpeg" && f.type !== "image/pjpeg") {
            setMessage("Please select a JPEG file only.");
            return;
        }

        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
        setMessage(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please choose a JPEG file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setIsUploading(false);

        if (res.ok) {
            setMessage("Upload successful!");
            setFile(null);
            setPreviewUrl(null);
        } else {
            setMessage(data.error || "Upload failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="p-6 border rounded-2xl shadow-sm bg-background w-full max-w-md bg-green-200">
                <h1 className="text-2xl font-semibold mb-4 text-center">Upload</h1>

                <form action={UploadFile} className="space-y-4">
                    <Input
                        type="file"
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