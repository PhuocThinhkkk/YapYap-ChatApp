import { Button } from "./ui/button"

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who are already boosting their productivity with Simple Chat App.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
                Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
            </Button>
        </div>
        </div>
    </section>
  )
}

export default CTASection