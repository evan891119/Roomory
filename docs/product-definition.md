# Roomory Product Definition

## Vision

Roomory is a personal 2D digital museum: a curated, explorable exhibition of one
person's memories, projects, life stages, interests, and unfinished ideas.

The MVP is a public visitor experience for Evan's own museum. Visitors can
explore and inspect artifacts, but they cannot register, create museums, upload
content, or participate socially.

## Visitor Experience

Visitors should feel like they are walking through a small, carefully arranged
museum of one person's life and work. The experience should be quiet, editorial,
and spatial. Content is arranged as exhibits with wall labels and object
placement, not as a feed, file browser, gallery grid, portfolio page, or plain
timeline.

The main journey is:

1. Enter through the Entrance Hall.
2. Move between connected exhibition rooms.
3. Inspect artifacts in the room.
4. Open a focused artifact label for richer text, links, tags, and context.
5. Use the museum map when quick orientation is useful.

## MVP Scope

Included:

- Side-view 2D room exploration.
- Multiple curated rooms.
- Static museum data with owner-aware structure.
- Artifact types for notes, images, projects, timelines, media, objects, and
  collections.
- Responsive visitor experience.
- Lightweight DOM/CSS rendering.

Not included:

- User accounts.
- Social features.
- Public creation tools.
- Multi-user backend.
- Full CMS.
- 3D engine, physics, or avatar movement.

## Initial Museum Structure

The MVP starts with six rooms:

- Entrance Hall
- Built Works
- Learning & Research
- Life Places
- Influences
- Unfinished Wing

Each room has a mood, description, visual accent, exits, and artifacts. The
content is intentionally seed content that can be replaced with final personal
writing and media over time.

## Interaction Model

The primary 2D model is a room-based side-view museum:

- A visitor sees one room at a time.
- Doors move to adjacent rooms.
- A compact museum map allows direct room selection.
- Artifacts are spatially placed objects.
- Selecting an artifact opens a detail panel.
- Keyboard arrows move between adjacent rooms when no artifact panel is active.
- Escape closes the artifact panel.

This model gives Roomory a stronger museum feeling than a portfolio grid while
remaining lighter and more maintainable than a top-down or 3D experience.

## Technical Direction

Roomory uses Next.js App Router, TypeScript, React components, CSS-based 2D
layout, Framer Motion transitions, and structured TypeScript content in
`data/museum.ts`.

The data model keeps `museumId` and owner metadata so the code does not assume a
hard-coded single-user product forever, while the MVP remains focused on one
personal museum.
