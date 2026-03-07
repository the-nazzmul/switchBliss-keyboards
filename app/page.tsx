import BentoBox from "@/components/sections/bento-box";
import CustomKeycaps from "@/components/sections/custom-keycaps";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <BentoBox />
      <CustomKeycaps />
    </main>
  );
}
