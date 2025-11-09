"use server"

export default function LookupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="p-6 border rounded-2xl shadow-sm bg-background w-full max-w-md bg-blue-200">
                <h1 className="text-2xl font-semibold mb-4 text-center">Lookup</h1>
                <p className="text-center text-gray-700">This is the lookup page.</p>
            </div>
        </div>
    );
}