export type ArtifactType =
  | "image"
  | "note"
  | "project"
  | "timeline"
  | "media"
  | "object"
  | "collection";

export type ArtifactPlacement = {
  x: number;
  y: number;
  size?: "small" | "medium" | "large";
  surface?: "wall" | "plinth" | "shelf" | "floor";
};

export type ArtifactLink = {
  label: string;
  href: string;
};

export type ArtifactMedia = {
  kind: "image" | "video" | "audio" | "link";
  src?: string;
  alt?: string;
};

export type Artifact = {
  id: string;
  museumId: string;
  slug: string;
  type: ArtifactType;
  title: string;
  summary: string;
  body: string;
  date?: string;
  tags: string[];
  placement: ArtifactPlacement;
  media?: ArtifactMedia;
  links?: ArtifactLink[];
  featured?: boolean;
};

export type RoomExit = {
  label: string;
  to: string;
  direction: "left" | "right";
};

export type MuseumRoom = {
  id: string;
  museumId: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  mood: string;
  order: number;
  accent: string;
  exits: RoomExit[];
  artifacts: Artifact[];
};

export type Museum = {
  id: string;
  title: string;
  subtitle: string;
  owner: {
    id: string;
    name: string;
    role: string;
  };
  theme: {
    tone: "editorial-museum";
    primaryAccent: string;
    secondaryAccent: string;
  };
  rooms: MuseumRoom[];
};

const museumId = "roomory-personal-museum";

export const museum: Museum = {
  id: museumId,
  title: "Roomory",
  subtitle: "A personal museum of memories, projects, questions, and unfinished rooms.",
  owner: {
    id: "evan",
    name: "Evan",
    role: "Curator"
  },
  theme: {
    tone: "editorial-museum",
    primaryAccent: "#44584a",
    secondaryAccent: "#8d4d45"
  },
  rooms: [
    {
      id: "entrance-hall",
      museumId,
      slug: "entrance-hall",
      title: "Entrance Hall",
      shortTitle: "Entrance",
      description:
        "A quiet first room for understanding what this museum is and how to move through it.",
      mood: "Soft light, low voices, the first labels on the wall.",
      order: 1,
      accent: "#44584a",
      exits: [{ label: "Enter Built Works", to: "built-works", direction: "right" }],
      artifacts: [
        {
          id: "first-light",
          museumId,
          slug: "first-light",
          type: "object",
          title: "First Light",
          summary: "The first marker: this place is a museum, not a feed.",
          body:
            "Roomory begins with a small ritual object: a light that says the visitor has entered a curated interior. The museum is personal, but it is arranged for guests to walk through at their own pace.",
          tags: ["orientation", "identity", "mood"],
          featured: true,
          placement: { x: 50, y: 48, size: "large", surface: "plinth" }
        },
        {
          id: "visitor-note",
          museumId,
          slug: "visitor-note",
          type: "note",
          title: "To the Visitor",
          summary: "A short wall text about how to read the rooms.",
          body:
            "This museum is not ordered by resume logic. It is organized like memory: projects beside places, influences beside unfinished ideas, with each artifact carrying its own reason for being kept.",
          tags: ["wall text", "curation"],
          placement: { x: 22, y: 34, size: "medium", surface: "wall" }
        },
        {
          id: "roomory-map-study",
          museumId,
          slug: "roomory-map-study",
          type: "image",
          title: "Map Study",
          summary: "A plan for six rooms connected by thresholds.",
          body:
            "The museum map is deliberately small. It helps visitors understand where they are without turning the experience into a dashboard.",
          tags: ["navigation", "structure"],
          placement: { x: 78, y: 31, size: "medium", surface: "wall" }
        }
      ]
    },
    {
      id: "built-works",
      museumId,
      slug: "built-works",
      title: "Built Works",
      shortTitle: "Works",
      description:
        "Projects, prototypes, shipped tools, and small systems arranged as objects with context.",
      mood: "Brass labels, working models, and notes from the bench.",
      order: 2,
      accent: "#6f5b3e",
      exits: [
        { label: "Back to Entrance", to: "entrance-hall", direction: "left" },
        { label: "Continue to Learning", to: "learning-research", direction: "right" }
      ],
      artifacts: [
        {
          id: "project-cabinet",
          museumId,
          slug: "project-cabinet",
          type: "project",
          title: "Project Cabinet",
          summary: "A display case for tools and apps that became real enough to use.",
          body:
            "This artifact stands for built software as lived material: decisions, interfaces, deployment constraints, and the quiet satisfaction of a useful thing running.",
          tags: ["software", "projects"],
          links: [{ label: "Replace with project link", href: "https://example.com" }],
          placement: { x: 28, y: 46, size: "large", surface: "plinth" }
        },
        {
          id: "prototype-shelf",
          museumId,
          slug: "prototype-shelf",
          type: "collection",
          title: "Prototype Shelf",
          summary: "Small ideas that taught something before they became products.",
          body:
            "The shelf keeps experiments visible without pretending each one needs to be a polished case study.",
          tags: ["prototypes", "experiments"],
          placement: { x: 66, y: 38, size: "medium", surface: "shelf" }
        }
      ]
    },
    {
      id: "learning-research",
      museumId,
      slug: "learning-research",
      title: "Learning & Research",
      shortTitle: "Learning",
      description:
        "Notes, research paths, technical themes, and the slow accumulation of taste and skill.",
      mood: "A reading room with pinned diagrams and open notebooks.",
      order: 3,
      accent: "#53677a",
      exits: [
        { label: "Back to Built Works", to: "built-works", direction: "left" },
        { label: "Continue to Life Places", to: "life-places", direction: "right" }
      ],
      artifacts: [
        {
          id: "research-thread",
          museumId,
          slug: "research-thread",
          type: "note",
          title: "Research Thread",
          summary: "A note about ideas that kept returning across projects.",
          body:
            "Some learning is not a course or credential. It is a thread you keep picking up: interfaces, personal knowledge systems, local-first tools, markets, memory, and the shape of useful software.",
          tags: ["research", "learning"],
          placement: { x: 34, y: 32, size: "large", surface: "wall" }
        },
        {
          id: "milestone-line",
          museumId,
          slug: "milestone-line",
          type: "timeline",
          title: "Milestone Line",
          summary: "A compact timeline of study moments and technical shifts.",
          body:
            "This timeline is intentionally interpretive. It should eventually show the moments where a new capability changed what felt possible.",
          date: "Ongoing",
          tags: ["timeline", "skills"],
          placement: { x: 68, y: 52, size: "medium", surface: "wall" }
        }
      ]
    },
    {
      id: "life-places",
      museumId,
      slug: "life-places",
      title: "Life Places",
      shortTitle: "Places",
      description:
        "Travel, rooms, streets, and locations that carry memory beyond a photo caption.",
      mood: "Maps, window light, and fragments from places that stayed.",
      order: 4,
      accent: "#7b6f55",
      exits: [
        { label: "Back to Learning", to: "learning-research", direction: "left" },
        { label: "Continue to Influences", to: "influences", direction: "right" }
      ],
      artifacts: [
        {
          id: "window-memory",
          museumId,
          slug: "window-memory",
          type: "image",
          title: "Window Memory",
          summary: "A placeholder for a place remembered by light and framing.",
          body:
            "The final version can pair a real photograph with a short, exact memory. The room is designed for place as atmosphere, not travel as inventory.",
          tags: ["place", "memory"],
          placement: { x: 30, y: 30, size: "large", surface: "wall" }
        },
        {
          id: "map-pin-notes",
          museumId,
          slug: "map-pin-notes",
          type: "collection",
          title: "Map Pin Notes",
          summary: "A cluster of short place memories.",
          body:
            "Instead of a generic map, this artifact groups locations by feeling: where something started, where something changed, where something became clear.",
          tags: ["travel", "notes"],
          placement: { x: 70, y: 48, size: "medium", surface: "plinth" }
        }
      ]
    },
    {
      id: "influences",
      museumId,
      slug: "influences",
      title: "Influences",
      shortTitle: "Influences",
      description:
        "Games, music, books, software, and objects that shaped taste and attention.",
      mood: "Listening stations, annotated covers, and tools kept for their imprint.",
      order: 5,
      accent: "#8d4d45",
      exits: [
        { label: "Back to Life Places", to: "life-places", direction: "left" },
        { label: "Continue to Unfinished Wing", to: "unfinished-wing", direction: "right" }
      ],
      artifacts: [
        {
          id: "listening-station",
          museumId,
          slug: "listening-station",
          type: "media",
          title: "Listening Station",
          summary: "A future embedded media stop for sound and memory.",
          body:
            "Influence often arrives through repetition. This artifact can later hold a playlist, track, video, or essay about what a piece of media trained the eye or ear to notice.",
          tags: ["music", "media"],
          placement: { x: 27, y: 50, size: "medium", surface: "plinth" }
        },
        {
          id: "taste-index",
          museumId,
          slug: "taste-index",
          type: "note",
          title: "Taste Index",
          summary: "A wall label for the things that quietly taught taste.",
          body:
            "This should not become a ranked list. It is an index of influence: interfaces, games, albums, books, places, and systems that changed what good work feels like.",
          tags: ["taste", "influence"],
          placement: { x: 66, y: 30, size: "large", surface: "wall" }
        }
      ]
    },
    {
      id: "unfinished-wing",
      museumId,
      slug: "unfinished-wing",
      title: "Unfinished Wing",
      shortTitle: "Unfinished",
      description:
        "Future dreams, abandoned concepts, open questions, and artifacts still becoming themselves.",
      mood: "Dimmer light, visible sketches, and labels written in pencil.",
      order: 6,
      accent: "#5d5166",
      exits: [{ label: "Back to Influences", to: "influences", direction: "left" }],
      artifacts: [
        {
          id: "dream-ledger",
          museumId,
          slug: "dream-ledger",
          type: "note",
          title: "Dream Ledger",
          summary: "Ideas that are not ready, but still worth keeping in the room.",
          body:
            "The unfinished wing gives future work a dignified place. It prevents the museum from pretending that only completed things matter.",
          tags: ["future", "ideas"],
          placement: { x: 35, y: 36, size: "large", surface: "wall" }
        },
        {
          id: "open-door",
          museumId,
          slug: "open-door",
          type: "object",
          title: "Open Door",
          summary: "A final threshold for whatever Roomory becomes next.",
          body:
            "The data model keeps a small opening toward a multi-museum future, but the MVP stays focused: one personal museum, carefully made.",
          tags: ["future", "roomory"],
          placement: { x: 74, y: 48, size: "medium", surface: "floor" }
        }
      ]
    }
  ]
};
