import { describe, expect, it } from "vitest";
import { museum } from "@/data/museum";
import { getArtifactBySlug, getInitialRoom, getRoomBySlug, getRooms } from "@/lib/museum";

describe("museum data", () => {
  it("seeds the six MVP rooms in display order", () => {
    const rooms = getRooms();

    expect(rooms.map((room) => room.slug)).toEqual([
      "entrance-hall",
      "built-works",
      "learning-research",
      "life-places",
      "influences",
      "unfinished-wing"
    ]);
    expect(getInitialRoom().slug).toBe("entrance-hall");
  });

  it("keeps rooms and artifacts tied to the same museum id", () => {
    for (const room of museum.rooms) {
      expect(room.museumId).toBe(museum.id);
      expect(room.artifacts.length).toBeGreaterThanOrEqual(2);

      for (const artifact of room.artifacts) {
        expect(artifact.museumId).toBe(museum.id);
        expect(artifact.placement.x).toBeGreaterThanOrEqual(0);
        expect(artifact.placement.x).toBeLessThanOrEqual(100);
        expect(artifact.placement.y).toBeGreaterThanOrEqual(0);
        expect(artifact.placement.y).toBeLessThanOrEqual(100);
      }
    }
  });

  it("can resolve deep-linkable rooms and artifacts", () => {
    expect(getRoomBySlug("built-works")?.title).toBe("Built Works");
    expect(getArtifactBySlug("first-light")?.featured).toBe(true);
  });
});
