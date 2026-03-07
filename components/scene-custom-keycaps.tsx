import { Stage, useTexture } from "@react-three/drei";
import { Keyboard } from "./keyboard";
import { KEYCAP_TEXTURES } from "@/lib/constants";
import { useMemo } from "react";
import * as THREE from "three";

type SceneCustomKeycapsProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

const SceneCustomKeycaps = ({
  selectedTextureId,
  onAnimationComplete,
}: SceneCustomKeycapsProps) => {
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

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
      <group>
        <Keyboard
          keycapMaterial={materials[selectedTextureId]}
          knobColor={currentKnobColor}
        />
      </group>
    </Stage>
  );
};

export default SceneCustomKeycaps;
