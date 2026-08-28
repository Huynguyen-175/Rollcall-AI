<img width="1672" height="941" alt="image" src="https://github.com/user-attachments/assets/615ffe0a-5f99-4d47-bed1-bd982f3b8d18" />



# Rollcall AI

[Open the live web app](https://rollcall-ai-tft.goldenyrboy.chatgpt.site)

Rollcall AI is a speed-first web interface for real-time Teamfight Tactics planning. Players can drop a shop, board, carousel, augment, or opponent screenshot and receive concise, timer-friendly decisions.

## Current prototype

- Drag-and-drop screenshot input with local preview
- Normal and ultra-fast decision modes
- Buy, skip, sell, roll, and level recommendations
- Economy floor and stop-condition guidance
- Roll-down target tracking
- Responsive dark esports-style interface

The app sends an uploaded screenshot to a vision-model endpoint and returns a concise next move. The hosted deployment needs an `OPENAI_API_KEY` secret configured by the site owner; visitors do not need to add their own key.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

## Stack

- React 19
- Vinext / Vite
- TypeScript
- Tailwind CSS
- shadcn primitives
- Lucide icons

## Roadmap

1. Connect screenshot upload to a vision-capable analysis endpoint.
2. Add current-set champion, item, trait, augment, and shop-odds data.
3. Persist session context across repeated roll-down screenshots.
4. Add structured uncertainty reporting and emergency timer responses.
5. Add tests for economy thresholds and decision formatting.

## Deployment

The public deployment is hosted with OpenAI Sites. Visitors can open the live link above and upload a screenshot directly in their browser.

## Disclaimer

Rollcall AI is an independent planning prototype and is not affiliated with or endorsed by Riot Games.
