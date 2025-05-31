"use client"
import { useState, useEffect } from "react"
const HeroPricing = () => {
  const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        setIsVisible(true)
    }, [])
  return (
    <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1
            className={`text-5xl font-bold text-gray-900 mb-6 initial-hidden ${isVisible ? "animate-fade-in-up delay-200" : ""}`}
          >
            Choose Your Perfect Plan
          </h1>
          <p
            className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto initial-hidden ${isVisible ? "animate-fade-in-up delay-400" : ""}`}
          >
            Start free and scale as you grow. Our flexible pricing adapts to your needs.
          </p>
        </div>
      </section>
    )
}

export default HeroPricing