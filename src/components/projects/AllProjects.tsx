"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "RonitkumarSoni";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "YOUR_GITHUB_TOKEN";

// The precise list of clones the user wants in EXACT order.
const TARGET_CLONES = [
  { id: "dorje", searchPrefix: "dorje", title: "Dorje Teas Clone", image: "/dorje.png" },
  { id: "proxgy", searchPrefix: "proxgy", title: "Proxgy Clone", image: "/proxgy.png" },
  { id: "slice", searchPrefix: "slice", title: "Slice Clone", image: "/slice.png" },
  { id: "spacex", searchPrefix: "spacex", title: "SpaceX Clone", image: "/spacex.png" },
  { id: "usability", searchPrefix: "usability", title: "UsabilityHub Clone", image: "/usabilityhub.png" },
];

import * as THREE from "three";

/**
 * Premium Three.js effect: Particle Constellation Field
 * A subtle, elegant, interactive network with interconnected nodes
 */
function ThreeBackground() {
  const particleCount = 120;
  const maxDistance = 3.5;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      vel.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }
    return vel;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < particleCount; i++) {
      // Move particles
      positionsArray[i * 3] += velocities[i].x;
      positionsArray[i * 3 + 1] += velocities[i].y;
      positionsArray[i * 3 + 2] += velocities[i].z;

      // Soft bounding box bounce
      if (Math.abs(positionsArray[i * 3]) > 12.5) velocities[i].x *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 12.5) velocities[i].y *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 4) velocities[i].z *= -1;

      // Subtle mouse interaction (gravity)
      const dx = positionsArray[i * 3] - mouseX;
      const dy = positionsArray[i * 3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        positionsArray[i * 3] += dx * 0.005;
        positionsArray[i * 3 + 1] += dy * 0.005;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Draw connecting lines
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(
            positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
            positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#94a3b8" size={0.05} transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#cbd5e1" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export default function AllProjects({
  githubToken = GITHUB_TOKEN,
  githubUsername = GITHUB_USERNAME,
}: {
  githubToken?: string;
  githubUsername?: string;
} = {}) {
  // We keep the resolved projects matching our target order
  const [projects, setProjects] = useState<(Repo & { cloneMeta: typeof TARGET_CLONES[0] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github.mercy-preview+json",
        };
        // Authenticate requests if a token exists
        if (githubToken && githubToken !== "YOUR_GITHUB_TOKEN") {
          headers.Authorization = `Bearer ${githubToken}`;
        }

        const res = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
          { headers }
        );
        if (!res.ok) throw new Error("Failed to fetch repositories.");
        const data: Repo[] = await res.json();

        // 1. Map real github data perfectly into our exact 5 target clones
        const matchedProjects = TARGET_CLONES.map((cloneMeta) => {
          // Find the github repo matching this clone
          const foundRepo = data.find((repo) =>
            repo.name.toLowerCase().includes(cloneMeta.searchPrefix.toLowerCase())
          );

          if (foundRepo) {
            return { ...foundRepo, cloneMeta };
          }
          // If we fail to fetch one, provide a resilient fallback using the data we expect
          return {
            id: Math.random(),
            name: cloneMeta.title,
            description: `A responsive clone of the ${cloneMeta.title.replace(' Clone', '')} platform focusing on seamless UI and layout perfection.`,
            html_url: `https://github.com/${githubUsername}/${cloneMeta.title.replace(/\s+/g, '-')}`,
            homepage: "https://your-live-demo-link.vercel.app",
            cloneMeta
          };
        });

        setProjects(matchedProjects);
      } catch (error) {
        console.error(error);

        // Fallback for offline or rate-limit issues
        setProjects(TARGET_CLONES.map((cloneMeta, i) => ({
          id: i,
          name: cloneMeta.title,
          description: `A responsive clone of the ${cloneMeta.title.replace(' Clone', '')} platform focusing on UI and layout design.`,
          html_url: `https://github.com/${githubUsername}`,
          homepage: null,
          cloneMeta
        })));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [githubToken, githubUsername]);

  // Map into strictly the properties card expects
  const cards = projects.map((repo, index) => {
    const cardData = {
      src: repo.cloneMeta.image,
      title: repo.cloneMeta.title,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
    };

    return <Card key={`card-${repo.id}`} card={cardData} index={index} />;
  });

  return (
    <div className="relative w-full min-h-screen pt-2 pb-12 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500 ">

      {/* Three.js Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen bg-transparent">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ThreeBackground />
        </Canvas>
      </div>

      {loading ? (
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center min-h-[50vh]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800 dark:border-neutral-800 dark:border-t-neutral-200" />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col pt-2">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" as any }}
            className="max-w-7xl mx-auto w-full px-4 md:px-8 mb-2"
          >
            <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4 transition-colors">
              My Projects
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm font-medium max-w-2xl">
              A curated selection of my front-end engineering work, focusing on precise UI recreation and robust development.
            </p>
          </motion.div>

          {/* Cards Carousel (Middle) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <Carousel items={cards} />
          </motion.div>

          {/* Detailed Descriptions List (Bottom) */}
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-5"
            >
              {projects.map((repo, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={`desc-${repo.id}`}
                  className="group flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/80 dark:hover:bg-neutral-900/50"
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-1 font-sans tracking-tight">
                      {repo.cloneMeta.title}
                    </h4>
                    <p className="text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed text-sm lg:pr-10">
                      {repo.description || `A highly responsive and pixel-perfect clone mimicking the aesthetics and interactions of the real application. Built with modern web technologies, this project showcases deep proficiency in layouts, animations, and frontend precision.`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      )}
    </div>
  );
}
