import { museum, type Artifact, type MuseumRoom } from "@/data/museum";

export function getRooms(): MuseumRoom[] {
  return [...museum.rooms].sort((a, b) => a.order - b.order);
}

export function getRoomBySlug(slug: string): MuseumRoom | undefined {
  return museum.rooms.find((room) => room.slug === slug);
}

export function getInitialRoom(): MuseumRoom {
  return getRooms()[0];
}

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return museum.rooms.flatMap((room) => room.artifacts).find((artifact) => artifact.slug === slug);
}

export function getAdjacentRooms(room: MuseumRoom) {
  const rooms = getRooms();
  const index = rooms.findIndex((candidate) => candidate.slug === room.slug);

  return {
    previous: index > 0 ? rooms[index - 1] : undefined,
    next: index < rooms.length - 1 ? rooms[index + 1] : undefined
  };
}
