"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Smartphone, Navigation, Eye } from "lucide-react"
import { useISS } from "../context/iss-context"

export function ARCompass() {
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const { issData } = useISS()

  useEffect(() => {
    // Check if device orientation is supported
    if (typeof DeviceOrientationEvent !== "undefined") {
      setIsSupported(true)
    }
  }, [])

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent !== "undefined" && "requestPermission" in DeviceOrientationEvent) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission()
        setPermission(response)
        if (response === "granted") {
          startTracking()
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error)
      }
    } else {
      // For non-iOS devices, start tracking directly
      startTracking()
      setPermission("granted")
    }
  }

  const startTracking = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      })
    }

    window.addEventListener("deviceorientation", handleOrientation)
    return () => window.removeEventListener("deviceorientation", handleOrientation)
  }

  const calculateISSDirection = () => {
    if (!issData) return { azimuth: 0, elevation: 0 }

    // Simplified calculation - in a real app, you'd use proper astronomical calculations
    // This is a mock calculation for demonstration
    const azimuth = (issData.longitude + 180) % 360
    const elevation = Math.abs(issData.latitude) > 60 ? 10 : 45

    return { azimuth, elevation }
  }

  const issDirection = calculateISSDirection()
  const relativeDirection = (issDirection.azimuth - deviceOrientation.alpha + 360) % 360

  return (
    <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Compass className="h-5 w-5 text-cyan-400" />
          AR Sky Compass
          {permission === "granted" && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ACTIVE</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSupported ? (
          <div className="text-center py-8">
            <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Device orientation not supported</p>
            <p className="text-sm text-gray-400">This feature requires a mobile device with orientation sensors</p>
          </div>
        ) : permission !== "granted" ? (
          <div className="text-center py-8">
            <Navigation className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">Enable device orientation to use AR compass</p>
            <Button onClick={requestPermission} className="bg-blue-600 hover:bg-blue-700">
              Enable AR Compass
            </Button>
            <p className="text-xs text-gray-400 mt-2">Point your device at the sky to see ISS direction</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Compass Display */}
            <div className="relative w-48 h-48 mx-auto">
              {/* Compass Circle */}
              <div className="absolute inset-0 border-2 border-gray-600 rounded-full">
                {/* Cardinal Directions */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-xs text-gray-400">
                  N
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 text-xs text-gray-400">
                  E
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 text-xs text-gray-400">
                  S
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 text-xs text-gray-400">
                  W
                </div>

                {/* Device Direction Indicator */}
                <div
                  className="absolute top-1/2 left-1/2 w-1 h-16 bg-blue-400 transform -translate-x-1/2 -translate-y-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${deviceOrientation.alpha}deg)` }}
                />

                {/* ISS Direction Indicator */}
                <div
                  className="absolute top-1/2 left-1/2 w-2 h-12 bg-yellow-400 transform -translate-x-1/2 -translate-y-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${issDirection.azimuth}deg)` }}
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Eye className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Direction Info */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">ISS Direction</p>
                <p className="text-lg font-mono text-yellow-400 font-bold">{Math.round(issDirection.azimuth)}°</p>
                <p className="text-xs text-gray-400">
                  {issDirection.azimuth < 45 || issDirection.azimuth > 315
                    ? "North"
                    : issDirection.azimuth < 135
                      ? "East"
                      : issDirection.azimuth < 225
                        ? "South"
                        : "West"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Elevation</p>
                <p className="text-lg font-mono text-green-400 font-bold">{Math.round(issDirection.elevation)}°</p>
                <p className="text-xs text-gray-400">Above horizon</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                How to Use
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Hold your device upright and point it at the sky</li>
                <li>• The yellow arrow shows where the ISS is located</li>
                <li>• Blue arrow shows your device's current direction</li>
                <li>• Best visibility during twilight hours</li>
              </ul>
            </div>

            {/* Current Readings */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-gray-400">Compass</p>
                <p className="text-blue-400 font-mono">{Math.round(deviceOrientation.alpha)}°</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Tilt</p>
                <p className="text-green-400 font-mono">{Math.round(deviceOrientation.beta)}°</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Roll</p>
                <p className="text-purple-400 font-mono">{Math.round(deviceOrientation.gamma)}°</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
