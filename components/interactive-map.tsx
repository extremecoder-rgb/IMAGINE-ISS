"use client"

import { useEffect, useRef } from "react"

interface ISSData {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
}

interface InteractiveMapProps {
  issData: ISSData | null
}

export function InteractiveMap({ issData }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orbitPath = useRef<{ lat: number; lng: number }[]>([])

  useEffect(() => {
    if (!canvasRef.current || !issData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw world map outline (simplified)
    drawWorldMap(ctx, width, height)

    // Add current position to orbit path
    orbitPath.current.push({ lat: issData.latitude, lng: issData.longitude })
    if (orbitPath.current.length > 200) {
      orbitPath.current.shift()
    }

    // Draw orbit path
    drawOrbitPath(ctx, width, height)

    // Draw ISS position
    drawISSPosition(ctx, width, height, issData)

    // Draw future trajectory (predicted)
    drawFutureTrajectory(ctx, width, height, issData)
  }, [issData])

  const latLngToPixel = (lat: number, lng: number, width: number, height: number) => {
    const x = ((lng + 180) / 360) * width
    const y = ((90 - lat) / 180) * height
    return { x, y }
  }

  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw continents (simplified outlines)
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 1

    // Draw grid lines
    ctx.beginPath()
    for (let lat = -90; lat <= 90; lat += 30) {
      const y = ((90 - lat) / 180) * height
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }
    for (let lng = -180; lng <= 180; lng += 30) {
      const x = ((lng + 180) / 360) * width
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
    }
    ctx.stroke()

    // Draw simplified continent outlines
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 2

    // North America
    ctx.beginPath()
    ctx.moveTo(width * 0.15, height * 0.25)
    ctx.lineTo(width * 0.25, height * 0.15)
    ctx.lineTo(width * 0.35, height * 0.2)
    ctx.lineTo(width * 0.3, height * 0.4)
    ctx.lineTo(width * 0.15, height * 0.45)
    ctx.closePath()
    ctx.stroke()

    // Europe/Africa
    ctx.beginPath()
    ctx.moveTo(width * 0.45, height * 0.2)
    ctx.lineTo(width * 0.55, height * 0.15)
    ctx.lineTo(width * 0.6, height * 0.3)
    ctx.lineTo(width * 0.55, height * 0.7)
    ctx.lineTo(width * 0.45, height * 0.4)
    ctx.closePath()
    ctx.stroke()

    // Asia
    ctx.beginPath()
    ctx.moveTo(width * 0.6, height * 0.15)
    ctx.lineTo(width * 0.85, height * 0.1)
    ctx.lineTo(width * 0.9, height * 0.3)
    ctx.lineTo(width * 0.75, height * 0.4)
    ctx.lineTo(width * 0.6, height * 0.3)
    ctx.closePath()
    ctx.stroke()
  }

  const drawOrbitPath = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (orbitPath.current.length < 2) return

    ctx.strokeStyle = "#fbbf24"
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.6

    ctx.beginPath()
    orbitPath.current.forEach((point, index) => {
      const { x, y } = latLngToPixel(point.lat, point.lng, width, height)
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  const drawISSPosition = (ctx: CanvasRenderingContext2D, width: number, height: number, issData: ISSData) => {
    const { x, y } = latLngToPixel(issData.latitude, issData.longitude, width, height)

    // Draw ISS icon
    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw glow effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
    gradient.addColorStop(0, "rgba(251, 191, 36, 0.8)")
    gradient.addColorStop(1, "rgba(251, 191, 36, 0)")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    // Draw coordinates
    ctx.fillStyle = "#ffffff"
    ctx.font = "12px monospace"
    ctx.fillText(`${issData.latitude.toFixed(2)}°, ${issData.longitude.toFixed(2)}°`, x + 15, y - 10)
    ctx.fillText(`${Math.round(issData.altitude)} km`, x + 15, y + 5)
    ctx.fillText(`${Math.round(issData.velocity)} km/h`, x + 15, y + 20)
  }

  const drawFutureTrajectory = (ctx: CanvasRenderingContext2D, width: number, height: number, issData: ISSData) => {
    // Simplified future trajectory calculation
    ctx.strokeStyle = "#06b6d4"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.globalAlpha = 0.7

    ctx.beginPath()
    const currentLat = issData.latitude
    const currentLng = issData.longitude

    // Simulate orbital motion (simplified)
    for (let i = 0; i < 90; i += 5) {
      const futureTime = i / 60 // hours
      const orbitalRate = 360 / 1.5 // degrees per hour (approximate)
      const futureLng = (currentLng + orbitalRate * futureTime) % 360
      const futureLat = currentLat + Math.sin(futureTime * 0.1) * 10 // Simplified inclination

      const { x, y } = latLngToPixel(futureLat, futureLng > 180 ? futureLng - 360 : futureLng, width, height)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = 1
  }

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" style={{ background: "#0f172a" }} />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Current Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-yellow-400 opacity-60"></div>
            <span>Orbit Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-cyan-400 opacity-70 border-dashed border-t-2"></div>
            <span>Future Trajectory</span>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-1 text-green-400 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          LIVE
        </div>
      </div>
    </div>
  )
}
