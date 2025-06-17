import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Feedback } from "@/type"
import FeedbackForm from "@/components/FeedbackForm"
import FeedbackList from "@/components/FeedbackList"

const TabFeedBack = ( { feedbacks }: { feedbacks : Feedback[]} ) => {
  return (
    <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl p-2">
            <TabsTrigger
            value="submit"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
            Submit Feedback
            </TabsTrigger>
            <TabsTrigger
            value="view"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
            View All Feedback
            </TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-6">
            <FeedbackForm />
        </TabsContent>

        <TabsContent value="view" className="space-y-6">
            <FeedbackList feedbacks={feedbacks} />
        </TabsContent>
    </Tabs>
  )
}

export default TabFeedBack