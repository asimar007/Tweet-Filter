import type { Settings, InstantResult } from "./types";

// ============================================
// KEYWORD LISTS FOR INSTANT FILTERING
// ============================================



// Confidence thresholds

/**
 * Instant keyword-based classification — no API call needed.
 * Returns 'uncertain' when confidence is too low for either direction.
 */
export function classifyInstant(
  text: string,
  settings: Settings,
): InstantResult {
  const lowerText = text.toLowerCase();

  let blockScore = 0;
  let blockCategory: string | null = null;
  let matchedKeyword: string | undefined = undefined;
  let allowScore = 0;

  // Check block keywords
  const categories: Record<string, boolean> = {
    politics: settings.blockPolitics,
    racism: settings.blockRacism,
    religion: settings.blockReligion,
    war: settings.blockWar,
    controversial: settings.blockControversial,
  };

  for (const [category, enabled] of Object.entries(categories)) {
    if (!enabled) continue;

    const keywords = (settings as any)[`${category}Keywords`] ?? [];
    let categoryMatches = 0;
    let firstMatchInCategory: string | undefined = undefined;

    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      if (regex.test(text)) {
        categoryMatches++;
        if (!firstMatchInCategory) {
          firstMatchInCategory = keyword;
        }
      }
    }

    if (categoryMatches > 0) {
      const categoryScore = Math.min(0.5 + categoryMatches * 0.15, 1.0);
      if (categoryScore > blockScore) {
        blockScore = categoryScore;
        blockCategory = category;
        matchedKeyword = firstMatchInCategory;
      }
    }
  }

  // Check custom keywords
  if (settings.customKeywords && settings.customKeywords.length > 0) {
    for (const keyword of settings.customKeywords) {
      // Escape special characters in the custom keyword just in case
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, "i");
      if (regex.test(text)) {
        // High block score for custom keywords since the user explicitly added them
        blockScore = 1.0;
        blockCategory = "custom";
        matchedKeyword = keyword;
        break;
      }
    }
  }

  // Decision logic
  if (blockScore >= 0.3) {
    return {
      decision: "hide",
      blockScore,
      blockCategory: blockCategory ?? undefined,
      method: "keyword",
      matchedKeyword,
    };
  } else {
    return { decision: "show", confidence: 0.9, method: "keyword" };
  }
}
