import { buttonStyle, container } from "./TemDexPage.css";
import { ReactNode, useEffect } from "react";

import {
  Bounds,
  // Box,
  Environment,
  Float,
  Image,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  PivotControls,
  RoundedBox,
  useCamera,
} from "@react-three/drei";
import { Canvas, Color, useFrame, Vector3 } from "@react-three/fiber";

import { Suspense, useRef, useState } from "react";
import { Euler, Mesh, Vector3 as V3 } from "three";
import { getRandomIntInclusive } from "../../utils/utils";
import { nanoid } from "nanoid";

import { ImageProps } from "@react-three/drei";
import temImage from "../../../public/tem-previews/raignet.png";

type CustomVector3 = [number, number, number];

interface BoxProps {
  id: string;
  position?: CustomVector3;
  scale?: CustomVector3;
  rotation?: CustomVector3;
  color?: Color;
}

const Box = ({
  position = [0, 0, 0],
  color = "gold",
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: BoxProps) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const t = scale[0];

  useEffect(() => {
    mesh.current.lookAt(new V3(0, position[1], 0));
  }, []);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      // {...props}
      position={position}
      ref={mesh}
      // ref={}
      // rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={scale}
      onClick={(event) => {
        console.log(position);
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface TemCard3DProps {
  id?: string;
  position?: CustomVector3;
  scale?: CustomVector3;
  rotation?: CustomVector3;
  color?: Color;
}

const TemCard3D = ({
  id,
  position,
  scale,
  rotation,
  color,
}: TemCard3DProps) => {
  const [hover, setHover] = useState(false);

  useFrame(() => {
    // imageRef.current.material.zoom = 1; // 1 and higher
    // imageRef.current.material.transparent = true;
    // ref.current.material.grayscale = ... // between 0 and 1
    // imageRef.current.material.color.set("red"); // mix-in color
  });

  // const { width, height } = temImage;

  // const scalar = hover ? 5 : 1;
  // const scaleCorrection = 1000;
  // const w = (width / scaleCorrection) * scalar;
  // const h = (height / scaleCorrection) * scalar;

  return (
    <group
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4}>
        <meshPhongMaterial color="#f3f3f300" transparent opacity={0.5} />
      </RoundedBox>
      {/* <Image
        scale={[w, h]}
        ref={imageRef}
        transparent
        url={temImage.src}
        position={[0, 0, 0.01]}
      />
      <Image
        rotation={[0, Math.PI, 0]}
        scale={[w, h]}
        ref={imageRef}
        transparent
        url={temImage.src}
        position={[0, 0, -0.01]}
      /> */}
    </group>
  );
};

const randomSpherePoint = (
  cx: number,
  cy: number,
  cz: number,
  radius: number
): [number, number, number] => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const x = cx + radius * Math.sin(phi) * Math.cos(theta);
  const y = cy + radius * Math.sin(phi) * Math.sin(theta);
  const z = cz + radius * Math.cos(phi);
  return [x, y, z];
};

const randomSpherePointConcentric = (
  cx: number,
  cy: number,
  cz: number,
  radius: number,
  ignoredHeight: number
): [number, number, number] => {
  let point: [number, number, number] = [0, 20, 0];
  while (point[1] > ignoredHeight || point[1] < -ignoredHeight) {
    point = randomSpherePoint(cx, cz, cy, radius);
  }
  return point;
};

const random_cubes: BoxProps[] = [...Array(164).keys()].map(() => {
  const points = randomSpherePoint(0, 0, 0, getRandomIntInclusive(95, 100));
  return { id: nanoid(8), position: points, color: "gold" };
});

const red_cubes: BoxProps[] = [...Array(100).keys()].map(() => {
  const points = randomSpherePointConcentric(0, 0, 0, 20, 12);
  return {
    id: nanoid(8),
    position: points,
    scale: [6, 2, 2],
    color: "salmon",
    rotation: [0, 0, 0],
  };
});
export const TemDexPageBanner = () => {
  const [cubes, setCubes] = useState<BoxProps[]>(random_cubes);
  const [redCubes, setRedCubes] = useState<BoxProps[]>(red_cubes);

  useEffect(() => {
    // console.log(cubes);
  });

  return (
    <div className={container}>
      <Canvas shadows style={{ width: "100%", height: "100%" }}>
        <PerspectiveCamera fov={50} position={[94, 30, 0]} makeDefault />

        <directionalLight position={[1, 2, 4]} intensity={0.5} castShadow />
        <hemisphereLight intensity={1.5} groundColor="red" />

        <TemCard3D />

        {/* <Box id="cool" position={[0, 0, 0]} color={"blue"}></Box> */}

        {cubes.map((boxProps) => (
          <Box key={boxProps.id} {...boxProps} />
        ))}
        {redCubes.map((boxProps) => (
          <Box key={boxProps.id} {...boxProps} />
        ))}

        <OrbitControls
          // position={[0, 20, 100]}
          makeDefault
          // zoom0={100}
          // target={[0, 0, 0]}
          // minZoom={0}
          // maxZoom={20}
          // enableZoom={false}
          enablePan={false}
          // rotation={new Euler(0, 10, 20)}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
