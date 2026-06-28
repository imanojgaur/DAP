"use client";

import { useState } from "react";
import { getCropPrediction } from "@/actions/";

export default function CropRecommendationForm() {
    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    // 1. The Configuration Array (The single source of truth for the UI)
    const inputFields = [
        { name: "N", label: "Nitrogen (N)" },
        { name: "P", label: "Phosphorus (P)" },
        { name: "K", label: "Potassium (K)" },
        { name: "temperature", label: "Temperature (°C)" },
        { name: "humidity", label: "Humidity (%)" },
        { name: "ph", label: "pH Level" },
        // Notice the special flag for rainfall to handle the grid span
        { name: "rainfall", label: "Rainfall (mm)", fullWidth: true }, 
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult("");

        try {
            const formattedData = {
                N: parseFloat(formData.N),
                P: parseFloat(formData.P),
                K: parseFloat(formData.K),
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity),
                ph: parseFloat(formData.ph),
                rainfall: parseFloat(formData.rainfall),
            };

            const response = await getCropPrediction(formattedData);

            if (response.success) {
                setResult(response.crop);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError("Something went wrong submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Intelligent Crop Advisor
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your soil metrics below to get an AI-powered crop recommendation.
                    </p>
                </div>

                {/* The Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        
                        {/* 2. The Loop (Generates all 7 inputs dynamically) */}
                        {inputFields.map((field) => (
                            <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    type="number"
                                    name={field.name}
                                    required
                                    step="any"
                                    onChange={handleChange}
                                    // TypeScript safely extracts the key
                                    value={formData[field.name as keyof typeof formData]} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                        ))}

                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            }`}
                        >
                            {loading ? "Analyzing Soil Data..." : "Get AI Recommendation"}
                        </button>
                    </div>
                </form>

                {/* Display Error */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md text-center">
                        {error}
                    </div>
                )}

                {/* Display Result */}
                {result && (
                    <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center transform transition-all duration-500 scale-105">
                        <h3 className="text-lg font-medium text-green-800">
                            Hay farmer! DAP Systems Recommend Crop to Plant:
                        </h3>
                        <p className="mt-2 text-4xl font-extrabold text-green-600 capitalize tracking-wide">
                            {result}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}