# ISS Live Tracker

A modern, interactive web application for real-time tracking and exploration of the International Space Station (ISS). This project provides live ISS position, telemetry, crew information, educational content, and a community feed, all in a beautiful, responsive UI.

---

## 🚀 Overview

**ISS Live Tracker** lets you:
- View the ISS's real-time position on a 3D globe or 2D map
- Watch live HD video feeds from the ISS
- Explore telemetry and environmental data
- Learn about the current crew and their missions
- Discover educational facts, history, and science experiments
- Share and view ISS sightings with a global community

---

## ✨ Features

- **Live Tracking:**
  - 3D Earth visualization (WebGL, Three.js via @react-three/fiber)
  - 2D interactive map with orbit path and future trajectory
- **Pass Predictions:**
  - See upcoming ISS passes over your location
- **Live Video Feed:**
  - Multiple HD streams (Earth view, NASA TV, ISS tracker)
- **Telemetry Panel:**
  - Real-time attitude, environmental, and power system data
- **Crew Info:**
  - Profiles, mission timeline, and research highlights
- **Educational Content:**
  - ISS facts, timeline, science experiments, and resources
- **Community Features:**
  - Share sightings, see global viewers, and join the conversation
- **Dark/Light Theme:**
  - Adaptive, visually appealing design

---

## 🌐 Data Sources & APIs
- [Where the ISS at?](https://wheretheiss.at/) — Real-time ISS position
- [NASA APOD](https://api.nasa.gov/) — Astronomy Picture of the Day (backgrounds)
- Simulated/mock data for crew, telemetry, and pass predictions (can be extended to real APIs)
- Live video feeds via YouTube embeds

---

## 🖥️ Main Components
- `EarthVisualization` — 3D globe with ISS orbit (Three.js)
- `InteractiveMap` — 2D map with live ISS path
- `TelemetryPanel` — Live environmental and system data
- `CrewInfo` — Current crew, mission timeline, and research
- `LiveVideoFeed` — Switchable HD video streams
- `PassPredictions` — Next visible passes for your location
- `EducationalContent` — Facts, timeline, and science
- `CommunityFeatures` — Share/view ISS sightings globally

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15, React 19
- **UI:** Tailwind CSS, Radix UI, custom components
- **3D/Visualization:** Three.js, @react-three/fiber, @react-three/drei
- **Charts:** recharts
- **State/Context:** React Context API
- **Other:** Zod, React Hook Form, Lucide Icons, Sonner, Expo (for AR/compass)

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ReImagine-ISS-main
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage
- Use the top tabs to switch between Tracking, Passes, Live Feed, Crew, Telemetry, and Learn sections.
- Toggle between 3D globe and 2D map in the Tracking tab.
- Watch live video feeds and switch between different sources.
- Explore crew profiles, mission timeline, and current research.
- Share your ISS sightings and see global community activity.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the code style and add tests where appropriate.

---

## 📄 License

This project is for educational and demonstration purposes. See [LICENSE](LICENSE) if provided.

---

## 🙏 Credits
- NASA, ESA, JAXA, Roscosmos, CSA for ISS data and inspiration
- [Where the ISS at?](https://wheretheiss.at/), [NASA APIs](https://api.nasa.gov/)
- [v0.dev](https://v0.dev/) for UI inspiration

---

> Made with ❤️ for space enthusiasts and learners everywhere. 