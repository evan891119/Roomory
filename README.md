# Roomory

Roomory is a personal 2D digital museum: a curated, explorable exhibition of
memories, projects, life stages, influences, and unfinished ideas.

The MVP is intentionally visitor-only. It is not a platform for public museum
creation, and it does not include authentication, social features, or a CMS.

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

```bash
npm run typecheck
npm run test
npm run build
```

## Content Model

Museum content lives in `data/museum.ts`. The data is static and editable in
code for the MVP, while still using an owner-aware shape so it can evolve later.

The core entities are:

- `museum`: title, owner, theme, and rooms
- `room`: title, mood, exits, visual accent, and artifacts
- `artifact`: type, label, body copy, media, links, tags, and spatial placement

See `docs/product-definition.md` for the MVP product definition and interaction
model.
