# Rollcall AI

Rollcall AI is a speed-first web interface for real-time Teamfight Tactics planning. Players can drop a shop, board, carousel, augment, or opponent screenshot and receive concise, timer-friendly decisions.

## Current prototype

- Drag-and-drop screenshot input with local preview
- Normal and ultra-fast decision modes
- Buy, skip, sell, roll, and level recommendations
- Economy floor and stop-condition guidance
- Roll-down target tracking
- Responsive dark esports-style interface

The current decision response is demonstration data. Production screenshot recognition and live strategic analysis still require a vision-model backend and current-set data.

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

The current private deployment is hosted with OpenAI Sites.

## Disclaimer

Rollcall AI is an independent planning prototype and is not affiliated with or endorsed by Riot Games.
