export function cleanPlantSlug(slug: string): string {
  // 1. The primary filter: Look for "-plant" and cut off everything after it
  const plantMatch = slug.match(/^(.*?-plant)(?:-|$)/);
  
  if (plantMatch) {
    return plantMatch[1]; 
  }

  // 2. The fallback filter: If the slug doesn't contain the word "-plant",
  // we can fall back to cutting off at "-with-" (e.g., "golden-pothos-with-pot")
  const withMatch = slug.split('-with-');
  if (withMatch.length > 1) {
    return withMatch[0];
  }

  // 3. If it's already a clean slug, just return it
  return slug;
}