'use server';

// Adjust this import path if your Prisma client is located somewhere else (e.g., '@/db' or '@/prisma')
import prisma from '@/lib/prisma'; 

export async function getPlantRecommendations(preferences: {
  sunlight: string;
  needsPetSafe: boolean;
  wateringHabit: string;
}) {
  try {
    // 1. Fetch all products from your database.
    // We use include: { images: true } so your React UI has the secureUrl to render the picture.
    const allPlants = await prisma.product.findMany({
      include: {
        images: true,
        categories: true,
      },
    });

    // 2. The Weighted Scoring Engine
    const scoredPlants = allPlants.map((plant) => {
      let score = 0;

      // --- PET SAFETY LOGIC (The Dealbreaker) ---
      if (preferences.needsPetSafe && plant.isPetSafe === false) {
        score -= 100; // Massive penalty, do not recommend poison to dogs.
      } else if (preferences.needsPetSafe && plant.isPetSafe === true) {
        score += 40;  // Bonus points for being safe!
      }

      // --- TEXT PARSING PREPARATION ---
      // Since your actual data (like "Needs 1-2 Hrs") is locked inside the Prisma JSON field
      // or the description string, we smash them together into one giant lowercase string 
      // so we can easily search it for keywords.
      const searchString = `${plant.description || ''} ${JSON.stringify(plant.specifications || {})}`.toLowerCase();

      // --- SUNLIGHT LOGIC ---
      if (preferences.sunlight === 'low') {
        if (searchString.includes('low light') || searchString.includes('indirect') || searchString.includes('shadow')) {
          score += 30;
        }
        if (searchString.includes('direct sun') || searchString.includes('bright light')) {
          score -= 20; // Penalty for recommending a sun-lover to a dark room
        }
      } else if (preferences.sunlight === 'bright') {
        if (searchString.includes('bright') || searchString.includes('direct') || searchString.includes('sunlight')) {
          score += 30;
        }
      }

      // --- WATERING LOGIC ---
      if (preferences.wateringHabit === 'forgetful') {
        // If they are lazy, look for plants that like to dry out or only need water every 1-3 weeks.
        if (searchString.includes('1-2 weeks') || searchString.includes('2-3 weeks') || searchString.includes('dry out')) {
          score += 30;
        }
        if (searchString.includes('consistently moist')) {
          score -= 20; // They will kill this plant.
        }
      } else if (preferences.wateringHabit === 'frequent') {
        // If they are a helicopter parent, give them humidity/moisture lovers.
        if (searchString.includes('moist') || searchString.includes('humidity') || searchString.includes('frequent')) {
          score += 30;
        }
      }

      // Return the plant with its new calculated score
      return { ...plant, matchScore: score };
    });

    // 3. Sort them so the highest score is at the top of the array
    const sortedPlants = scoredPlants.sort((a, b) => b.matchScore - a.matchScore);

    // 4. Return ONLY the Top 3 matches. 
    // We filter `score >= 0` so we don't accidentally recommend a toxic plant if there are no good matches.
    const topMatches = sortedPlants.filter((p) => p.matchScore >= 0).slice(0, 3);

    return { success: true, data: topMatches };

  } catch (error) {
    console.error('Prisma Error in getPlantRecommendations:', error);
    return { success: false, error: 'Failed to search the database. Please try again later.' };
  }
}