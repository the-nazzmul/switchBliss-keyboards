import { SOUND_MAP } from "@/lib/constants";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// Type definitions
type GLTFResult = GLTF & {
  nodes: {
    Single_Switch_Mesh_1: THREE.Mesh;
    Single_Switch_Mesh_2: THREE.Mesh;
    Single_Switch_Mesh_3: THREE.Mesh;
    Single_Switch_Mesh_4: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

type SwitchProps = React.ComponentProps<"group"> & {
  color?: "red" | "blue" | "brown" | "black";
  hexColor?: string;
};

export function Switch({ color, hexColor, ...restProps }: SwitchProps) {
  const { nodes } = useGLTF("/switch.gltf") as unknown as GLTFResult;
  const switchGroupRef = useRef<THREE.Group>(null);
  const stemRef = useRef<THREE.Mesh>(null);
  const isPressedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const allAudioRef = useRef(
    SOUND_MAP[color as keyof typeof SOUND_MAP].map((url) => {
      const audio = new Audio(url);
      audio.volume = 0.6;
      return audio;
    }),
  );

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    if (!stemRef.current || !switchGroupRef.current || isPressedRef.current)
      return;

    isPressedRef.current = true;

    const stem = stemRef.current;
    const switchGroup = switchGroupRef.current;

    gsap.killTweensOf(stem.position);
    gsap.killTweensOf(switchGroup.rotation);

    gsap.to(switchGroup.rotation, {
      x: Math.PI / 2 + 0.1,
      duration: 0.05,
      ease: "power2.inOut",
    });

    gsap.to(stem.position, {
      z: 0.005,
      duration: 0.08,
      ease: "power2.inOut",
    });

    // audio
    audioRef.current = gsap.utils.random(allAudioRef.current);
    audioRef.current.currentTime = 0;
    audioRef.current.play();

    audioTimeoutRef.current = setTimeout(
      () => audioRef.current?.pause(),
      (audioRef.current.duration / 2) * 1000,
    );
  };

  const releaseSwitch = () => {
    if (!stemRef.current || !switchGroupRef.current || !isPressedRef.current)
      return;

    isPressedRef.current = false;

    const stem = stemRef.current;
    const switchGroup = switchGroupRef.current;

    gsap.to(switchGroup.rotation, {
      x: Math.PI / 2,
      duration: 0.6,
      ease: "elastic.out(1,0.3)",
    });

    gsap.to(stem.position, {
      z: 0,
      duration: 0.15,
      ease: "elastic.out(1,0.3)",
    });

    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioRef.current?.play();
    }
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    releaseSwitch();
  };

  const handlePointerLeave = () => {
    releaseSwitch();
  };

  return (
    <group {...restProps}>
      {/* This is the hitbox */}
      <mesh
        position={[0, 0.05, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group ref={switchGroupRef} scale={10} rotation={[Math.PI / 2, 0, 0]}>
        {/* Switch housing */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_1.geometry}
        >
          <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>

        {/* Gold contacts */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_2.geometry}
        >
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} />
        </mesh>

        {/* Colored stem */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_3.geometry}
          ref={stemRef}
        >
          <meshStandardMaterial color={hexColor} roughness={0.7} />
        </mesh>

        {/* Switch base */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_4.geometry}
        >
          <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/switch.gltf");
