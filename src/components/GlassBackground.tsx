"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sub-component to manage interactive 3D elements inside Canvas
function InteractiveScene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightsRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Mouse coords ref for parallax tilt
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll trigger animations for the 3D meshes
    const sphere = sphereRef.current;
    const ring = ringRef.current;
    if (sphere && ring) {
      // Scene progression along the page scroll
      gsap.to(sphere.position, {
        x: 1.5,
        y: -1.0,
        z: -1,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(sphere.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(ring.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 4,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Auto rotate elements
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.x = time * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.2;
    }

    // Subtle mouse coordinates parallax tilt for camera
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 2.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouse.current.y * 2.5 + 0.5, 0.05);
    camera.lookAt(0, 0, 0);

    // Move red and white point lights dynamically to cast moving shadows/refractions
    if (lightsRef.current) {
      lightsRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <>
      {/* Lights Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#e60026" />

      {/* Orbiting Point Lights Group */}
      <group ref={lightsRef}>
        <pointLight position={[4, 2, 3]} intensity={10} color="#e60026" distance={15} decay={2} />
        <pointLight position={[-4, -2, -3]} intensity={8} color="#ff3366" distance={15} decay={2} />
        <pointLight position={[0, 4, -2]} intensity={6} color="#ffffff" distance={12} decay={2} />
      </group>

      {/* Central Morphing Glass Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef} position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#2d2d2d"
            roughness={0.1}
            metalness={0.1}
            distort={0.4}
            speed={1.5}
            transmission={0.9}
            thickness={2.0}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            attenuationDistance={1}
            attenuationColor="#e60026"
          />
        </mesh>
      </Float>

      {/* Orbiting Reflective Outer Glass Ring */}
      <mesh ref={ringRef} position={[0, 0.5, 0]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.06, 16, 100]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.9}
          transmission={0.8}
          thickness={1.5}
          clearcoat={1.0}
        />
      </mesh>
    </>
  );
}

export default function GlassBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
