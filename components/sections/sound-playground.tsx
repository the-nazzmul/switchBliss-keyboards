"use client";

import { SWITCHES } from "@/lib/constants";
import { Bounded } from "../bounded";
import { FadeIn } from "../fade-in";
import SwitchCanvas from "../switch-canvas";

const SoundPlayground = () => {
  return (
    <Bounded className="relative" innerClassName="flex flex-col justify-center">
      <FadeIn>
        <h2 className="font-bold-slanted scroll-pt-6 text-6xl uppercase md:text-8xl">
          Craft Your Click
        </h2>
        <p className="text-md mb-6 max-w-4xl font-medium text-pretty">
          The Vapor75 can be customized with one of four premium switch types.
        </p>
        <FadeIn
          targetChildren
          className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
        >
          {SWITCHES.map((s) => (
            <SwitchCanvas key={s.id} switchData={s} />
          ))}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
};

export default SoundPlayground;
