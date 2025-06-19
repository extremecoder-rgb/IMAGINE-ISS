"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Calendar, Globe, ExternalLink, Rocket, Clock } from "lucide-react"
import { useISS } from "../context/iss-context"

export function CrewInfo() {
  const { crewData } = useISS()

  const calculateDaysInSpace = (launchDate: string) => {
    const launch = new Date(launchDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - launch.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  const getCountryFlag = (nationality: string) => {
    const flags: { [key: string]: string } = {
      USA: "🇺🇸",
      Russia: "🇷🇺",
      Japan: "🇯🇵",
      Denmark: "🇩🇰",
      Germany: "🇩🇪",
      Italy: "🇮🇹",
      France: "🇫🇷",
      Canada: "🇨🇦",
    }
    return flags[nationality] || "🌍"
  }

  return (
    <div className="space-y-6">
      {/* Current Expedition */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-blue-400" />
            Current Expedition 70 Crew
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{crewData.length} Members</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crewData.map((member, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{member.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <span>{getCountryFlag(member.nationality)}</span>
                          <span>{member.nationality}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Mission</span>
                        <p className="text-sm text-blue-400 font-medium">{member.mission}</p>
                      </div>

                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Launch Date</span>
                        <p className="text-sm text-white">{new Date(member.launchDate).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Days in Space</span>
                        <p className="text-sm text-green-400 font-bold">
                          {calculateDaysInSpace(member.launchDate)} days
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-gray-600" />

                    <div>
                      <p className="text-xs text-gray-300 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Timeline */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-green-400" />
            Mission Timeline & Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-600"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-green-400">Current</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">ACTIVE</Badge>
                </div>
                <h3 className="font-semibold text-white">Expedition 70</h3>
                <p className="text-sm text-gray-300">Ongoing scientific research and station maintenance operations</p>
                <p className="text-xs text-gray-400 mt-1">Started: September 2023</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-600"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-400">Recent</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">COMPLETED</Badge>
                </div>
                <h3 className="font-semibold text-white">Crew Dragon Arrival</h3>
                <p className="text-sm text-gray-300">SpaceX Crew-7 mission successfully docked with the ISS</p>
                <p className="text-xs text-gray-400 mt-1">August 27, 2023</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-600"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-purple-400">Upcoming</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">PLANNED</Badge>
                </div>
                <h3 className="font-semibold text-white">Spacewalk EVA</h3>
                <p className="text-sm text-gray-300">Scheduled extravehicular activity for station maintenance</p>
                <p className="text-xs text-gray-400 mt-1">TBD - Early 2024</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-orange-400">Future</span>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">PLANNING</Badge>
                </div>
                <h3 className="font-semibold text-white">Expedition 71</h3>
                <p className="text-sm text-gray-300">Next expedition crew rotation and handover</p>
                <p className="text-xs text-gray-400 mt-1">Spring 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research & Experiments */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Rocket className="h-5 w-5 text-orange-400" />
            Current Research & Experiments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">Microgravity Research</h3>
                <p className="text-sm text-gray-300">
                  Studying protein crystal growth and fluid physics in zero gravity conditions
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">ACTIVE</Badge>
                  <span className="text-xs text-gray-400">NASA/ESA</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">Plant Growth Studies</h3>
                <p className="text-sm text-gray-300">Advanced Plant Habitat experiments for future Mars missions</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">ONGOING</Badge>
                  <span className="text-xs text-gray-400">NASA</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2">Medical Research</h3>
                <p className="text-sm text-gray-300">
                  Studying effects of long-duration spaceflight on human physiology
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">CONTINUOUS</Badge>
                  <span className="text-xs text-gray-400">International</span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-orange-400 mb-2">Technology Demo</h3>
                <p className="text-sm text-gray-300">Testing new technologies for future space exploration missions</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">TESTING</Badge>
                  <span className="text-xs text-gray-400">Commercial</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ExternalLink className="h-5 w-5 text-cyan-400" />
            Learn More
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="ghost"
              className="justify-start h-auto p-4 text-left hover:bg-white/10"
              onClick={() => window.open("https://www.nasa.gov/mission_pages/station/main/index.html", "_blank")}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-white">NASA ISS Program</span>
                </div>
                <p className="text-sm text-gray-300">Official NASA International Space Station information</p>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-auto p-4 text-left hover:bg-white/10"
              onClick={() => window.open("https://blogs.nasa.gov/spacestation/", "_blank")}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="font-medium text-white">ISS Blog</span>
                </div>
                <p className="text-sm text-gray-300">Latest updates and news from the space station</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
