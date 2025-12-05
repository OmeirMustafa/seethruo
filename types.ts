export interface AnalysisResult {
  stats: {
    wordCount: number;
    sentenceCount: number;
    readingTime: string;
  };
  scores: {
    confidence: number; // 0-100
    bias: number; // -50 (Left) to +50 (Right)
    emotion: {
      joy: number;
      anger: number;
      fear: number;
      sadness: number;
      trust: number;
    };
  };
  intents: { label: string; score: number }[];
  claims: Claim[];
  entities: Entity[];
  blindspots: string[];
  recommendations: string[];
  timeline: TimelineEvent[];
}

export interface Claim {
  text: string;
  index: number; // Sentence index
  type: 'numeric' | 'assertion';
}

export interface Entity {
  text: string;
  type: 'ORG' | 'PERSON' | 'LOC' | 'UNKNOWN';
  count: number;
}

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface KnowledgeBaseItem {
  q: string;
  a: string;
  keywords: string[];
}

export interface KnowledgeBase {
  meta: {
    version: string;
    lastUpdated: string;
  };
  faqs: KnowledgeBaseItem[];
}