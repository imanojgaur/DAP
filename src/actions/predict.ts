'use server';

export async function getCropPrediction(soilData: any) {
  try {

    // 1. Grab the URL and force TypeScript to treat it as a String
    const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL as string;

    // 2. Double-check just in case  actually did forget it in the .env file
    if (!apiUrl) {
      return { success: false, error: 'Server configuration error: Missing API URL.' };
    }

    // This fetch happens SERVER-SIDE, hitting your Python Island
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(soilData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, crop: data.recommended_crop };
    } else {
      return { success: false, error: data.error || 'AI Engine failed.' };
    }
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: 'Network error. Is Python running?' };
  }
}