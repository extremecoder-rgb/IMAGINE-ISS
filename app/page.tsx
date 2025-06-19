"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, Map, Video, Users, Zap, BookOpen } from "lucide-react"
import { useTheme } from "next-themes"
import { ISSProvider, useISS } from "@/context/iss-context"
import { EarthVisualization } from "@/components/earth-visualization"
import { InteractiveMap } from "@/components/interactive-map"
import { DataPanel } from "@/components/data-panel"
import { PassPredictions } from "@/components/pass-predictions"
import { LiveVideoFeed } from "@/components/live-video-feed"
import { TelemetryPanel } from "@/components/telemetry-panel"
import { CrewInfo } from "@/components/crew-info"
import { EducationalContent } from "@/components/educational-content"
import { CommunityFeatures } from "@/components/community-features"
import { ARCompass } from "@/components/ar-compass"
import { NotificationCenter } from "@/components/notification-center"

function ISSTrackerContent() {
  const [viewMode, setViewMode] = useState<"globe" | "map">("globe")
  const { theme, setTheme } = useTheme()
  const { issData, apodData } = useISS()

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background:
          theme === "dark"
            ? apodData?.url
              ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${apodData.url})`
              : "radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Enhanced animated stars for dark theme */}
      {theme === "dark" && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <div className="twinkling"></div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-transparent via-black/20 to-black/40 backdrop-blur-[1px]">
        <div className="container mx-auto p-4 lg:p-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h1 className="text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                ISS LIVE TRACKER
              </h1>
              <p className="text-xl text-gray-200 font-medium tracking-wide">
                Real-time International Space Station tracking and mission data
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm">LIVE DATA</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <NotificationCenter />
            </div>
          </div>

          {/* Enhanced Main Dashboard */}
          <Tabs defaultValue="tracking" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-2">
              <TabsTrigger
                value="tracking"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Tracking</span>
              </TabsTrigger>
              <TabsTrigger
                value="passes"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Passes</span>
              </TabsTrigger>
              <TabsTrigger
                value="live"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Live Feed</span>
              </TabsTrigger>
              <TabsTrigger
                value="crew"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Crew</span>
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Telemetry</span>
              </TabsTrigger>
              <TabsTrigger
                value="learn"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Learn</span>
              </TabsTrigger>
            </TabsList>

            {/* Tracking Tab */}
            <TabsContent value="tracking" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Visualization */}
                <div className="lg:col-span-3">
                  <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Live Position</h2>
                        <p className="text-gray-300">Real-time ISS location and trajectory</p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant={viewMode === "globe" ? "default" : "ghost"}
                          size="lg"
                          onClick={() => setViewMode("globe")}
                          className={`${
                            viewMode === "globe"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                              : "text-white hover:bg-white/10 border border-white/20"
                          } transition-all duration-300`}
                        >
                          <Globe className="h-5 w-5 mr-2" />
                          3D Earth
                        </Button>
                        <Button
                          variant={viewMode === "map" ? "default" : "ghost"}
                          size="lg"
                          onClick={() => setViewMode("map")}
                          className={`${
                            viewMode === "map"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                              : "text-white hover:bg-white/10 border border-white/20"
                          } transition-all duration-300`}
                        >
                          <Map className="h-5 w-5 mr-2" />
                          World Map
                        </Button>
                      </div>
                    </div>

                    <div className="h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-inner">
                      {viewMode === "globe" ? (
                        <EarthVisualization issData={issData} />
                      ) : (
                        <InteractiveMap issData={issData} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Data Panel */}
                <div className="space-y-6">
                  <DataPanel />
                  <ARCompass />
                </div>
              </div>
            </TabsContent>

            {/* Other tabs remain the same but with enhanced styling */}
            <TabsContent value="passes">
              <PassPredictions />
            </TabsContent>

            <TabsContent value="live">
              <LiveVideoFeed />
            </TabsContent>

            <TabsContent value="crew">
              <CrewInfo />
            </TabsContent>

            <TabsContent value="data">
              <TelemetryPanel />
            </TabsContent>

            <TabsContent value="learn">
              <EducationalContent />
            </TabsContent>
          </Tabs>

          {/* Community Features */}
          <CommunityFeatures />
        </div>
      </div>

      {/* Enhanced CSS for animated stars and effects */}
      <style jsx>{`
        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 1776px 1684px #fff, 1350px 1100px #fff, 944px 979px #fff, 1903px 1207px #fff, 1851px 1064px #fff, 347px 1305px #fff, 1963px 1895px #fff, 1993px 1108px #fff, 1925px 1963px #fff, 1824px 1932px #fff, 721px 1316px #fff, 1676px 1187px #fff, 1350px 1100px #fff, 944px 979px #fff, 1903px 1207px #fff, 1851px 1064px #fff, 347px 1305px #fff, 1963px 1895px #fff, 1993px 1108px #fff, 1925px 1963px #fff;
          animation: animStar 50s linear infinite;
        }
        
        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 721px 1316px #fff, 1676px 1187px #fff, 1350px 1100px #fff, 944px 979px #fff, 1903px 1207px #fff, 1851px 1064px #fff, 347px 1305px #fff, 1963px 1895px #fff, 1993px 1108px #fff, 1925px 1963px #fff, 1776px 1684px #fff, 1350px 1100px #fff, 944px 979px #fff, 1903px 1207px #fff, 1851px 1064px #fff;
          animation: animStar 100s linear infinite;
        }
        
        .stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 1776px 1684px #fff, 1350px 1100px #fff, 944px 979px #fff, 1903px 1207px #fff, 1851px 1064px #fff, 347px 1305px #fff, 1963px 1895px #fff, 1993px 1108px #fff, 1925px 1963px #fff, 1824px 1932px #fff, 721px 1316px #fff, 1676px 1187px #fff;
          animation: animStar 150s linear infinite;
        }

        .twinkling {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 1000px 800px #4fc3f7, 1200px 600px #29b6f6, 800px 1000px #03a9f4, 1400px 400px #0288d1, 600px 1200px #0277bd, 1600px 200px #01579b;
          animation: twinkling 2s ease-in-out infinite alternate;
        }
        
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }

        @keyframes twinkling {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function ISSTracker() {
  return (
    <ISSProvider>
      <ISSTrackerContent />
    </ISSProvider>
  )
}
