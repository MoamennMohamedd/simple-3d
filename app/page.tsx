import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Eye, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FlatShow</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/properties" className="text-foreground hover:text-primary transition-colors">
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
              <a href="tel:+15551234567">
                <Phone className="w-4 h-4 mr-2" />
                Contact Agent
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Premium Property Showcase
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">GAWDA</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience luxury living in this stunning modern property featuring premium finishes, spacious layouts,
              and breathtaking views.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/3d-viewer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Eye className="w-5 h-5 mr-2" />
                  Explore in 3D
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Browse All Properties
                </Button>
              </Link>
            </div>
          </div>

          {/* Featured Property Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16">
            <img
              src="/modern-luxury-apartment-interior-with-floor-to-cei.png"
              alt="GAWDA Property - Main View"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Downtown District, Premium Location</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Bed className="w-5 h-5" />
                  <span>3 Beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="w-5 h-5" />
                  <span>2 Baths</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="w-5 h-5" />
                  <span>2,400 sq ft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Highlights */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif">Property Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">360° Virtual Tours</h3>
                <p className="text-muted-foreground">
                  Explore every corner with our immersive virtual reality experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Square className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Finishes</h3>
                <p className="text-muted-foreground">High-end materials and fixtures throughout the entire property</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prime Location</h3>
                <p className="text-muted-foreground">Located in the heart of the city with easy access to amenities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Gallery Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif">Property Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/modern-kitchen-with-marble-countertops-and-stainle.png"
                alt="Kitchen"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/spacious-living-room.png"
                alt="Living Room"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/luxury-master-bedroom-with-walk-in-closet.png"
                alt="Master Bedroom"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Photos (24)
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">Ready to Schedule a Tour?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our expert agents to arrange a private viewing or virtual tour of this exceptional property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="tel:+15551234567">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Link>
            </Button>
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
