"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Props for the Connection component
 */
type ConnectionProps = {
  start: [number, number, number];
  end: [number, number, number];
  thickness?: number;
};

/**
 * A small cylinder connecting two spheres in 3D space
 */
function Connection({ start, end, thickness = 0.01 }: ConnectionProps) {
  const cylinderRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const [x1, y1, z1] = start;
    const [x2, y2, z2] = end;

    const direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1);
    const length = direction.length();
    direction.normalize();

    if (cylinderRef.current) {
      cylinderRef.current.scale.set(1, length, 1);
      cylinderRef.current.position.set(
        x1 + (x2 - x1) / 2,
        y1 + (y2 - y1) / 2,
        z1 + (z2 - z1) / 2
      );
      cylinderRef.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction
      );
    }
  });

  return (
    <mesh ref={cylinderRef}>
      <cylinderGeometry args={[thickness, thickness, 1, 6]} />
      <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
    </mesh>
  );
}

/**
 * Props for the NeuralNetwork component
 */
type NeuralNetworkProps = {
  position?: [number, number, number];
  scale?: number;
};

/**
 * Renders a simplistic multi-layer perceptron (MLP) network in 3D
 */
function NeuralNetwork({ position = [0, 0, 0], scale = 1 }: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Layers: 4 -> 6 -> 6 -> 2
  const layers = [4, 6, 6, 2];
  const spacing = 1.5;
  const nodeSize = 0.08;

  const nodes: JSX.Element[] = [];
  const connections: JSX.Element[] = [];

  for (let l = 0; l < layers.length; l++) {
    const layerSize = layers[l];
    // Center each layer about the origin in x-direction
    const x = (l - (layers.length - 1) / 2) * spacing * scale;

    for (let i = 0; i < layerSize; i++) {
      // Center each layer in y-direction
      const y = (i - (layerSize - 1) / 2) * (spacing * 0.5) * scale;

      // Each node is a sphere
      nodes.push(
        <Sphere
          key={`node-${l}-${i}`}
          args={[nodeSize * scale, 16, 16]}
          position={[x, y, 0]}
        >
          <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
        </Sphere>
      );

      // Create connections to the next layer
      if (l < layers.length - 1) {
        const nextLayerSize = layers[l + 1];
        for (let j = 0; j < nextLayerSize; j++) {
          const ny = (j - (nextLayerSize - 1) / 2) * (spacing * 0.5) * scale;
          connections.push(
            <Connection
              key={`conn-${l}-${i}-${j}`}
              start={[x, y, 0]}
              end={[x + spacing * scale, ny, 0]}
              thickness={0.01 * scale}
            />
          );
        }
      }
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {connections}
      {nodes}
    </group>
  );
}

/**
 * A set of smaller, floating spheres that gently move around
 */
function FloatingData() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const speed = 0.3 + i * 0.05;
        const amp = 0.1 + i * 0.02;
        child.position.y = Math.sin(clock.getElapsedTime() * speed) * amp;
        child.rotation.z =
          Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 30 }, (_, i) => (
        <Sphere
          key={i}
          args={[0.04, 8, 8]}
          position={[
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
          ]}
        >
          <MeshDistortMaterial
            color="#60a5fa"
            speed={0.5}
            distort={0.2}
            radius={1}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

/**
 * Main visualization component
 */
export default function DynamicNeuralNetworkVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} angle={0.3} intensity={0.5} />

      <NeuralNetwork position={[0, 0, 0]} scale={0.8} />
      <FloatingData />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
