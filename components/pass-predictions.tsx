"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Eye, Share2, Bell, Navigation } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useISS } from "../context/iss-context"

interface PassData {
  startTime: number
  endTime: number
  duration: number
  maxElevation: number
  startAz: number
  endAz: number
  startAzCompass: string
  endAzCompass: string
  maxAz: number
  maxAzCompass: string
}

export function PassPredictions() {
  const [location, setLocation] = useState({ lat: "", lon: "", city: "" })
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState<Set<number>>(new Set())
  const { passes, setPasses } = useISS()
  const { toast } = useToast()

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(4)
          const lon = position.coords.longitude.toFixed(4)

          // Try to get city name using reverse geocoding
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            )
            const data = await response.json()
            setLocation({
              lat,
              lon,
              city: data.city || data.locality || "Your Location",
            })
          } catch {
            setLocation({ lat, lon, city: "Your Location" })
          }
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter coordinates manually.",
            variant: "destructive",
          })
        },
      )
    }
  }

  const fetchPasses = async () => {
    if (!location.lat || !location.lon) return

    setLoading(true)
    try {
      const response = await fetch(
        `https://api.wheretheiss.at/v1/satellites/25544/passes?lat=${location.lat}&lon=${location.lon}&limit=10&days=14`,
      )
      const data = await response.json()
      setPasses(data)

      toast({
        title: "Pass Predictions Updated",
        description: `Found ${data.length} upcoming passes for ${location.city}`,
      })
    } catch (error) {
      console.error("Error fetching passes:", error)
      toast({
        title: "Error",
        description: "Failed to fetch pass predictions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const sharePass = (pass: PassData) => {
    const startTime = new Date(pass.startTime * 1000)
    const text = `🛰️ ISS Pass Alert! The International Space Station will be visible from ${location.city || "your location"} on ${startTime.toLocaleDateString()} at ${startTime.toLocaleTimeString()}. Duration: ${Math.round(pass.duration / 60)} minutes, Max elevation: ${Math.round(pass.maxElevation)}°. Look ${pass.startAzCompass}! #ISS #SpaceStation #Astronomy`

    if (navigator.share) {
      navigator.share({
        title: "ISS Pass Prediction",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard!",
        description: "Share this ISS pass information on social media.",
      })
    }
  }

  const scheduleNotification = async (pass: PassData) => {
    if (!("Notification" in window)) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      })
      return
    }

    if (Notification.permission === "denied") {
      toast({
        title: "Notifications blocked",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive",
      })
      return
    }

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        return
      }
    }

    const passTime = new Date(pass.startTime * 1000)
    const notificationTime = new Date(passTime.getTime() - 10 * 60 * 1000) // 10 minutes before
    const now = new Date()

    if (notificationTime > now) {
      const timeUntilNotification = notificationTime.getTime() - now.getTime()

      setTimeout(() => {
        new Notification("ISS Pass Starting Soon!", {
          body: `The ISS will be visible in 10 minutes from ${location.city}. Look ${pass.startAzCompass}!`,
          icon: "/favicon.ico",
          tag: `iss-pass-${pass.startTime}`,
        })
      }, timeUntilNotification)

      setNotifications((prev) => new Set(prev).add(pass.startTime))

      toast({
        title: "Notification Scheduled",
        description: `You'll be notified 10 minutes before the pass at ${passTime.toLocaleTimeString()}`,
      })
    } else {
      toast({
        title: "Pass too soon",
        description: "This pass is starting too soon to schedule a notification.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const getVisibilityQuality = (elevation: number) => {
    if (elevation >= 50) return { label: "Excellent", color: "bg-green-500" }
    if (elevation >= 30) return { label: "Good", color: "bg-blue-500" }
    if (elevation >= 20) return { label: "Fair", color: "bg-yellow-500" }
    return { label: "Poor", color: "bg-red-500" }
  }

  return (
    <div className="space-y-6">
      {/* Location Input */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MapPin className="h-5 w-5 text-red-400" />
            Observation Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={getUserLocation} className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            <Navigation className="h-4 w-4 mr-2" />
            Use Current Location
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Latitude</Label>
              <Input
                value={location.lat}
                onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                placeholder="40.7128"
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Longitude</Label>
              <Input
                value={location.lon}
                onChange={(e) => setLocation({ ...location, lon: e.target.value })}
                placeholder="-74.0060"
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">City (optional)</Label>
              <Input
                value={location.city}
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                placeholder="New York"
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            onClick={fetchPasses}
            disabled={!location.lat || !location.lon || loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading Predictions...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Get Pass Predictions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pass Predictions */}
      {passes.length > 0 && (
        <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="h-5 w-5 text-yellow-400" />
              Upcoming Visible Passes
              {location.city && (
                <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {location.city}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {passes.map((pass, index) => {
                const visibility = getVisibilityQuality(pass.maxElevation)
                const startTime = new Date(pass.startTime * 1000)
                const isNotificationSet = notifications.has(pass.startTime)

                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-colors">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-600 hover:bg-yellow-700">Pass #{index + 1}</Badge>
                          <Badge className={`${visibility.color} text-white`}>{visibility.label}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <Label className="text-gray-400 flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              Start Time
                            </Label>
                            <p className="text-sm text-white font-mono">{startTime.toLocaleDateString()}</p>
                            <p className="text-lg text-blue-400 font-bold">{startTime.toLocaleTimeString()}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <Label className="text-gray-400 text-xs">Duration</Label>
                              <p className="text-green-400 font-bold">{Math.round(pass.duration / 60)} min</p>
                            </div>
                            <div>
                              <Label className="text-gray-400 text-xs">Max Elevation</Label>
                              <p className="text-blue-400 font-bold">{Math.round(pass.maxElevation)}°</p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-gray-400 text-xs">Direction</Label>
                            <p className="text-purple-400 font-medium">
                              {pass.startAzCompass} → {pass.endAzCompass}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => sharePass(pass)}
                            className="text-gray-400 hover:text-white flex-1"
                          >
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => scheduleNotification(pass)}
                            disabled={isNotificationSet}
                            className={`flex-1 ${
                              isNotificationSet
                                ? "text-green-400 hover:text-green-300"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            {isNotificationSet ? "Set" : "Notify"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
