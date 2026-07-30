"use client"

import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { RouteStop } from "@/lib/mock-data"

const statusHex: Record<RouteStop["status"], string> = {
  done: "#10b981",
  current: "#f97316",
  upcoming: "#38bdf8",
}

export default function RouteMapInner({ stops }: { stops: RouteStop[] }) {
  const path = stops.map((s) => [s.lat, s.lng] as [number, number])
  const center: [number, number] = path.length
    ? [
        path.reduce((a, p) => a + p[0], 0) / path.length,
        path.reduce((a, p) => a + p[1], 0) / path.length,
      ]
    : [22.5, 78.9]

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#0b1220" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Polyline positions={path} pathOptions={{ color: "#f97316", weight: 3, dashArray: "8 8" }} />
      {stops.map((s, i) => {
        const isEnd = i === 0 || i === stops.length - 1
        return (
          <CircleMarker
            key={s.name}
            center={[s.lat, s.lng]}
            radius={isEnd ? 9 : 6}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: statusHex[s.status],
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <div className="text-xs">
                <div className="font-semibold">
                  {i + 1}. {s.city}
                </div>
                <div>ETA {s.eta}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
