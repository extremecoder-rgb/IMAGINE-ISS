"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Thermometer, Gauge, Droplets, Wind, RotateCcw, Activity, AlertTriangle } from "lucide-react"
import { useISS } from "../context/iss-context"

export function TelemetryPanel() {
  const { telemetryData } = useISS()

  if (!telemetryData) {
    return (
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-300 mt-2">Loading telemetry data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (value: number, min: number, max: number, optimal?: number) => {
    if (optimal && Math.abs(value - optimal) < (max - min) * 0.1) return "text-green-400"
    if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) return "text-red-400"
    return "text-yellow-400"
  }

  const getProgressColor = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100
    if (percentage < 20 || percentage > 80) return "bg-red-500"
    if (percentage < 40 || percentage > 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      {/* Attitude Control */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <RotateCcw className="h-5 w-5 text-blue-400" />
            Attitude & Orientation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Yaw</span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.yaw, -180, 180, 0)}`}>
                  {telemetryData.yaw.toFixed(1)}°
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${((telemetryData.yaw + 180) / 360) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Pitch</span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.pitch, -90, 90, 0)}`}>
                  {telemetryData.pitch.toFixed(1)}°
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${((telemetryData.pitch + 90) / 180) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Roll</span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.roll, -90, 90, 0)}`}>
                  {telemetryData.roll.toFixed(1)}°
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${((telemetryData.roll + 90) / 180) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Orbital Period</span>
            </div>
            <p className="text-lg font-mono text-white">{telemetryData.orbitalPeriod.toFixed(2)} minutes</p>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Systems */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wind className="h-5 w-5 text-green-400" />
            Environmental Control & Life Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Atmosphere */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Atmospheric Composition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Oxygen (O₂)</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold ${getStatusColor(telemetryData.oxygenLevel, 19, 23, 20.9)}`}>
                      {telemetryData.oxygenLevel.toFixed(1)}%
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">NORMAL</Badge>
                  </div>
                </div>
                <Progress value={(telemetryData.oxygenLevel / 25) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Carbon Dioxide (CO₂)</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold ${getStatusColor(telemetryData.co2Level, 0, 0.1, 0.04)}`}>
                      {(telemetryData.co2Level * 100).toFixed(2)}%
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">NORMAL</Badge>
                  </div>
                </div>
                <Progress value={(telemetryData.co2Level / 0.1) * 100} className="h-2" />
              </div>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Pressure & Temperature */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Environmental Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    Cabin Pressure
                  </span>
                  <span className={`font-mono font-bold ${getStatusColor(telemetryData.cabinPressure, 14, 16, 14.7)}`}>
                    {telemetryData.cabinPressure.toFixed(1)} psi
                  </span>
                </div>
                <Progress value={((telemetryData.cabinPressure - 10) / 10) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    Temperature
                  </span>
                  <span className={`font-mono font-bold ${getStatusColor(telemetryData.temperature, 18, 28, 22)}`}>
                    {telemetryData.temperature.toFixed(1)}°C
                  </span>
                </div>
                <Progress value={((telemetryData.temperature - 15) / 20) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power & Systems */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="h-5 w-5 text-yellow-400" />
            Power & Support Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Power Level
                </span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.powerLevel, 70, 100, 90)}`}>
                  {telemetryData.powerLevel.toFixed(0)}%
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={telemetryData.powerLevel} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  Cooling System
                </span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.coolingSystem, 80, 100, 95)}`}>
                  {telemetryData.coolingSystem.toFixed(0)}%
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={telemetryData.coolingSystem} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  Water Supply
                </span>
                <span className={`font-mono font-bold ${getStatusColor(telemetryData.waterLevel, 50, 100, 80)}`}>
                  {telemetryData.waterLevel.toFixed(0)}%
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={telemetryData.waterLevel} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-400">All Systems Nominal</span>
            </div>
            <p className="text-sm text-gray-300">
              All critical life support and power systems are operating within normal parameters.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-white/20 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            System Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium text-blue-400">INFO</span>
                <span className="text-xs text-gray-400">2 minutes ago</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">Routine telemetry data collection completed successfully</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-green-400">SUCCESS</span>
                <span className="text-xs text-gray-400">15 minutes ago</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">Solar array positioning adjustment completed</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-400">MAINTENANCE</span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">Scheduled maintenance window for communication systems</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
