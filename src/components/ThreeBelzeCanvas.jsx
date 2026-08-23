import React, { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Floating ambient micro-rings & particles for spatial anti-gravity effect
function FloatingParticles({ isDark }) {
  const particlesRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.3;
      ringRef1.current.rotation.y += delta * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.25;
      ringRef2.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <group ref={particlesRef}>
      {/* Orbital Ring 1 */}
      <mesh ref={ringRef1} position={[-2.8, 0.4, -0.5]}>
        <torusGeometry args={[0.45, 0.02, 12, 48]} />
        <meshStandardMaterial
          color={isDark ? "#38bdf8" : "#2563eb"}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ringRef2} position={[2.9, -0.3, 0.2]}>
        <torusGeometry args={[0.35, 0.018, 12, 48]} />
        <meshStandardMaterial
          color={isDark ? "#818cf8" : "#4f46e5"}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function Belze3DModel({ isDark }) {
  const groupRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const pointer = state.pointer || state.mouse || { x: 0, y: 0 };
    
    // Interactive mouse rotation with smooth lerp
    const targetRotX = (-pointer.y * Math.PI) / 9;
    const targetRotY = (pointer.x * Math.PI) / 7;

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.06
      );
    }

    // Dynamic light tracking cursor position in 3D
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        pointer.x * 5,
        0.08
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        pointer.y * 3,
        0.08
      );
    }
  });

  return (
    <>
      {/* Interactive Cursor Spotlight */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 3]}
        intensity={isDark ? 5 : 4}
        distance={10}
        color={isDark ? "#60a5fa" : "#3b82f6"}
      />

      <group ref={groupRef}>
        <Float
          speed={2.2}
          rotationIntensity={0.25}
          floatIntensity={0.7}
          floatingRange={[-0.08, 0.08]}
        >
          <Center>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.5}
              height={0.36}
              curveSegments={16}
              bevelEnabled
              bevelThickness={0.05}
              bevelSize={0.03}
              bevelOffset={0}
              bevelSegments={5}
              letterSpacing={0.08}
            >
              BELZE
              <meshStandardMaterial
                color={isDark ? "#f4f4f5" : "#18181b"}
                roughness={isDark ? 0.12 : 0.15}
                metalness={isDark ? 0.94 : 0.88}
                envMapIntensity={isDark ? 2.2 : 1.4}
              />
            </Text3D>
          </Center>

          {/* Floating Orbitals */}
          <FloatingParticles isDark={isDark} />
        </Float>
      </group>
    </>
  );
}

export default function ThreeBelzeCanvas({ isDark = true }) {
  const wrapperRef = useRef(null)

  // Saat F5/reload: browser destroy WebGL context → canvas tampil jadi kotak putih
  // Fix: langsung hide wrapper sebelum context hilang
  useEffect(() => {
    const handleUnload = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = '0'
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="w-full h-56 sm:h-64 md:h-80 cursor-grab active:cursor-grabbing select-none flex items-center justify-center relative"
    >
      <Canvas
        dpr={[1, 1.2]}
        gl={{ powerPreference: "high-performance", antialias: true }}
        camera={{ position: [0, 0, 5], fov: 42 }}
      >
        <ambientLight intensity={isDark ? 0.9 : 1.3} />
        
        {/* Main Directional Key Light */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={isDark ? 2.6 : 3.2}
          color="#ffffff"
        />

        {/* Top-Left Fill Light */}
        <directionalLight
          position={[-6, 4, 3]}
          intensity={isDark ? 1.5 : 2}
          color={isDark ? "#93c5fd" : "#cbd5e1"}
        />

        {/* Dramatic Rim Lights */}
        <pointLight
          position={[-5, -3, -2]}
          intensity={isDark ? 4.5 : 2.5}
          color={isDark ? "#3b82f6" : "#60a5fa"}
        />
        <pointLight
          position={[5, 3, 2]}
          intensity={isDark ? 3.5 : 2}
          color={isDark ? "#818cf8" : "#93c5fd"}
        />
        <pointLight
          position={[0, -4, 3]}
          intensity={isDark ? 2 : 1}
          color={isDark ? "#06b6d4" : "#e2e8f0"}
        />

        <Suspense fallback={null}>
          <Belze3DModel isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}

