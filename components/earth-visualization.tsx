"use client"

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
  const cloudsRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  // Create realistic Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    // Create Earth-like texture with continents and oceans
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, "#87CEEB") // Sky blue for poles
    gradient.addColorStop(0.3, "#4682B4") // Steel blue for oceans
    gradient.addColorStop(0.7, "#228B22") // Forest green for land
    gradient.addColorStop(1, "#87CEEB") // Sky blue for poles

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)

    // Add continents (simplified shapes)
    ctx.fillStyle = "#228B22" // Forest green

    // North America
    ctx.beginPath()
    ctx.ellipse(150, 180, 80, 60, 0, 0, Math.PI * 2)
    ctx.fill()

    // South America
    ctx.beginPath()
    ctx.ellipse(200, 320, 40, 80, 0, 0, Math.PI * 2)
    ctx.fill()

    // Europe/Africa
    ctx.beginPath()
    ctx.ellipse(500, 200, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(520, 300, 50, 70, 0, 0, Math.PI * 2)
    ctx.fill()

    // Asia
    ctx.beginPath()
    ctx.ellipse(700, 180, 120, 80, 0, 0, Math.PI * 2)
    ctx.fill()

    // Australia
    ctx.beginPath()
    ctx.ellipse(800, 380, 40, 25, 0, 0, Math.PI * 2)
    ctx.fill()

    // Add some mountain ranges and details
    ctx.fillStyle = "#8B4513" // Saddle brown for mountains
    for (let i = 0; i < 30; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 8 + 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add ice caps
    ctx.fillStyle = "#F0F8FF" // Alice blue for ice
    ctx.beginPath()
    ctx.ellipse(512, 50, 200, 30, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(512, 462, 200, 30, 0, 0, Math.PI * 2)
    ctx.fill()

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Create cloud texture
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, 1024, 512)

    // Add cloud patterns
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const radius = Math.random() * 20 + 5
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Rotate earth slowly
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={earthTexture} shininess={100} specular={new THREE.Color(0x4682b4)} />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshPhongMaterial map={cloudTexture} transparent opacity={0.6} depthWrite={false} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color(0x87ceeb)} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function ISS({ issData }: { issData: ISSData | null }) {
  const issRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Line>(null)
  const trailPoints = useRef<THREE.Vector3[]>([])

  useEffect(() => {
    if (issData && issRef.current) {
      const position = latLngToVector3(issData.latitude, issData.longitude, 2.3)
      issRef.current.position.copy(position)

      // Add to trail
      trailPoints.current.push(position.clone())
      if (trailPoints.current.length > 150) {
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

  // Animate ISS rotation
  useFrame((state) => {
    if (issRef.current) {
      issRef.current.rotation.x += 0.01
      issRef.current.rotation.z += 0.005
    }
  })

  if (!issData) return null

  return (
    <group>
      {/* ISS model - more detailed */}
      <group ref={issRef}>
        {/* Main body */}
        <mesh>
          <boxGeometry args={[0.15, 0.08, 0.2]} />
          <meshPhongMaterial color="#C0C0C0" emissive="#FFD700" emissiveIntensity={0.2} />
        </mesh>

        {/* Solar panels */}
        <mesh position={[-0.12, 0, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.12]} />
          <meshPhongMaterial color="#1E3A8A" emissive="#1E3A8A" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.12]} />
          <meshPhongMaterial color="#1E3A8A" emissive="#1E3A8A" emissiveIntensity={0.3} />
        </mesh>

        {/* Radiators */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.15]} />
          <meshPhongMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.15]} />
          <meshPhongMaterial color="#FFFFFF" />
        </mesh>

        {/* Bright glow effect */}
        <pointLight color="#FFD700" intensity={1} distance={2} />
        <pointLight color="#FFFFFF" intensity={0.5} distance={1} />
      </group>

      {/* Enhanced orbit trail */}
      {trailPoints.current.length > 1 && (
        <line ref={trailRef}>
          <bufferGeometry />
          <lineBasicMaterial color="#00FFFF" opacity={0.8} transparent linewidth={3} />
        </line>
      )}
    </group>
  )
}

export function EarthVisualization({ issData }: EarthVisualizationProps) {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-black via-gray-900 to-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#4A90E2" />
        <pointLight position={[0, 0, 10]} intensity={0.3} color="#FFD700" />

        {/* Enhanced stars background */}
        <Stars radius={200} depth={100} count={8000} factor={6} saturation={0.2} fade speed={0.5} />

        {/* Earth */}
        <Earth />

        {/* ISS */}
        <ISS issData={issData} />

        {/* Enhanced controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          autoRotate={true}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>

      {/* Enhanced overlay information */}
      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md rounded-xl p-4 text-white border border-white/20">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">ISS Current Position</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-1 bg-cyan-400 opacity-80"></div>
            <span className="text-sm">Orbital Path</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Earth (Realistic)</span>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="absolute top-6 right-6 bg-green-500/20 backdrop-blur-md rounded-xl px-4 py-2 text-green-400 font-semibold border border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          LIVE TRACKING
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute top-6 left-6 bg-blue-500/20 backdrop-blur-md rounded-xl px-4 py-2 text-blue-400 text-sm border border-blue-500/30">
        <div className="space-y-1">
          <div>🖱️ Drag to rotate</div>
          <div>🔍 Scroll to zoom</div>
        </div>
      </div>
    </div>
  )
}
