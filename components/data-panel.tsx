"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Satellite, Globe, Users, Calendar, Clock, Zap, Gauge } from "lucide-react"
import { useISS } from "@/context/iss-context"

export function DataPanel() {
  const { issData, crewData } = useISS()

  // Fixed calculation for days in orbit
  const calculateDaysInOrbit = () => {
    const launchDate = new Date("1998-11-20") // ISS first module launch
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - launchDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  if (!issData) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading ISS data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
            <Satellite className="h-6 w-6 text-white" />
          </div>
          ISS Status
          <Badge className="ml-auto bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-3 py-1 animate-pulse">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Position Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-blue-300 uppercase tracking-wide font-semibold">Latitude</span>
            </div>
            <p className="text-2xl font-bold text-blue-400 font-mono">{issData.latitude.toFixed(4)}°</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-blue-300 uppercase tracking-wide font-semibold">Longitude</span>
            </div>
            <p className="text-2xl font-bold text-blue-400 font-mono">{issData.longitude.toFixed(4)}°</p>
          </div>
        </div>

        {/* Altitude & Velocity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-300 uppercase tracking-wide font-semibold">Altitude</span>
            </div>
            <p className="text-2xl font-bold text-green-400 font-mono">
              {Math.round(issData.altitude).toLocaleString()} km
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-300 uppercase tracking-wide font-semibold">Velocity</span>
            </div>
            <p className="text-2xl font-bold text-green-400 font-mono">
              {Math.round(issData.velocity).toLocaleString()} km/h
            </p>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

        {/* Mission Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-purple-300 uppercase tracking-wide font-semibold">Crew Size</span>
            </div>
            <p className="text-2xl font-bold text-purple-400 font-mono">{crewData.length} people</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-purple-300 uppercase tracking-wide font-semibold">Days in Orbit</span>
            </div>
            <p className="text-2xl font-bold text-purple-400 font-mono">{calculateDaysInOrbit().toLocaleString()}</p>
          </div>
        </div>

        {/* Orbital Period */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-cyan-300 uppercase tracking-wide font-semibold">Orbital Period</span>
          </div>
          <p className="text-2xl font-bold text-cyan-400 font-mono">~92.68 minutes</p>
          <p className="text-xs text-cyan-300 mt-1">Complete orbit around Earth</p>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

        {/* Last Update */}
        <div className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-xl p-4 border border-gray-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wide font-semibold">Last Updated</span>
          </div>
          <p className="text-sm text-gray-300 font-mono">{formatTime(issData.timestamp)}</p>
        </div>

        {/* Solar Position */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-3 border border-orange-500/30">
            <span className="text-xs text-orange-300 uppercase tracking-wide font-semibold">Solar Lat</span>
            <p className="text-lg font-bold text-orange-400 font-mono">{issData.solar_lat.toFixed(2)}°</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-3 border border-orange-500/30">
            <span className="text-xs text-orange-300 uppercase tracking-wide font-semibold">Solar Lng</span>
            <p className="text-lg font-bold text-orange-400 font-mono">{issData.solar_lon.toFixed(2)}°</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
