'use client'
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { FeedbackDb } from "@/type"
import FeedbackForm from "@/components/FeedbackForm"
import FeedbackList from "@/components/FeedbackList"
import { useState, useRef,useEffect } from "react"

const TabFeedBack = ( { feedbacks }: { feedbacks : FeedbackDb[]} ) => {
  const [activeTab, setActiveTab] = useState("submit")
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabsListRef = useRef<HTMLDivElement>(null)
  const submitTabRef = useRef<HTMLButtonElement>(null)
  const viewTabRef = useRef<HTMLButtonElement>(null)
  
  const updateIndicator = (tabValue: string) => {
    const tabRef = tabValue === "submit" ? submitTabRef : viewTabRef
    const tabsListElement = tabsListRef.current
    const tabElement = tabRef.current

    if (tabElement && tabsListElement) {
      const tabsListRect = tabsListElement.getBoundingClientRect()
      const tabRect = tabElement.getBoundingClientRect()

      setIndicatorStyle({
        left: tabRect.left - tabsListRect.left,
        width: tabRect.width,
      })
    }
  }

  useEffect(() => {
    updateIndicator(activeTab)
  }, [activeTab])

  useEffect(() => {

    const timer = setTimeout(() => updateIndicator(activeTab), 100)
    return () => clearTimeout(timer)
  }, []) //eslint-disable-line

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    updateIndicator(value)
  }

  return (
     <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Custom Tab List with Animated Indicator */}
        <div className="relative mb-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl p-2">
          <div ref={tabsListRef} className="grid grid-cols-2 relative">
            {/* Animated Background Indicator */}
            <div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg transition-all duration-500 ease-out z-0"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                transform: "translateZ(0)", // Force hardware acceleration
              }}
            />

            {/* Tab Triggers */}
            <button
              ref={submitTabRef}
              onClick={() => handleTabChange("submit")}
              className={`relative z-10 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "submit" ? "text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Submit Feedback
              </button>

                <button
                  ref={viewTabRef}
                  onClick={() => handleTabChange("view")}
                  className={`relative z-10 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "view" ? "text-white shadow-lg" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  View All Feedback
                    </button>
              </div>
            </div>

            {/* Tab Content with Smooth Transitions */}
            <div className="relative overflow-hidden">
              <TabsContent
                value="submit"
                className={`space-y-6 transition-all duration-700 ease-in-out ${
                  activeTab === "submit"
                    ? "opacity-100 translate-x-0 relative"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <FeedbackForm  />
              </TabsContent>

              <TabsContent
                value="view"
                className={`space-y-6 transition-all duration-700 ease-in-out ${
                  activeTab === "view"
                    ? "opacity-100 translate-x-0 relative"
                    : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <FeedbackList feedbacks={feedbacks} />
              </TabsContent>
            </div>
          </Tabs>
    
  )
}

export default TabFeedBack