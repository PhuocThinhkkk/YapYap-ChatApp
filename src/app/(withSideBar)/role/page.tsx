import HeroPricing from "./HeroPricing"
import PricingSection from "./PricingSection"
import FeaturesComparision from "./FeaturesComparision"
import FeedbackSection from "@/components/FeedbackSection"



export default async function Page() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeroPricing />
      <PricingSection/>
      <FeaturesComparision/>
      <FeedbackSection/>
    </div>
  )
}
