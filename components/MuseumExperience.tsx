"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  DoorOpen,
  ExternalLink,
  Map,
  PanelRightClose,
  Sparkles,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { museum, type Artifact, type ArtifactType, type MuseumRoom } from "@/data/museum";
import { getAdjacentRooms, getRoomBySlug, getRooms } from "@/lib/museum";

type MuseumExperienceProps = {
  initialRoomSlug: string;
};

const artifactTypeLabels: Record<ArtifactType, string> = {
  image: "Image",
  note: "Note",
  project: "Project",
  timeline: "Timeline",
  media: "Media",
  object: "Object",
  collection: "Collection"
};

export function MuseumExperience({ initialRoomSlug }: MuseumExperienceProps) {
  const rooms = useMemo(() => getRooms(), []);
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(initialRoomSlug);
  const [selectedArtifactSlug, setSelectedArtifactSlug] = useState<string | null>(null);

  const selectedRoom = getRoomBySlug(selectedRoomSlug) ?? rooms[0];
  const selectedArtifact =
    selectedRoom.artifacts.find((artifact) => artifact.slug === selectedArtifactSlug) ?? null;
  const adjacentRooms = getAdjacentRooms(selectedRoom);

  const navigateToRoom = useCallback(
    (roomSlug: string) => {
      const room = getRoomBySlug(roomSlug);

      if (!room) {
        return;
      }

      setSelectedRoomSlug(roomSlug);
      setSelectedArtifactSlug(null);

      const nextPath = roomSlug === rooms[0].slug ? "/" : `/room/${roomSlug}`;
      if (pathname !== nextPath) {
        router.push(nextPath, { scroll: false });
      }
    },
    [pathname, rooms, router]
  );

  useEffect(() => {
    setSelectedRoomSlug(initialRoomSlug);
  }, [initialRoomSlug]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedArtifactSlug(null);
      }

      if (selectedArtifact) {
        return;
      }

      if (event.key === "ArrowLeft" && adjacentRooms.previous) {
        navigateToRoom(adjacentRooms.previous.slug);
      }

      if (event.key === "ArrowRight" && adjacentRooms.next) {
        navigateToRoom(adjacentRooms.next.slug);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [adjacentRooms.next, adjacentRooms.previous, navigateToRoom, selectedArtifact]);

  return (
    <main className="museum-shell">
      <header className="museum-header" aria-label="Museum header">
        <Link className="brand-mark" href="/" onClick={() => navigateToRoom(rooms[0].slug)}>
          <span className="brand-sigil" aria-hidden="true" />
          <span>
            <strong>{museum.title}</strong>
            <small>{museum.owner.name} personal museum</small>
          </span>
        </Link>

        <nav className="room-tabs" aria-label="Museum rooms">
          {rooms.map((room) => (
            <button
              className={room.slug === selectedRoom.slug ? "room-tab active" : "room-tab"}
              key={room.id}
              onClick={() => navigateToRoom(room.slug)}
              type="button"
            >
              {room.shortTitle}
            </button>
          ))}
        </nav>
      </header>

      <section
        className="museum-stage"
        style={{ "--room-accent": selectedRoom.accent } as CSSProperties}
      >
        <aside className="museum-map" aria-label="Museum map">
          <div className="map-title">
            <Map size={16} aria-hidden="true" />
            Museum map
          </div>
          <ol>
            {rooms.map((room) => (
              <li key={room.id}>
                <button
                  className={room.slug === selectedRoom.slug ? "map-node active" : "map-node"}
                  onClick={() => navigateToRoom(room.slug)}
                  type="button"
                >
                  <span>{room.order.toString().padStart(2, "0")}</span>
                  {room.shortTitle}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <AnimatePresence mode="wait">
          <motion.section
            animate={{ opacity: 1, x: 0 }}
            className="room-scene"
            exit={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
            key={selectedRoom.slug}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            aria-label={`${selectedRoom.title} room`}
          >
            <RoomScene
              adjacentRooms={adjacentRooms}
              onNavigate={navigateToRoom}
              onSelectArtifact={(artifact) => setSelectedArtifactSlug(artifact.slug)}
              room={selectedRoom}
              selectedArtifactSlug={selectedArtifactSlug}
            />
          </motion.section>
        </AnimatePresence>

        <ArtifactDetailPanel
          artifact={selectedArtifact}
          onClose={() => setSelectedArtifactSlug(null)}
          room={selectedRoom}
        />
      </section>
    </main>
  );
}

function RoomScene({
  adjacentRooms,
  onNavigate,
  onSelectArtifact,
  room,
  selectedArtifactSlug
}: {
  adjacentRooms: ReturnType<typeof getAdjacentRooms>;
  onNavigate: (roomSlug: string) => void;
  onSelectArtifact: (artifact: Artifact) => void;
  room: MuseumRoom;
  selectedArtifactSlug: string | null;
}) {
  return (
    <>
      <div className="room-intro">
        <p className="room-kicker">Room {room.order.toString().padStart(2, "0")}</p>
        <h1>{room.title}</h1>
        <p>{room.description}</p>
      </div>

      <div className="gallery-wall">
        <div className="ambient-light" />
        <div className="wall-line top" />
        <div className="wall-line bottom" />

        {adjacentRooms.previous ? (
          <button
            aria-label={`Go to ${adjacentRooms.previous.title}`}
            className="room-door left"
            onClick={() => onNavigate(adjacentRooms.previous!.slug)}
            type="button"
          >
            <DoorOpen size={22} aria-hidden="true" />
            <span>{adjacentRooms.previous.shortTitle}</span>
          </button>
        ) : null}

        {room.artifacts.map((artifact) => (
          <ArtifactDisplay
            artifact={artifact}
            isSelected={selectedArtifactSlug === artifact.slug}
            key={artifact.id}
            onSelect={() => onSelectArtifact(artifact)}
          />
        ))}

        {adjacentRooms.next ? (
          <button
            aria-label={`Go to ${adjacentRooms.next.title}`}
            className="room-door right"
            onClick={() => onNavigate(adjacentRooms.next!.slug)}
            type="button"
          >
            <DoorOpen size={22} aria-hidden="true" />
            <span>{adjacentRooms.next.shortTitle}</span>
          </button>
        ) : null}

        <div className="room-floor">
          <p>{room.mood}</p>
        </div>
      </div>

      <div className="room-controls" aria-label="Adjacent room navigation">
        <button
          disabled={!adjacentRooms.previous}
          onClick={() => adjacentRooms.previous && onNavigate(adjacentRooms.previous.slug)}
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Previous room
        </button>
        <button
          disabled={!adjacentRooms.next}
          onClick={() => adjacentRooms.next && onNavigate(adjacentRooms.next.slug)}
          type="button"
        >
          Next room
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

function ArtifactDisplay({
  artifact,
  isSelected,
  onSelect
}: {
  artifact: Artifact;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const placement = artifact.placement;
  const className = [
    "artifact",
    `artifact-${artifact.type}`,
    `artifact-${placement.size ?? "medium"}`,
    `artifact-surface-${placement.surface ?? "wall"}`,
    isSelected ? "selected" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-label={`Inspect ${artifact.title}`}
      className={className}
      onClick={onSelect}
      style={{
        left: `${placement.x}%`,
        top: `${placement.y}%`
      }}
      type="button"
    >
      <span className="artifact-form" aria-hidden="true">
        {artifact.featured ? <Sparkles size={20} /> : null}
      </span>
      <span className="artifact-label">
        <small>{artifactTypeLabels[artifact.type]}</small>
        <strong>{artifact.title}</strong>
      </span>
    </button>
  );
}

function ArtifactDetailPanel({
  artifact,
  onClose,
  room
}: {
  artifact: Artifact | null;
  onClose: () => void;
  room: MuseumRoom;
}) {
  return (
    <aside className={artifact ? "artifact-panel open" : "artifact-panel"} aria-live="polite">
      {artifact ? (
        <>
          <div className="panel-toolbar">
            <span>{artifactTypeLabels[artifact.type]}</span>
            <button aria-label="Close artifact details" onClick={onClose} type="button">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="panel-art-preview" data-type={artifact.type}>
            <span>{artifact.title}</span>
          </div>
          <div className="panel-copy">
            <p className="panel-room">{room.title}</p>
            <h2>{artifact.title}</h2>
            <p className="panel-summary">{artifact.summary}</p>
            <p>{artifact.body}</p>
            {artifact.date ? <p className="panel-date">{artifact.date}</p> : null}
            <div className="tag-row">
              {artifact.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {artifact.links?.length ? (
              <div className="link-row">
                {artifact.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="panel-empty">
          <PanelRightClose size={22} aria-hidden="true" />
          <p>Select an artifact to read its label.</p>
        </div>
      )}
    </aside>
  );
}
