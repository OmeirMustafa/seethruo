# SeeThruo - Project Plan & Approval Request

## Executive Summary
SeeThruo is a "Decision Intelligence Engine" prototype designed for high-stakes text analysis (press releases, speeches). It provides transparency into bias, intent, and claims using deterministic client-side logic. The visual identity is a "cinematic dark-cyber" aesthetic with premium animations, running entirely in the browser without mandatory API keys.

## File List
1. `metadata.json`: App meta info.
2. `index.html`: Entry point, Tailwind CDN, global fonts, CSS variables.
3. `src/main.tsx`: React root.
4. `src/App.tsx`: Main layout and state manager.
5. `src/types.ts`: TypeScript interfaces for Analysis and KB.
6. `src/utils/analysis.ts`: The core deterministic engine (Regex/Heuristic).
7. `src/utils/vectorizer.ts`: Lightweight n-gram similarity for local KB.
8. `src/components/BackgroundLayers.tsx`: Aurora, Canvas Particles, Noise.
9. `src/components/Navbar.tsx`: Top branding.
10. `src/components/Hero.tsx`: Landing visual + CTAs.
11. `src/components/EngineInput.tsx`: Main text input + presets.
12. `src/components/AnalysisPanel.tsx`: Results grid (Intent, Bias, Claims).
13. `src/components/TiltCard.tsx`: Reusable 3D hover effect component.
14. `src/components/AskAIWidget.tsx`: Floating helper chat (Local KB).
15. `src/components/Footer.tsx`: Credits.
16. `sample_kb.json`: Knowledge base data.

## UI Wireframes & Animation Plan
*   **Background**: 3 layers. 
    *   Layer A: CSS Blur blobs (Aurora) moving in infinite loop.
    *   Layer B: HTML5 Canvas particles drifting slowly.
    *   Layer C: SVG Noise overlay with `mix-blend-overlay`.
*   **Hero**: Centered H1 "Reveal the Hidden Context". Right side abstract 3D rotating shape (CSS perspective).
*   **Engine Input**: Large glass-morphism panel. Textarea with monospace font. "Run Analysis" button glows on hover.
*   **Analysis Panel**: Grid of cards.
    *   *Micro-interaction*: All cards use `TiltCard.tsx` for 3D mouse-follow perspective.
*   **Ask AI**: Floating circular button bottom-right. Expands to chat window with spring animation.

## Component Responsibilities
*   `App`: Orchestrates state (`result` object).
*   `EngineInput`: Manages text state, calls `analyzeText`, shows loading spinner.
*   `AnalysisPanel`: Pure presentational. Receives `result`, renders Charts (Recharts) and Lists.
*   `AskAIWidget`: Independent state. Uses `vectorizer.ts` to query `sample_kb.json`.

## QA Checklist
1.  **Visuals**: Verify Aurora background is moving. Verify Particles are visible but subtle.
2.  **Input**: Test "Press Release" preset. Click "Run". Ensure loading state appears for ~1s.
3.  **Analysis**: Verify Result panel appears. Check Bias gauge logic (e.g., "Absolute" words -> High Bias).
4.  **Charts**: Verify BarChart renders emotional profile.
5.  **Responsiveness**: Check mobile layout (stacked cards).
6.  **AI Widget**: Ask "What is this?" -> Expect answer from KB. Ask "random gibberish" -> Expect fallback.

*(Note: Code generation proceeded immediately to satisfy the runtime environment requirements.)*