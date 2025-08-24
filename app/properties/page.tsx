"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Bed, Bath, Square, Heart, Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"

const properties = [
  {
    id: 1,
    name: "GAWDA",
    location: "Downtown District",
    price: 2850000,
    beds: 3,
    baths: 2,
    sqft: 2400,
    image: "/modern-luxury-apartment-interior-with-floor-to-cei.png",
    status: "Featured",
    type: "Luxury Apartment",
    yearBuilt: 2023,
    parking: 2,
  },
  {
    id: 2,
    name: "SERENITY HEIGHTS",
    location: "Uptown Plaza",
    price: 1950000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "/modern-kitchen-with-marble-countertops-and-stainle.png",
    status: "New",
    type: "Penthouse",
    yearBuilt: 2024,
    parking: 1,
  },
  {
    id: 3,
    name: "VISTA GARDENS",
    location: "Garden District",
    price: 3200000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "/spacious-living-room.png",
    status: "Premium",
    type: "Villa",
    yearBuilt: 2022,
    parking: 3,
  },
  {
    id: 4,
    name: "URBAN LOFT",
    location: "Arts Quarter",
    price: 1450000,
    beds: 2,
    baths: 1,
    sqft: 1400,
    image: "/luxury-master-bedroom-with-walk-in-closet.png",
    status: "Available",
    type: "Loft",
    yearBuilt: 2021,
    parking: 1,
  },
  {
    id: 5,
    name: "SKYLINE TOWER",
    location: "Financial District",
    price: 4100000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "/modern-luxury-apartment-interior-with-floor-to-cei.png",
    status: "Exclusive",
    type: "High-rise",
    yearBuilt: 2023,
    parking: 2,
  },
  {
    id: 6,
    name: "COASTAL RETREAT",
    location: "Waterfront",
    price: 5500000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: "/spacious-living-room.png",
    status: "Luxury",
    type: "Waterfront",
    yearBuilt: 2024,
    parking: 4,
  },
]

const propertyTypes = ["All Types", "Luxury Apartment", "Penthouse", "Villa", "Loft", "High-rise", "Waterfront"]
const locations = [
  "All Locations",
  "Downtown District",
  "Uptown Plaza",
  "Garden District",
  "Arts Quarter",
  "Financial District",
  "Waterfront",
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 6000000])
  const [bedrooms, setBedrooms] = useState("any")
  const [bathrooms, setBathrooms] = useState("any")
  const [sortBy, setSortBy] = useState("newest")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Search term filter
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const matchesType = selectedType === "All Types" || property.type === selectedType

      // Location filter
      const matchesLocation = selectedLocation === "All Locations" || property.location === selectedLocation

      // Price range filter
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

      // Bedroom filter
      const matchesBedrooms = bedrooms === "any" || property.beds >= Number.parseInt(bedrooms)

      // Bathroom filter
      const matchesBathrooms = bathrooms === "any" || property.baths >= Number.parseInt(bathrooms)

      return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesBedrooms && matchesBathrooms
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "size":
          return b.sqft - a.sqft
        case "newest":
        default:
          return b.yearBuilt - a.yearBuilt
      }
    })

    return filtered
  }, [searchTerm, selectedType, selectedLocation, priceRange, bedrooms, bathrooms, sortBy])

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedType("All Types")
    setSelectedLocation("All Locations")
    setPriceRange([0, 6000000])
    setBedrooms("any")
    setBathrooms("any")
    setSelectedAmenities([])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FlatShow</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/properties" className="text-primary font-medium">
                Properties
              </Link>
              <Link href="/3d-viewer" className="text-foreground hover:text-primary transition-colors">
                3D Viewer
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a href="tel:+15551234567">Contact Agent</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">Premium Properties</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of luxury properties in prime locations
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <Card className="p-6 shadow-lg">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <SlidersHorizontal className="w-4 h-4" />
                    More Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Price Range</label>
                      <div className="px-3">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={6000000}
                          min={0}
                          step={50000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bedrooms and Bathrooms */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-3 block">Minimum Bedrooms</label>
                        <Select value={bedrooms} onValueChange={setBedrooms}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-3 block">Minimum Bathrooms</label>
                        <Select value={bathrooms} onValueChange={setBathrooms}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Amenities</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {["Parking", "Gym", "Pool", "Concierge", "Pet Friendly", "Balcony"].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAmenities([...selectedAmenities, amenity])
                                } else {
                                  setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                                }
                              }}
                            />
                            <label htmlFor={amenity} className="text-sm">
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={clearAllFilters}>
                        Clear All
                      </Button>
                      <Button onClick={() => setShowAdvancedFilters(false)}>Apply Filters</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {(searchTerm ||
              selectedType !== "All Types" ||
              selectedLocation !== "All Locations" ||
              priceRange[0] > 0 ||
              priceRange[1] < 6000000 ||
              bedrooms !== "any" ||
              bathrooms !== "any" ||
              selectedAmenities.length > 0) && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {selectedType !== "All Types" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Type: {selectedType}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType("All Types")} />
                  </Badge>
                )}
                {selectedLocation !== "All Locations" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {selectedLocation}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation("All Locations")} />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 6000000) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, 6000000])} />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
                  Clear All
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedProperties.length} of {properties.length} properties
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="size">Size: Largest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProperties.map((property) => (
                <Card
                  key={property.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/properties/${property.id}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={property.status === "Featured" ? "default" : "secondary"}
                          className={property.status === "Featured" ? "bg-primary" : ""}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-4 right-4 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-2xl font-bold">{formatPrice(property.price)}</p>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-1 font-serif">{property.name}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Square className="w-4 h-4" />
                            <span>{property.sqft.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {property.type}
                        </Badge>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredAndSortedProperties.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">FlatShow</span>
          </div>
          <p className="text-muted-foreground">© 2024 FlatShow Property. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
