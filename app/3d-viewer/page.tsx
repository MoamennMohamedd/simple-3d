"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei"
import { useState, useRef, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Filter, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import * as THREE from "three"

const apartments = [
  {
    id: 1,
    section: "North Wing",
    unit: "Section A",
    status: "available",
    type: "2 Bedroom Apartments",
    price: 2800,
    size: 75,
    bedrooms: 2,
    bathrooms: 2,
    position: [-3, 1, 2],
    sectionSize: [4, 5, 3],
    outlineColor: "#3b82f6", // Blue
    image: "/modern-luxury-apartment-interior-with-floor-to-cei.png",
    description: "Modern apartments in the north wing with excellent natural light and city views.",
    amenities: ["Air Conditioning", "Hardwood Floors", "In-unit Laundry", "Balcony", "City Views"],
    availableUnits: 3,
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@flatshow.com",
    },
  },
  {
    id: 2,
    section: "South Wing",
    unit: "Section B",
    status: "available",
    type: "1 Bedroom Apartments",
    price: 2200,
    size: 60,
    bedrooms: 1,
    bathrooms: 1,
    position: [3, 1, 2],
    sectionSize: [4, 5, 3],
    outlineColor: "#8b5cf6", // Purple
    image: "/luxury-master-bedroom-with-walk-in-closet.png",
    description: "Cozy one-bedroom apartments in the south wing with updated kitchens.",
    amenities: ["Air Conditioning", "Hardwood Floors", "In-unit Laundry", "Updated Kitchen"],
    availableUnits: 2,
    agent: {
      name: "Michael Chen",
      phone: "+1 (555) 234-5678",
      email: "michael@flatshow.com",
    },
  },
  {
    id: 3,
    section: "East Wing",
    unit: "Section C",
    status: "rented",
    type: "Studio Apartments",
    price: 1800,
    size: 45,
    bedrooms: 0,
    bathrooms: 1,
    position: [-3, 1, -2],
    sectionSize: [4, 5, 3],
    outlineColor: "#10b981", // Green
    image: "/spacious-living-room.png",
    description: "Efficient studio apartments in the east wing with high ceilings.",
    amenities: ["Air Conditioning", "Hardwood Floors", "High Ceilings"],
    availableUnits: 0,
    agent: {
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily@flatshow.com",
    },
  },
  {
    id: 4,
    section: "West Wing",
    unit: "Section D",
    status: "pending",
    type: "Penthouse Apartments",
    price: 4200,
    size: 110,
    bedrooms: 3,
    bathrooms: 2,
    position: [3, 1, -2],
    sectionSize: [4, 5, 3],
    outlineColor: "#f59e0b", // Orange
    image: "/modern-kitchen-with-marble-countertops-and-stainle.png",
    description: "Luxury penthouse apartments in the west wing with panoramic views.",
    amenities: ["Private Terrace", "Premium Appliances", "Panoramic Views"],
    availableUnits: 1,
    agent: {
      name: "David Kim",
      phone: "+1 (555) 456-7890",
      email: "david@flatshow.com",
    },
  },
]

function CommercialBuilding({ apartments, onApartmentHover, hoveredApartment, filters }: any) {
  const { scene, error } = useGLTF("/commercial-office-building.glb")

  return (
    <group>
      {scene ? (
        <primitive object={scene} scale={[2, 2, 2]} position={[0, 0, 0]} />
      ) : (
        <group>
          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[10, 5, 6]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
          <mesh position={[-2, 3, 3.1]}>
            <boxGeometry args={[1.5, 1, 0.1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[2, 3, 3.1]}>
            <boxGeometry args={[1.5, 1, 0.1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[-2, 1.5, 3.1]}>
            <boxGeometry args={[1.5, 1, 0.1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[2, 1.5, 3.1]}>
            <boxGeometry args={[1.5, 1, 0.1]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>
      )}

      {apartments.map((apartment: any) => (
        <ApartmentSection
          key={apartment.id}
          apartment={apartment}
          onHover={onApartmentHover}
          isHovered={hoveredApartment?.id === apartment.id}
          filters={filters}
        />
      ))}

      <Html position={[0, 6, 0]} center>
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-lg">AMANI RESIDENTIAL</div>
      </Html>
    </group>
  )
}

function ApartmentSection({ apartment, onHover, isHovered, filters }: any) {
  const meshRef = useRef<any>()

  const matchesFilters =
    (!filters.type || apartment.type.includes(filters.type)) &&
    (!filters.status || apartment.status === filters.status) &&
    apartment.price >= filters.priceRange[0] &&
    apartment.price <= filters.priceRange[1]

  if (!matchesFilters) return null

  const handlePointerOver = () => {
    onHover(apartment)
  }

  const handlePointerOut = () => {
    onHover(null)
  }

  const createWireframeGeometry = () => {
    const geometry = new THREE.BoxGeometry(...apartment.sectionSize)
    const edges = new THREE.EdgesGeometry(geometry)
    return edges
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        position={apartment.position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={apartment.sectionSize} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      <lineSegments position={apartment.position}>
        <edgesGeometry args={[new THREE.BoxGeometry(...apartment.sectionSize)]} />
        <lineBasicMaterial
          color={apartment.outlineColor}
          linewidth={isHovered ? 8 : 4}
          transparent
          opacity={isHovered ? 1 : 0.7}
        />
      </lineSegments>

      {isHovered && (
        <lineSegments position={apartment.position} scale={1.05}>
          <edgesGeometry args={[new THREE.BoxGeometry(...apartment.sectionSize)]} />
          <lineBasicMaterial color={apartment.outlineColor} linewidth={6} transparent opacity={0.5} />
        </lineSegments>
      )}
    </group>
  )
}

function LoadingScreen() {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-white font-medium">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

export default function ThreeDViewer() {
  const [hoveredApartment, setHoveredApartment] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    priceRange: [0, 5000],
  })

  const handleApartmentHover = (apartment: any) => {
    setHoveredApartment(apartment)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "rented":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApartments = apartments.filter(
    (apartment) =>
      (filters.type === "all" || apartment.type.includes(filters.type)) &&
      (filters.status === "all" || apartment.status === filters.status) &&
      apartment.price >= filters.priceRange[0] &&
      apartment.price <= filters.priceRange[1],
  )

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50" : "h-screen"} bg-slate-900`}>
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-emerald-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl">FlatShow</span>
            </Link>
            <Badge variant="secondary" className="bg-emerald-600 text-white">
              AMANI RESIDENTIAL - 3D VIEWER
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-black/40 backdrop-blur-sm p-4 border-t border-white/20">
            <div className="flex flex-wrap gap-4">
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Apartment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                  <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-white text-sm">
                {filteredApartments.length} of {apartments.length} sections shown
              </div>
            </div>
          </div>
        )}
      </div>

      <Canvas camera={{ position: [20, 15, 20], fov: 60 }}>
        <Suspense fallback={<LoadingScreen />}>
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, 10, -5]} intensity={0.8} />

          <CommercialBuilding
            apartments={apartments}
            onApartmentHover={handleApartmentHover}
            hoveredApartment={hoveredApartment}
            filters={filters}
          />

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={15} maxDistance={60} />
        </Suspense>
      </Canvas>

      {hoveredApartment && (
        <div className="absolute bottom-20 right-4 bg-slate-800/95 backdrop-blur-sm border border-purple-500/50 shadow-2xl rounded-lg p-4 max-w-sm z-20 pointer-events-none">
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2">{hoveredApartment.section}</h3>
            <Badge className={getStatusBadgeColor(hoveredApartment.status)} variant="secondary">
              {hoveredApartment.status}
            </Badge>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Type:</span>
                <span>{hoveredApartment.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Price:</span>
                <span className="font-bold text-emerald-400">${hoveredApartment.price.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Size:</span>
                <span>{hoveredApartment.size} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Available:</span>
                <span>{hoveredApartment.availableUnits} units</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-600">
              <p className="text-xs text-gray-300">{hoveredApartment.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white p-3 rounded-lg text-sm max-w-sm">
        <p className="mb-2">
          🖱️ <strong>Click and drag</strong> to rotate the building
        </p>
        <p className="mb-2">
          🔍 <strong>Scroll</strong> to zoom in/out
        </p>
        <p>
          🏠 <strong>Hover over sections</strong> to view apartment details
        </p>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white p-3 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">Sections</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-xs">Rented</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-xs">Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}

useGLTF.preload("/commercial-office-building.glb")
