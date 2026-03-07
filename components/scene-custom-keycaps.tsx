import { Keyboard } from "./keyboard";

type SceneCustomKeycapsProps = {
  selectedTextureId: string;
  onAnimationComplete: () => void;
};

const SceneCustomKeycaps = ({
  selectedTextureId,
  onAnimationComplete,
}: SceneCustomKeycapsProps) => {
  return (
    <group>
      <Keyboard />
    </group>
  );
};

export default SceneCustomKeycaps;
