import { notFound } from "next/navigation";
import { MuseumExperience } from "@/components/MuseumExperience";
import { getRoomBySlug, getRooms } from "@/lib/museum";

type RoomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getRooms().map((room) => ({
    slug: room.slug
  }));
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return {
      title: "Room not found - Roomory"
    };
  }

  return {
    title: `${room.title} - Roomory`,
    description: room.description
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;

  if (!getRoomBySlug(slug)) {
    notFound();
  }

  return <MuseumExperience initialRoomSlug={slug} />;
}
