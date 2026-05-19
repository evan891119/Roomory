import { MuseumExperience } from "@/components/MuseumExperience";
import { getInitialRoom } from "@/lib/museum";

export default function Home() {
  return <MuseumExperience initialRoomSlug={getInitialRoom().slug} />;
}
