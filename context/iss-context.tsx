"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ISSData {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
  daynum: number
  solar_lat: number
  solar_lon: number
  units: string
}

interface CrewMember {
  name: string
  nationality: string
  mission: string
  launchDate: string
  bio: string
  photo: string
}

interface APODData {
  url: string
  title: string
  explanation: string
  date: string
}

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

interface TelemetryData {
  yaw: number
  pitch: number
  roll: number
  orbitalPeriod: number
  oxygenLevel: number
  co2Level: number
  cabinPressure: number
  temperature: number
  powerLevel: number
  coolingSystem: number
  waterLevel: number
}

interface ISSContextType {
  issData: ISSData | null
  crewData: CrewMember[]
  apodData: APODData | null
  telemetryData: TelemetryData | null
  passes: PassData[]
  setPasses: (passes: PassData[]) => void
  fetchISSData: () => Promise<void>
  fetchCrewData: () => Promise<void>
  fetchAPOD: () => Promise<void>
  fetchTelemetry: () => Promise<void>
  isLoading: boolean
}

const ISSContext = createContext<ISSContextType | undefined>(undefined)

export function ISSProvider({ children }: { children: ReactNode }) {
  const [issData, setIssData] = useState<ISSData | null>(null)
  const [crewData, setCrewData] = useState<CrewMember[]>([])
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null)
  const [passes, setPasses] = useState<PassData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch ISS current position
  const fetchISSData = async () => {
    try {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
      const data = await response.json()
      setIssData(data)
    } catch (error) {
      console.error("Error fetching ISS data:", error)
    }
  }

  // Fetch crew data (simulated - in real app would use NASA API)
  const fetchCrewData = async () => {
    // Simulated crew data - in production, use NASA's crew API
    const mockCrewData: CrewMember[] = [
      {
        name: "Jasmin Moghbeli",
        nationality: "USA",
        mission: "Expedition 70",
        launchDate: "2023-08-26",
        bio: "NASA astronaut and helicopter pilot, first Iranian-American woman in space.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Andreas Mogensen",
        nationality: "Denmark",
        mission: "Expedition 70",
        launchDate: "2023-08-26",
        bio: "ESA astronaut and engineer, first Danish citizen in space.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Satoshi Furukawa",
        nationality: "Japan",
        mission: "Expedition 70",
        launchDate: "2023-08-26",
        bio: "JAXA astronaut and surgeon on his second spaceflight.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Konstantin Borisov",
        nationality: "Russia",
        mission: "Expedition 70",
        launchDate: "2023-09-15",
        bio: "Roscosmos cosmonaut on his first spaceflight.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Oleg Kononenko",
        nationality: "Russia",
        mission: "Expedition 70",
        launchDate: "2023-09-15",
        bio: "Veteran Roscosmos cosmonaut with multiple ISS expeditions.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Nikolai Chub",
        nationality: "Russia",
        mission: "Expedition 70",
        launchDate: "2023-09-15",
        bio: "Roscosmos cosmonaut on his first long-duration mission.",
        photo: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Loral O'Hara",
        nationality: "USA",
        mission: "Expedition 70",
        launchDate: "2023-09-15",
        bio: "NASA astronaut and biomedical engineer on her first spaceflight.",
        photo: "/placeholder.svg?height=100&width=100",
      },
    ]
    setCrewData(mockCrewData)
  }

  // Fetch NASA APOD
  const fetchAPOD = async () => {
    try {
      const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      const data = await response.json()
      if (data.media_type === "image") {
        setApodData(data)
      }
    } catch (error) {
      console.error("Error fetching APOD:", error)
    }
  }

  // Fetch telemetry data (simulated)
  const fetchTelemetry = async () => {
    // Simulated telemetry data - in production, use NASA's telemetry API
    const mockTelemetry: TelemetryData = {
      yaw: Math.random() * 360 - 180,
      pitch: Math.random() * 20 - 10,
      roll: Math.random() * 20 - 10,
      orbitalPeriod: 92.68, // minutes
      oxygenLevel: 20.9 + Math.random() * 0.2,
      co2Level: 0.04 + Math.random() * 0.01,
      cabinPressure: 14.7 + Math.random() * 0.5,
      temperature: 22 + Math.random() * 4,
      powerLevel: 85 + Math.random() * 10,
      coolingSystem: 95 + Math.random() * 5,
      waterLevel: 78 + Math.random() * 15,
    }
    setTelemetryData(mockTelemetry)
  }

  useEffect(() => {
    fetchISSData()
    fetchCrewData()
    fetchAPOD()
    fetchTelemetry()

    // Update ISS position every 5 seconds
    const issInterval = setInterval(fetchISSData, 5000)

    // Update telemetry every 10 seconds
    const telemetryInterval = setInterval(fetchTelemetry, 10000)

    return () => {
      clearInterval(issInterval)
      clearInterval(telemetryInterval)
    }
  }, [])

  const value = {
    issData,
    crewData,
    apodData,
    telemetryData,
    passes,
    setPasses,
    fetchISSData,
    fetchCrewData,
    fetchAPOD,
    fetchTelemetry,
    isLoading,
  }

  return <ISSContext.Provider value={value}>{children}</ISSContext.Provider>
}

export function useISS() {
  const context = useContext(ISSContext)
  if (context === undefined) {
    throw new Error("useISS must be used within an ISSProvider")
  }
  return context
}
