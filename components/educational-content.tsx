"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Lightbulb, Rocket, Globe, Users, Zap, Calendar, Award, ExternalLink } from "lucide-react"

export function EducationalContent() {
  const [dailyFact] = useState({
    title: "ISS Solar Arrays",
    content:
      "The ISS solar arrays generate enough electricity to power about 40 homes on Earth. They automatically rotate to track the Sun as the station orbits, completing one rotation every 90 minutes.",
    category: "Power Systems",
  })

  const facts = [
    {
      icon: <Rocket className="h-5 w-5 text-blue-400" />,
      title: "Speed & Orbit",
      content:
        "The ISS travels at approximately 28,000 km/h (17,500 mph) and completes one orbit around Earth every 90 minutes.",
      category: "Orbital Mechanics",
    },
    {
      icon: <Globe className="h-5 w-5 text-green-400" />,
      title: "Size & Mass",
      content: "The ISS is about the size of a football field and weighs approximately 420,000 kg (925,000 pounds).",
      category: "Structure",
    },
    {
      icon: <Users className="h-5 w-5 text-purple-400" />,
      title: "International Cooperation",
      content:
        "The ISS is a joint project between NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada).",
      category: "Partnership",
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: "Power Generation",
      content:
        "Eight solar arrays provide 84-120 kilowatts of power, enough to supply electricity to more than 40 average homes.",
      category: "Power Systems",
    },
  ]

  const timeline = [
    {
      year: "1998",
      event: "First Module Launch",
      description: "Zarya, the first ISS module, was launched by Russia",
      type: "milestone",
    },
    {
      year: "2000",
      event: "First Crew Arrival",
      description: "Expedition 1 crew arrived, beginning continuous human presence",
      type: "milestone",
    },
    {
      year: "2008",
      event: "Laboratory Completion",
      description: "Japanese Kibo laboratory module was added",
      type: "expansion",
    },
    {
      year: "2011",
      event: "Assembly Complete",
      description: "ISS assembly was officially completed",
      type: "milestone",
    },
    {
      year: "2020",
      event: "Commercial Crew",
      description: "First commercial crew mission (SpaceX Dragon) launched",
      type: "achievement",
    },
    {
      year: "2023",
      event: "25 Years in Orbit",
      description: "ISS celebrates 25 years since first module launch",
      type: "anniversary",
    },
  ]

  const experiments = [
    {
      name: "Protein Crystal Growth",
      description: "Growing larger, more perfect protein crystals in microgravity for drug development",
      field: "Medicine",
      impact: "Could lead to better treatments for diseases like cancer and Alzheimer's",
    },
    {
      name: "Plant Growth Studies",
      description: "Understanding how plants grow in space for future Mars missions",
      field: "Agriculture",
      impact: "Essential for long-duration space missions and sustainable food production",
    },
    {
      name: "Fluid Physics",
      description: "Studying how liquids behave without gravity's influence",
      field: "Physics",
      impact: "Improving industrial processes and manufacturing on Earth",
    },
    {
      name: "Human Physiology",
      description: "Monitoring how the human body adapts to long-term weightlessness",
      field: "Medicine",
      impact: "Developing countermeasures for astronaut health and Earth-based treatments",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "expansion":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "achievement":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "anniversary":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Daily Space Fact */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Did You Know? - Daily Space Fact
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Today</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">{dailyFact.title}</h3>
            <p className="text-gray-300 leading-relaxed">{dailyFact.content}</p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{dailyFact.category}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Educational Tabs */}
      <Tabs defaultValue="facts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/30 dark:bg-black/50">
          <TabsTrigger value="facts">ISS Facts</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* ISS Facts */}
        <TabsContent value="facts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facts.map((fact, index) => (
              <Card
                key={index}
                className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700 hover:bg-white/15 dark:hover:bg-gray-900/90 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {fact.icon}
                      <h3 className="font-semibold text-white">{fact.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{fact.content}</p>
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">{fact.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline">
          <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-green-400" />
                ISS History Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                      {index < timeline.length - 1 && <div className="w-0.5 h-16 bg-gray-600 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-blue-400">{item.year}</span>
                        <Badge className={getTypeColor(item.type)}>{item.type.toUpperCase()}</Badge>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{item.event}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Science & Research */}
        <TabsContent value="science">
          <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-purple-400" />
                Scientific Research & Experiments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiments.map((experiment, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{experiment.name}</h3>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                            {experiment.field}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm">{experiment.description}</p>
                        <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                          <p className="text-xs text-green-400 font-medium">Impact:</p>
                          <p className="text-xs text-gray-300">{experiment.impact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Educational Resources */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://www.nasa.gov/audience/forstudents/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  NASA Student Resources
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://www.esa.int/Education", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ESA Educational Materials
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://www.spacex.com/human-spaceflight/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  SpaceX Human Spaceflight
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Rocket className="h-5 w-5 text-orange-400" />
                  Interactive Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://www.nasa.gov/mission_pages/station/main/index.html", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Virtual ISS Tour
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://spotthestation.nasa.gov/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Spot the Station
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => window.open("https://www.nasa.gov/multimedia/imagegallery/iss_gallery.html", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ISS Image Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
