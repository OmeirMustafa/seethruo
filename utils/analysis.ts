import { AnalysisResult, Claim, Entity, TimelineEvent } from '../types';

// Lexicons
const EMOTION_LEXICON: Record<string, string> = {
  'delighted': 'joy', 'thrilled': 'joy', 'happy': 'joy', 'growth': 'joy', 'success': 'joy',
  'furious': 'anger', 'attack': 'anger', 'fail': 'anger', 'reject': 'anger',
  'worried': 'fear', 'concern': 'fear', 'risk': 'fear', 'threat': 'fear',
  'sad': 'sadness', 'loss': 'sadness', 'regret': 'sadness', 'decline': 'sadness',
  'believe': 'trust', 'commit': 'trust', 'partner': 'trust', 'assure': 'trust'
};

const BIAS_LEXICON = {
  absolute: ['always', 'never', 'everyone', 'nobody', 'undoubtedly', 'obviously'],
  hedging: ['might', 'could', 'perhaps', 'seemingly', 'allegedly'],
  subjective: ['amazing', 'terrible', 'shocking', 'miracle', 'disaster']
};

const INTENT_PATTERNS = [
  { label: 'Promotion', keywords: ['announce', 'launch', 'new', 'excited', 'partnership'] },
  { label: 'Damage Control', keywords: ['apologize', 'mistake', 'correct', 'ensure', 'regret'] },
  { label: 'Persuasion', keywords: ['should', 'must', 'urge', 'critical', 'join'] },
  { label: 'Information', keywords: ['report', 'update', 'status', 'confirm', 'detail'] },
];

export function analyzeText(text: string): AnalysisResult {
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = cleanText.toLowerCase().split(/\W+/).filter(w => w.length > 0);

  // 1. Stats
  const stats = {
    wordCount: words.length,
    sentenceCount: sentences.length,
    readingTime: `${Math.ceil(words.length / 200)} min`
  };

  // 2. Emotion Scoring
  const emotion = { joy: 0, anger: 0, fear: 0, sadness: 0, trust: 0 };
  words.forEach(w => {
    if (EMOTION_LEXICON[w]) {
      // @ts-ignore
      emotion[EMOTION_LEXICON[w]] += 1;
    }
  });

  // Normalize emotions roughly 0-100
  const totalEmotion = Object.values(emotion).reduce((a, b) => a + b, 0) || 1;
  Object.keys(emotion).forEach(k => {
    // @ts-ignore
    emotion[k] = Math.round((emotion[k] / totalEmotion) * 100);
  });

  // 3. Bias & Confidence
  let biasScore = 0;
  let ruleHits = 0;
  
  words.forEach(w => {
    if (BIAS_LEXICON.absolute.includes(w)) { biasScore += 2; ruleHits++; }
    if (BIAS_LEXICON.subjective.includes(w)) { biasScore += 1; ruleHits++; }
    if (BIAS_LEXICON.hedging.includes(w)) { biasScore -= 1; }
  });

  // Clamp bias -50 to 50
  const finalBias = Math.max(-50, Math.min(50, biasScore * 5)); 
  const confidence = Math.min(100, Math.max(40, 60 + (sentences.length * 2) - (ruleHits * 2)));

  // 4. Intent
  const intents = INTENT_PATTERNS.map(pattern => {
    const hits = pattern.keywords.filter(k => cleanText.toLowerCase().includes(k)).length;
    return {
      label: pattern.label,
      score: Math.min(100, hits * 25)
    };
  }).sort((a, b) => b.score - a.score);

  // 5. Entities (Heuristic: Capitalized words not at start of sentence)
  const entityMap: Record<string, Entity> = {};
  sentences.forEach(s => {
    const tokens = s.trim().split(' ');
    tokens.forEach((t, i) => {
      if (i > 0 && /^[A-Z][a-z]+$/.test(t) && t.length > 3) {
        const cleanT = t.replace(/[^\w]/g, '');
        if (!entityMap[cleanT]) entityMap[cleanT] = { text: cleanT, type: 'UNKNOWN', count: 0 };
        entityMap[cleanT].count++;
        // Very simplistic type guess
        if (['Inc', 'Corp', 'Ltd', 'Company'].includes(cleanT)) entityMap[cleanT].type = 'ORG';
      }
    });
  });
  const entities = Object.values(entityMap).sort((a, b) => b.count - a.count).slice(0, 10);

  // 6. Claims
  const claims: Claim[] = [];
  sentences.forEach((s, idx) => {
    let isClaim = false;
    // Check for numbers, %, currency
    if (/\d+%|\$\d+|\d{4}/.test(s)) isClaim = true;
    // Check for claim verbs
    if (/announced|claimed|stated|proven|results/.test(s.toLowerCase())) isClaim = true;
    
    if (isClaim) {
      claims.push({
        text: s.trim(),
        index: idx,
        type: /\d/.test(s) ? 'numeric' : 'assertion'
      });
    }
  });

  // 7. Timeline
  const timeline: TimelineEvent[] = [];
  const years = cleanText.match(/\b(19|20)\d{2}\b/g) || [];
  [...new Set(years)].sort().forEach(year => {
    const relevantSentence = sentences.find(s => s.includes(year)) || "Event detected";
    timeline.push({ date: year, event: relevantSentence.slice(0, 60) + '...' });
  });
  if (timeline.length === 0) {
    timeline.push({ date: 'Today', event: 'Analysis conducted' });
  }

  // 8. Blindspots & Recommendations
  const blindspots = [];
  if (claims.length > 0 && !cleanText.toLowerCase().includes('source')) blindspots.push('Several claims made without explicit source attribution.');
  if (finalBias > 20 || finalBias < -20) blindspots.push('Strong emotive language may indicate framing bias.');
  if (entities.length < 2) blindspots.push('Lack of specific actors or entities mentioned.');

  const recommendations = [
    'Verify primary sources for numeric claims.',
    'Cross-reference dates with external timelines.',
    'Check for omission of key stakeholders.'
  ];

  return {
    stats,
    scores: {
      confidence,
      bias: finalBias,
      emotion
    },
    intents,
    claims,
    entities,
    blindspots,
    recommendations,
    timeline
  };
}