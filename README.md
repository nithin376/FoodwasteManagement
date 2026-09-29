# FoodLoop AI

A responsive, frontend-only food waste reduction prototype built with React, TypeScript, Vite, Tailwind CSS, React Router, Lucide, and Recharts.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` type-checks and creates the production build; `npm run preview` serves it.

## Demo walkthrough

1. Open the landing page and enter the dashboard.
2. Inspect forecasts and AI recommendations.
3. Filter inventory, add a batch, or mark a batch as used.
4. Open redistribution, select food, and assign a compatible recipient.
5. Schedule a pickup and use the logistics simulation controls.
6. Inspect the quality demo and export an analytics CSV.
7. Update institution and notification settings.

Routes: `/`, `/dashboard`, `/inventory`, `/surplus`, `/redistribution`, `/logistics`, `/quality`, `/analytics`, `/settings`.

All predictions, sensors, scores, environmental estimates, map routes, and dashboard totals are illustrative mock data. No AI model, backend, authentication, live routing, or external delivery system is connected. Inventory and settings persist in browser localStorage. Dashboard metrics are static demo snapshots and do not recalculate from local inventory actions. Reset browser site data to restore the seed inventory.

The visual reference image was not included in the supplied attachment; the interface follows the written design specification with original FoodLoop branding.

For static hosting, configure an SPA fallback to index.html so direct navigation to dashboard routes works.
