import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
  const stars = useRef();

  useEffect(() => {
    const animateStars = () => {
      if (stars.current) {
        stars.current.rotation.y += 0.001;
      }
    };

    const frameId = requestAnimationFrame(animateStars);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Generate random stars
  const numStars = 1000;
  const starsArray = Array.from({ length: numStars }, (_, i) => (
    <mesh key={i} position={[Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  ));

  return (
    <group ref={stars}>
      {starsArray}
    </group>
  );
};

const StarryBackground = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
    </Canvas>
  );
};

export default StarryBackground;
