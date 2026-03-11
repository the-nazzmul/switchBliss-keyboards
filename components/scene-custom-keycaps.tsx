import { Stage, useTexture } from "@react-three/drei";
import { Keyboard } from "./keyboard";
import { KEYCAP_TEXTURES } from "@/lib/constants";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type SceneCustomKeycapsProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

const SceneCustomKeycaps = ({
  selectedTextureId,
  onAnimationComplete,
}: SceneCustomKeycapsProps) => {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    // Keyboard animation
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const keyboard = keyboardRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onAnimationComplete();
      },
    });

    tl.to(keyboard.position, {
      y: 0.3,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        setCurrentTextureId(selectedTextureId);
      },
    });
    tl.to(keyboard.position, {
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.4)",
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};
    KEYCAP_TEXTURES.forEach((textureConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;
      if (texture) {
        const clonedTexture = texture.clone();
        clonedTexture.flipY = false;
        clonedTexture.colorSpace = THREE.SRGBColorSpace;
        materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
          map: clonedTexture,
          roughness: 0.7,
        });
      }
    });
    return materialMap;
  }, [textures]);

  const currentKnobColor = KEYCAP_TEXTURES.find(
    (t) => t.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={"city"} intensity={0.05} shadows="contact">
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
};

export default SceneCustomKeycaps;
