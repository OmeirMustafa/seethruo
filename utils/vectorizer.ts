// A lightweight character n-gram Jaccard similarity utility
// This is NOT a real embedding model, but sufficient for small prototypes.

export function getSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;
  
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // Exact match bonus
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);

  const intersection = bigrams1.filter(bg => bigrams2.includes(bg)).length;
  const union = bigrams1.length + bigrams2.length - intersection;

  return union === 0 ? 0 : intersection / union;
}

function getBigrams(str: string): string[] {
  const bigrams: string[] = [];
  for (let i = 0; i < str.length - 1; i++) {
    bigrams.push(str.slice(i, i + 2));
  }
  return bigrams;
}

export function findBestMatch(query: string, candidates: {q: string, a: string}[]): { match: {q: string, a: string} | null, score: number } {
  let bestScore = -1;
  let bestMatch = null;

  for (const item of candidates) {
    // Check main question similarity
    const scoreQ = getSimilarity(query, item.q);
    
    // Check if query contains any specific keywords from the question
    const keywords = item.q.toLowerCase().split(' ').filter(w => w.length > 4);
    const keywordHits = keywords.filter(k => query.toLowerCase().includes(k)).length;
    const keywordScore = keywords.length > 0 ? (keywordHits / keywords.length) * 0.5 : 0;

    const finalScore = Math.max(scoreQ, keywordScore);

    if (finalScore > bestScore) {
      bestScore = finalScore;
      bestMatch = item;
    }
  }

  return { match: bestMatch, score: bestScore };
}