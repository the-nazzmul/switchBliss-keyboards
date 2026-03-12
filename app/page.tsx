import BentoBox from "@/components/sections/bento-box";
import CustomKeycaps from "@/components/sections/custom-keycaps";
import Hero from "@/components/sections/hero";
import SoundPlayground from "@/components/sections/sound-playground";

export default function Home() {
  return (
    <main>
      <Hero />
      <BentoBox />
      <SoundPlayground />
      <CustomKeycaps />
    </main>
  );
}
