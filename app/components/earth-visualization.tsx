"\"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

interface ISSData {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
}

interface EarthVisualizationProps {
  issData: ISSData | null
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)

  // Create earth texture (simple gradient for now)
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext("2d")!

    // Create a simple earth-like texture
    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, "#4A90E2")
    gradient.addColorStop(0.3, "#2E7D32")
    gradient.addColorStop(0.7, "#1B5E20")
    gradient.addColorStop(1, "#0D47A1")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 256)

    // Add some continent-like shapes
    ctx.fillStyle = "#2E7D32"
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 30 + 10, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Rotate earth slowly
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial map={earthTexture} />
    </mesh>
  )
}

function ISS({ issData }: { issData: ISSData | null }) {
  const issRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Line>(null)
  const trailPoints = useRef<THREE.Vector3[]>([])

  useEffect(() => {
    if (issData && issRef.current) {
      const position = latLngToVector3(issData.latitude, issData.longitude, 2.2)
      issRef.current.position.copy(position)

      // Add to trail
      trailPoints.current.push(position.clone())
      if (trailPoints.current.length > 100) {
        trailPoints.current.shift()
      }

      // Update trail geometry
      if (trailRef.current && trailPoints.current.length > 1) {
        const geometry = new THREE.BufferGeometry().setFromPoints(trailPoints.current)
        trailRef.current.geometry.dispose()
        trailRef.current.geometry = geometry
      }
    }
  }, [issData])

  if (!issData) return null

  return (
    <group>
      {/* ISS model */}
      <group ref={issRef}>
        <mesh>
          <boxGeometry args={[0.1, 0.05, 0.15]} />
          <meshPhongMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
        </mesh>
        {/* Solar panels */}
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.02, 0.15, 0.08]} />
          <meshPhongMaterial color="#1E3A8A" />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.02, 0.15, 0.08]} />
          <meshPhongMaterial color="#1E3A8A" />
        </mesh>
        {/* Glow effect */}
        <pointLight color="#FFD700" intensity={0.5} distance={1} />
      </group>

      {/* Orbit trail */}
      {trailPoints.current.length > 1 && (
        <line ref={trailRef}>
          <bufferGeometry />
          <lineBasicMaterial color="#FFD700" opacity={0.6} transparent />
        </line>
      )}
    </group>
  )
}

export function EarthVisualization({ issData }: EarthVisualizationProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: "transparent" }}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A90E2" />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      {/* Earth */}
      <Earth />

      {/* ISS */}
      <ISS issData={issData} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={false}
      />
    </Canvas>
  )
}
