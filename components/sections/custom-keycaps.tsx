"use client";

import { KEYCAP_TEXTURES } from "@/lib/constants";
import { Bounded } from "../bounded";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SceneCustomKeycaps from "../scene-custom-keycaps";

type KeycapTexture = (typeof KEYCAP_TEXTURES)[number];

const CustomKeycaps = () => {
  const [selectedTextureId, setSelectedTextureId] = useState(
    KEYCAP_TEXTURES[0].id,
  );
  const [backgroundTexture, setBackgroundTexture] = useState(
    KEYCAP_TEXTURES[0].name,
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTextureSelect = (texture: KeycapTexture) => {
    if (texture.id === selectedTextureId || isAnimating) return;
    setSelectedTextureId(texture.id);
  };

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <section className="relative flex h-[90vh] flex-col overflow-hidden bg-linear-to-b from-[#0f172a] to-[#062f4a] text-white">
      {/* SVG Background */}
      {/* Canvas */}
      <Canvas>
        <SceneCustomKeycaps
          selectedTextureId={selectedTextureId}
          onAnimationComplete={handleAnimationComplete}
        />
      </Canvas>
      <Bounded
        className="relative shrink-0"
        innerClassName="gap-6 lg:gap-4 flex flex-col lg:flex-row"
      >
        <div className="max-w-md shrink-0">
          <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
            Custom Keycaps
          </h2>
          <p className="text-pretty lg:text-lg">
            Choose from different keycap materials and see how they transform
            your keyboard&apos;s appearance in real-time.
          </p>
        </div>
        <ul className="grid grow grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button
                onClick={() => handleTextureSelect(texture)}
                className={clsx(
                  "flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-all motion-safe:duration-300",
                  selectedTextureId === texture.id
                    ? "border-[#81BFED] bg-[#81BFED]/20"
                    : "cursor-pointer border-gray-300 hover:border-gray-500",
                  isAnimating && "cursor-not-allowed opacity-50",
                )}
              >
                <div className="mb-3 overflow-hidden rounded border-2 border-black bg-gray-100">
                  <Image
                    src={texture.path}
                    alt={texture.name}
                    width={400}
                    height={255}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-center text-sm font-semibold">
                  {texture.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bounded>
    </section>
  );
};

export default CustomKeycaps;
