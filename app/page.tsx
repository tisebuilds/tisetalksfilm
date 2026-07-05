import { Landing } from "@/components/Landing";
import { getFilms } from "@/lib/getFilms";

export const revalidate = 21600;

export default async function Home() {
  const { films } = await getFilms();
  return <Landing films={films} />;
}
