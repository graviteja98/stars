import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

const Stars = () => {
  const numStars = 1000;
  const starsArray = Array.from({ length: numStars }, (_, i) => (
    <mesh key={i} position={[Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  ));

  return (
    <group>
      {starsArray}
    </group>
  );
};

const App = () => {
  const camera = useRef();
  const controls = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = event.clientX / window.innerWidth * 2 - 1;
      const mouseY = event.clientY / window.innerHeight * 2 - 1;

      const azimuthAngle = mouseX * (Math.PI / 2);
      const polarAngle = mouseY * (Math.PI / 4);

      if (controls.current) {
        // Calculate the new target position based on camera's current position and direction
        const target = new Vector3().copy(camera.current.position).add(camera.current.getWorldDirection(new Vector3()).multiplyScalar(-1));
        
        // Update controls' target and rotate the camera based on the calculated angles
        controls.current.target = target;
        controls.current.object.position.copy(camera.current.position);
        controls.current.object.lookAt(target);
        controls.current.object.rotation.y -= azimuthAngle;
        controls.current.object.rotation.x += polarAngle;
        controls.current.update();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas style={{ background: 'black', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <OrbitControls ref={controls} enablePan={false} enableRotate={true} enableZoom={true} />
        <perspectiveCamera ref={camera} position={[0, 0, -10]} />
      </Canvas>
    </div>
  );
};

export default App;
