'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Create a simple neural network representation
  const layers = [4, 6, 6, 2]; // Number of nodes in each layer
  const spacing = 1.5;
  const nodeSize = 0.08;
  
  const nodes = [];
  const connections = [];
  
  for (let l = 0; l < layers.length; l++) {
    const layerSize = layers[l];
    const x = (l - (layers.length - 1) / 2) * spacing * scale;
    
    for (let i = 0; i < layerSize; i++) {
      const y = (i - (layerSize - 1) / 2) * spacing * 0.5 * scale;
      nodes.push(
        <Sphere key={`node-${l}-${i}`} args={[nodeSize * scale, 16, 16]} position={[x, y, 0]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
        </Sphere>
      );
      
      // Create connections to next layer
      if (l < layers.length - 1) {
        const nextLayerSize = layers[l + 1];
        for (let j = 0; j < nextLayerSize; j++) {
          const ny = (j - (nextLayerSize - 1) / 2) * spacing * 0.5 * scale;
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

function Connection({ start, end, thickness = 0.01 }) {
  const [x1, y1, z1] = start;
  const [x2, y2, z2] = end;

  const direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1);
  const length = direction.length();
  direction.normalize();

  const geometry = useRef<THREE.CylinderGeometry>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const cylinder = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (cylinder.current) {
      cylinder.current.scale.set(1, length, 1);
      cylinder.current.position.set(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2, z1 + (z2 - z1) / 2);
      
      cylinder.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction
      );
    }
  }, [x1, y1, z1, x2, y2, z2, direction, length]);

  return (
    <mesh ref={cylinder}>
      <cylinderGeometry ref={geometry} args={[thickness, thickness, 1, 6]} />
      <meshStandardMaterial ref={material} color="#93c5fd" transparent opacity={0.6} />
    </mesh>
  );
}

function FloatingData() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const speed = 0.3 + i * 0.05;
        const amp = 0.1 + i * 0.02;
        child.position.y = Math.sin(clock.getElapsedTime() * speed) * amp;
        child.rotation.z = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.1;
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: 30 }, (_, i) => (
        <Sphere key={i} args={[0.04, 8, 8]} position={[
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        ]}>
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

export function MLVisualization() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-full w-full bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl" />;
  }

  return (
    <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
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
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}