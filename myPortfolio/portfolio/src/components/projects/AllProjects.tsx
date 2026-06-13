"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "RonitkumarSoni";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "YOUR_GITHUB_TOKEN";

// Helper for dynamic images based on project name keywords
const getProjectImage = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('rentease')) return "/rentease-new.png";
  if (n.includes('lms')) return "/lms-new.png";
  if (n.includes('canva')) return "/canva-new.png";
  if (n.includes('homie')) return "/homie-new.png";
  if (n.includes('bot') || n.includes('ai')) return "/aibot-new.png";
  if (n.includes('portfolio')) return "/portfolio-new.png";
  if (n.includes('ocean')) return "/ocean-depths.png";
  if (n.includes('genz')) return "/genz-agency.png";
  if (n.includes('spacex')) return "/spacex.png";
  if (n.includes('slice')) return "/slice.png";
  if (n.includes('dorje')) return "/dorje.png";
  if (n.includes('proxgy')) return "/proxgy.png";
  if (n.includes('usability')) return "/usabilityhub.png";
  if (n.includes('news')) return "https://github.com/RonitkumarSoni/News-App/raw/main/Thumbnail/NewsApp.png";
  if (n.includes('myntra')) return "/fitgearpreview.png";
  return "/placeholder-project.png"; 
};

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
      vel.push({ x: (Math.random() - 0.5) * 0.015, y: (Math.random() - 0.5) * 0.015, z: (Math.random() - 0.5) * 0.015 });
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
      positionsArray[i * 3] += velocities[i].x;
      positionsArray[i * 3 + 1] += velocities[i].y;
      positionsArray[i * 3 + 2] += velocities[i].z;
      if (Math.abs(positionsArray[i * 3]) > 12.5) velocities[i].x *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 12.5) velocities[i].y *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 4) velocities[i].z *= -1;
      const dx = positionsArray[i * 3] - mouseX;
      const dy = positionsArray[i * 3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) { positionsArray[i * 3] += dx * 0.005; positionsArray[i * 3 + 1] += dy * 0.005; }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDistance) {
          linePositions.push(positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2], positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]);
        }
      }
    }
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });
  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} /></bufferGeometry>
        <pointsMaterial color="#94a3b8" size={0.05} transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}><bufferGeometry /><lineBasicMaterial color="#cbd5e1" transparent opacity={0.25} /></lineSegments>
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
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const headers: HeadersInit = { Accept: "application/vnd.github.mercy-preview+json" };
        if (githubToken && githubToken !== "YOUR_GITHUB_TOKEN") { headers.Authorization = `Bearer ${githubToken}`; }
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, { headers });
        if (!res.ok) throw new Error("Failed to fetch repositories.");
        const data: Repo[] = await res.json();

        // DYNAMIC FILTERING: Only show projects tagged with 'feature' or 'portfolio'
        const filtered = data.filter(repo => 
          repo.topics?.includes('feature') || repo.topics?.includes('portfolio')
        );

        setProjects(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [githubToken, githubUsername]);

  const cards = projects.map((repo, index) => {
    const cardData = {
      src: getProjectImage(repo.name),
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
    };
    return <Card key={`card-${repo.id}`} card={cardData} index={index} />;
  });

  return (
    <div className="relative w-full min-h-screen pt-2 pb-12 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen bg-transparent">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}><ThreeBackground /></Canvas>
      </div>

      {loading ? (
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center min-h-[50vh]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800 dark:border-neutral-800 dark:border-t-neutral-200" />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col pt-2">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto w-full px-4 md:px-8 mb-2">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">My Projects</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm font-medium max-w-2xl">
              Automatic Sync: Projects tagged with <span className="text-primary font-bold">'feature'</span> on GitHub appear here automatically.
            </p>
          </motion.div>

          {projects.length > 0 ? (
            <>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="w-full">
                <Carousel items={cards} />
              </motion.div>
              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6">
                <div className="space-y-4">
                  {projects.map((repo, idx) => (
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} key={`desc-${repo.id}`} className="group flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                      <div className="flex-shrink-0 pt-0.5"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs">{idx + 1}</span></div>
                      <div>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-1">{repo.name.replace(/-/g, ' ').toUpperCase()}</h4>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">{repo.description || "Project tagged for portfolio showcase."}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-neutral-500">No projects tagged with 'feature' found on GitHub.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
