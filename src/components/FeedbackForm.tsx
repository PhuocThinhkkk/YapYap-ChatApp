"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area-v0"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Send, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { FeedbackFormType } from "@/type"


export default function FeedbackForm() {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [formData, setFormData] = useState<FeedbackFormType>({
      title: "",
      message: "",
      category: "",
      rating : 0,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
  

    const handleSubmit = async (e: React.FormEvent) => {
      try{
        e.preventDefault()

        if ( !formData.title || !formData.message || !rating || !formData.category ) {
          toast.info( "Missing Information")
          return
        }
        setIsSubmitting(true)
        formData.rating = rating;
        console.log(formData)
        // Simulate API call
        const res = await fetch("/api/feedback",
          {
            method : "POST",
            headers: {
              'Content-Type': 'application/json'  // Tell the server you're sending JSON
            },
            body: JSON.stringify(formData)   
          }
        )
        const data = await res.json()
        if (!res.ok) {
          throw new Error(`${data.message}`)
        }
        // Reset form
        setFormData({
          title: "",
          message: "",
          category: "",
          rating : 0,
        })
        setRating(0)
        setIsSubmitting(false)

        toast.success("Feedback Submitted! ✨ Thank you for your feedback. We'll review it shortly.")
      }catch(e){
        console.error(e)
        toast.error(`${e}`)
        setIsSubmitting(false)
      }
    }

    const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const getRatingText = (rating: number) => {
      const texts = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
      return texts[rating]
    }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Share Your Experience
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          We value your opinion and use your feedback to improve our service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-12">
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200">
                <SelectItem value="UI/UX">🎨 UI/UX Design</SelectItem>
                <SelectItem value="Performance">⚡ Performance</SelectItem>
                <SelectItem value="Feature Request">💡 Feature Request</SelectItem>
                <SelectItem value="Bug Report">🐛 Bug Report</SelectItem>
                <SelectItem value="Support">🤝 Customer Support</SelectItem>
                <SelectItem value="General">💬 General Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700">Rating *</Label>
            <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-2 hover:scale-125 transition-all duration-200 rounded-full hover:bg-white/50"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => {
                      console.log(star)
                       setRating(star)}
                      }
                  >
                    <Star
                      className={`w-8 h-8 transition-all duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(rating > 0 || hoveredRating > 0) ? (
                <div className="text-center h-10 hover:cursor-pointer">
                  <p className="text-lg font-semibold text-gray-800">{getRatingText(hoveredRating || rating)}</p>
                  <p className="text-sm text-gray-600">{hoveredRating || rating} out of 5 stars</p>
                </div>
              ) : <div className="h-10 hover:cursor-pointer"></div>}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Brief summary of your feedback"
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please provide detailed feedback..."
              className="min-h-[140px] border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <Send className="w-5 h-5" />
                Submit Feedback
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


