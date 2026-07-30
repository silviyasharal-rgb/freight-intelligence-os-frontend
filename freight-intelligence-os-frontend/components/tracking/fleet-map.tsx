"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import type { Vehicle } from "@/lib/mock-data"

const statusHex: Record<Vehicle["status"], string> = {
  "on-trip": "#10b981",
  idle: "#f59e0b",
  loading: "#0ea5e9",
  maintenance: "#ef4444",
}

function FlyTo({ vehicle }: { vehicle: Vehicle | null }) {
  const map = useMap()
  if (vehicle) {
    map.flyTo([vehicle.lat, vehicle.lng], 6, { duration: 0.8 })
  }
  return null
}

export default function FleetMap({
  vehicles,
  selected,
  onSelect,
}: {
  vehicles: Vehicle[]
  selected: Vehicle | null
  onSelect: (v: Vehicle) => void
}) {
  return (
    <MapContainer
      center={[22.5, 78.9]}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "#0b1220" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FlyTo vehicle={selected} />
      {vehicles.map((v) => {
        const isSel = selected?.id === v.id
        return (
          <CircleMarker
            key={v.id}
            center={[v.lat, v.lng]}
            radius={isSel ? 11 : 7}
            pathOptions={{
              color: statusHex[v.status],
              fillColor: statusHex[v.status],
              fillOpacity: isSel ? 0.9 : 0.65,
              weight: isSel ? 3 : 2,
            }}
            eventHandlers={{ click: () => onSelect(v) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <div className="text-xs">
                <div className="font-semibold">{v.regNo}</div>
                <div>{v.location}</div>
                <div>
                  {v.speed} km/h · Fuel {v.fuel}%
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
