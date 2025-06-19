"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, ExternalLink, Volume2, VolumeX } from "lucide-react"

export function LiveVideoFeed() {
  const [selectedFeed, setSelectedFeed] = useState("earth")
  const [isMuted, setIsMuted] = useState(true)

  const videoFeeds = [
    {
      id: "earth",
      title: "Earth View HD",
      description: "High-definition view of Earth from the ISS",
      url: "https://www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1",
      status: "live",
    },
    {
      id: "iss-tracker",
      title: "ISS Tracker",
      description: "Real-time ISS position and Earth view",
      url: "https://www.youtube.com/embed/4993sBLAzGA?autoplay=1&mute=1",
      status: "live",
    },
    {
      id: "nasa-live",
      title: "NASA Live",
      description: "Official NASA live stream",
      url: "https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1",
      status: "live",
    },
  ]

  const currentFeed = videoFeeds.find((feed) => feed.id === selectedFeed)

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Video className="h-5 w-5 text-red-400" />
              {currentFeed?.title}
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">LIVE</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(currentFeed?.url.replace("/embed/", "/watch?v="), "_blank")}
                className="text-white hover:bg-white/20"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{currentFeed?.description}</p>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={currentFeed?.url + (isMuted ? "&mute=1" : "&mute=0")}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentFeed?.title}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feed Selection */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Available Feeds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videoFeeds.map((feed) => (
              <Card
                key={feed.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedFeed === feed.id
                    ? "bg-blue-500/20 border-blue-500/50"
                    : "bg-gray-800/50 border-gray-600 hover:bg-gray-800/70"
                }`}
                onClick={() => setSelectedFeed(feed.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{feed.title}</h3>
                      <Badge
                        className={
                          feed.status === "live"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }
                      >
                        {feed.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">{feed.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Information */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">About the Live Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Earth View Camera</h3>
              <p className="text-sm">
                The High Definition Earth Viewing (HDEV) experiment aboard the ISS provides live views of Earth. The
                cameras are enclosed in a pressurized and temperature-controlled housing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Technical Details</h3>
              <ul className="text-sm space-y-1">
                <li>• Resolution: 1920x1080 HD</li>
                <li>• Frame rate: 30 fps</li>
                <li>• Orbital period: ~92 minutes</li>
                <li>• Day/night cycle visible</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">Viewing Tips</h4>
            <ul className="text-sm space-y-1">
              <li>• The ISS orbits Earth every 90 minutes</li>
              <li>• You'll see day and night cycles during the stream</li>
              <li>• Sometimes the feed may show a blue screen during maintenance</li>
              <li>• Best views are during daylight passes over populated areas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
