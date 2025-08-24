import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { QuickContactButtons, ContactForm } from "@/components/contact-form"
import { MapPin, Bed, Bath, Square, Heart, Share2, Car, Wifi, Dumbbell, Shield, Play, Camera, Eye } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const properties = [
  {
    id: "1",
    name: "AMANI",
    location: "Downtown District",
    fullAddress: "123 Premium Avenue, Downtown District, City 12345",
    price: "$2,850,000",
    beds: 3,
    baths: 2,
    sqft: 2400,
    parking: 2,
    yearBuilt: 2023,
    status: "Featured",
    type: "Luxury Apartment",
    description:
      "Experience unparalleled luxury in this stunning modern apartment featuring floor-to-ceiling windows, premium finishes, and breathtaking city views. This meticulously designed space offers the perfect blend of contemporary elegance and functional living.",
    features: [
      "Floor-to-ceiling windows",
      "Premium hardwood floors",
      "Gourmet kitchen with marble countertops",
      "Master suite with walk-in closet",
      "Private balcony with city views",
      "In-unit laundry",
      "Smart home technology",
      "Concierge service",
    ],
    amenities: [
      "24/7 Security",
      "Fitness Center",
      "Rooftop Pool",
      "Business Center",
      "Valet Parking",
      "Pet Spa",
      "Wine Storage",
      "Guest Suites",
    ],
    images: [
      "/modern-luxury-apartment-interior-with-floor-to-cei.png",
      "/modern-kitchen-with-marble-countertops-and-stainle.png",
      "/spacious-living-room.png",
      "/luxury-master-bedroom-with-walk-in-closet.png",
    ],
    virtualTour: "https://example.com/virtual-tour",
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@flatshow.com",
      image: "/professional-woman-realtor.png",
    },
  },
]

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
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
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Tours
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a href={`tel:${property.agent.phone}`}>Contact Agent</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary">
              Properties
            </Link>
            <span>/</span>
            <span className="text-foreground">{property.name}</span>
          </div>
        </div>
      </section>

      {/* Property Header */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif">{property.name}</h1>
                <Badge
                  variant={property.status === "Featured" ? "default" : "secondary"}
                  className={property.status === "Featured" ? "bg-primary" : ""}
                >
                  {property.status}
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.fullAddress}</span>
              </div>
              <div className="text-3xl font-bold text-primary">{property.price}</div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-4 h-[500px]">
            <div className="lg:col-span-2 relative rounded-xl overflow-hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={`${property.name} - Main View`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Play className="w-4 h-4 mr-2" />
                        Virtual Tour
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-video">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={`${property.name} - Main View`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="relative rounded-xl overflow-hidden cursor-pointer group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${property.name} - View ${index + 2}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {index === 3 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <span className="text-lg font-semibold">View All Photos</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="aspect-video">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${property.name} - View ${index + 2}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Property Overview</h3>
                      <p className="text-muted-foreground mb-6">{property.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Property Type</span>
                            <span className="font-medium">{property.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Bedrooms</span>
                            <span className="font-medium">{property.beds}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Bathrooms</span>
                            <span className="font-medium">{property.baths}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Square Feet</span>
                            <span className="font-medium">{property.sqft.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Parking</span>
                            <span className="font-medium">{property.parking} spaces</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Year Built</span>
                            <span className="font-medium">{property.yearBuilt}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Building Amenities</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              {amenity.includes("Security") && <Shield className="w-4 h-4 text-primary" />}
                              {amenity.includes("Fitness") && <Dumbbell className="w-4 h-4 text-primary" />}
                              {amenity.includes("Parking") && <Car className="w-4 h-4 text-primary" />}
                              {amenity.includes("Business") && <Wifi className="w-4 h-4 text-primary" />}
                              {!amenity.includes("Security") &&
                                !amenity.includes("Fitness") &&
                                !amenity.includes("Parking") &&
                                !amenity.includes("Business") && <div className="w-2 h-2 bg-primary rounded-full" />}
                            </div>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Location & Neighborhood</h3>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="w-12 h-12 mx-auto mb-2" />
                          <p>Interactive Map</p>
                          <p className="text-sm">{property.fullAddress}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Located in the heart of Downtown District, this property offers unparalleled access to the
                        city's best dining, shopping, and entertainment venues. With excellent public transportation
                        links and major highways nearby, commuting is effortless.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Bed className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{property.beds}</div>
                      <div className="text-xs text-muted-foreground">Bedrooms</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Bath className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{property.baths}</div>
                      <div className="text-xs text-muted-foreground">Bathrooms</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Square className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{property.sqft.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Sq Ft</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <Car className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <div className="font-semibold">{property.parking}</div>
                      <div className="text-xs text-muted-foreground">Parking</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Agent */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={property.agent.image || "/placeholder.svg"}
                      alt={property.agent.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{property.agent.name}</div>
                      <div className="text-sm text-muted-foreground">Licensed Agent</div>
                    </div>
                  </div>
                  <QuickContactButtons agentPhone={property.agent.phone} agentEmail={property.agent.email} />
                </CardContent>
              </Card>

              {/* Property Inquiry Form */}
              <ContactForm
                propertyName={property.name}
                propertyId={property.id}
                agentName={property.agent.name}
                agentPhone={property.agent.phone}
                agentEmail={property.agent.email}
              />

              {/* Virtual Tour */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Virtual Experience</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      <Eye className="w-4 h-4 mr-2" />
                      360° Virtual Tour
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Play className="w-4 h-4 mr-2" />
                      Video Walkthrough
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
