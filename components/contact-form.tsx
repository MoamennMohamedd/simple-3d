"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Phone, Mail, MessageSquare, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  propertyName?: string
  propertyId?: string
  agentName?: string
  agentPhone?: string
  agentEmail?: string
}

export function ContactForm({ propertyName, propertyId, agentName, agentPhone, agentEmail }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "", inquiryType: "general" })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for your inquiry. {agentName || "Our team"} will get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Send Inquiry
        </CardTitle>
        {propertyName && <p className="text-sm text-muted-foreground">About: {propertyName}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <Input
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Inquiry Type</label>
              <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="viewing">Schedule Viewing</SelectItem>
                  <SelectItem value="pricing">Pricing Information</SelectItem>
                  <SelectItem value="financing">Financing Options</SelectItem>
                  <SelectItem value="virtual-tour">Virtual Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Tell us about your requirements, preferred viewing times, or any questions you have..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export function TourScheduler({ propertyName, propertyId }: { propertyName?: string; propertyId?: string }) {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState("")
  const [tourType, setTourType] = useState("in-person")
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarIcon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Tour Scheduled!</h3>
        <p className="text-muted-foreground mb-4">
          Your {tourType} tour has been scheduled for {date && format(date, "PPP")} at {timeSlot}.
        </p>
        <p className="text-sm text-muted-foreground">
          You'll receive a confirmation email shortly with all the details.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Tour Type</label>
        <Select value={tourType} onValueChange={setTourType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-person">In-Person Tour</SelectItem>
            <SelectItem value="virtual">Virtual Tour</SelectItem>
            <SelectItem value="video-call">Live Video Call</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Time Slot</label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Your name"
          value={contactInfo.name}
          onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          type="email"
          placeholder="Email address"
          value={contactInfo.email}
          onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <Input
        type="tel"
        placeholder="Phone number"
        value={contactInfo.phone}
        onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
      />

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!date || !timeSlot || !contactInfo.name || !contactInfo.email || isSubmitting}
      >
        {isSubmitting ? "Scheduling..." : "Schedule Tour"}
      </Button>
    </div>
  )
}

export function QuickContactButtons({ agentPhone, agentEmail }: { agentPhone?: string; agentEmail?: string }) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [showTourScheduler, setShowTourScheduler] = useState(false)

  return (
    <div className="space-y-3">
      <Button className="w-full bg-primary hover:bg-primary/90" asChild>
        <a href={`tel:${agentPhone}`}>
          <Phone className="w-4 h-4 mr-2" />
          {agentPhone || "Call Agent"}
        </a>
      </Button>

      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-transparent">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Agent</DialogTitle>
          </DialogHeader>
          <ContactForm agentEmail={agentEmail} />
        </DialogContent>
      </Dialog>

      <Dialog open={showTourScheduler} onOpenChange={setShowTourScheduler}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-transparent">
            <Clock className="w-4 h-4 mr-2" />
            Schedule Tour
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Property Tour</DialogTitle>
          </DialogHeader>
          <TourScheduler />
        </DialogContent>
      </Dialog>
    </div>
  )
}
