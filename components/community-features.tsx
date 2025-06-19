"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Users, Globe2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Sighting {
  id: string
  user: string
  location: string
  timestamp: Date
  description: string
  likes: number
  comments: number
  photo?: string
}

export function CommunityFeatures() {
  const [sightings, setSightings] = useState<Sighting[]>([
    {
      id: "1",
      user: "AstroMike",
      location: "New York, NY",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description:
        "Amazing ISS pass tonight! Saw it for almost 6 minutes crossing from west to east. Perfect clear skies!",
      likes: 12,
      comments: 3,
    },
    {
      id: "2",
      user: "StarGazer_Sarah",
      location: "London, UK",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      description: "Caught the ISS just after sunset. It was incredibly bright! My kids were amazed 🚀",
      likes: 8,
      comments: 2,
    },
    {
      id: "3",
      user: "SpaceEnthusiast",
      location: "Tokyo, Japan",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      description: "First time spotting the ISS! Used this tracker and found it perfectly. Thank you!",
      likes: 15,
      comments: 5,
    },
  ])

  const [newSighting, setNewSighting] = useState("")
  const [globalViewers] = useState([
    { location: "New York", count: 234 },
    { location: "London", count: 189 },
    { location: "Tokyo", count: 156 },
    { location: "Sydney", count: 98 },
    { location: "Berlin", count: 87 },
  ])

  const { toast } = useToast()

  const handleLike = (id: string) => {
    setSightings((prev) => prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s)))
  }

  const shareSighting = (sighting: Sighting) => {
    const text = `Just spotted the ISS from ${sighting.location}! ${sighting.description} #ISS #SpaceStation #Astronomy`

    if (navigator.share) {
      navigator.share({
        title: "ISS Sighting",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard!",
        description: "Share your ISS sighting on social media.",
      })
    }
  }

  const submitSighting = () => {
    if (!newSighting.trim()) return

    const sighting: Sighting = {
      id: Date.now().toString(),
      user: "You",
      location: "Your Location",
      timestamp: new Date(),
      description: newSighting,
      likes: 0,
      comments: 0,
    }

    setSightings((prev) => [sighting, ...prev])
    setNewSighting("")

    toast({
      title: "Sighting shared!",
      description: "Your ISS sighting has been added to the community feed.",
    })
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <section className="space-y-6 mt-10">
      {/* Global Viewers */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe2 className="h-5 w-5 text-cyan-400" />
            Global View — Who's Watching the ISS?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {globalViewers.map((viewer) => (
              <Badge key={viewer.location} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {viewer.location}: {viewer.count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Share a Sighting */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-purple-400" />
            Share Your ISS Sighting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={newSighting}
            onChange={(e) => setNewSighting(e.target.value)}
            placeholder="Describe your ISS sighting..."
            className="w-full h-24 p-3 bg-gray-800/60 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <Button onClick={submitSighting} className="bg-green-600 hover:bg-green-700">
            Post Sighting
          </Button>
        </CardContent>
      </Card>

      {/* Community Feed */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Share2 className="h-5 w-5 text-yellow-400" />
            Community Sightings Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sightings.map((sighting) => (
            <Card key={sighting.id} className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{sighting.user}</h3>
                    <p className="text-xs text-gray-400">
                      {sighting.location} • {formatTime(sighting.timestamp)}
                    </p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Sighting</Badge>
                </div>
                <p className="text-gray-300 text-sm">{sighting.description}</p>
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(sighting.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {sighting.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {sighting.comments}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => shareSighting(sighting)}
                    className="text-gray-400 hover:text-green-400 ml-auto"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
