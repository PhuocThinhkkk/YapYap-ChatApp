"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, } from "lucide-react"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { UserProfile } from "@/type"
import { toast } from "sonner"
import { UIError } from "@/components/ui-error"

    type CardPlan = {
        title : "Free Plan" | "Premium Plan",
        description : string,
        price : number,
        time : "Day" | "Month" | "Year",
        features : string[],
        buttonText : string,
    }

    const freeFeatures = [
        "You can have 40 rooms",
        "Up to 10 users per rooms",
        "Seeing beautifull charts",
        "Edit your personal profile",
        "Sending feedbacks",

    ]

    const premiumFeatures = [
        "Unlimited rooms",
        "Up to 100 users per rooms",
        "Seeing beautifull charts",
        "Edit your personal profile",
        "Sending feedbacks",
        "Message reactions (👍 ❤️ 😂)",
    ]
  const FreePlan : CardPlan = {
    title : "Free Plan",
    description : "Perfect for getting started",
    price : 0,
    time : "Month",
    features : freeFeatures,
    buttonText : "Get Started Free"
  }
    const PremiumPlan : CardPlan = {
    title : "Premium Plan",
    description : "For more features",
    price : 0,
    time : "Month",
    features : premiumFeatures,
    buttonText : "Start Premium Trial"
  }


const PricingSection = ( ) => {
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
        setIsVisible(true)
        const id = (JSON.parse(Cookies.get("user") as string))._id
        setUserId(id)
    }, []);

    const UserQuery = useQuery({
        queryKey: ['UserInfor', userId],
        enabled: !!userId,
        queryFn: async () => {
        const response = await fetch(`/api/users/${userId}/profile`)
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok')
            }
            return data;
        },
    })
    const user = UserQuery.data;
    
    

    return (
            
        <section className="py-4">
            {UserQuery.error && <UIError className="w-full" title={`${UserQuery.error}`}/>}
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <PricingCard user={user} plan={FreePlan} isVisible={isVisible} isLoading={UserQuery.isLoading}/>
                    <PricingCard user={user} plan={PremiumPlan} isVisible={isVisible} isLoading={UserQuery.isLoading}/>
                </div>
            </div>
        </section>
    )
}

export default PricingSection

function PricingCard({ 
    plan, 
    isVisible,
    user, 
    isLoading
} : {
    plan : CardPlan, 
    isVisible : boolean,
    user: UserProfile | undefined,
    isLoading : boolean
}){
    const queryClient = useQueryClient()
    const mutation = useMutation(
        {
            mutationFn: async () => {
                    const res = await fetch(`/api/users/${user?._id}/role`, {
                    method: "POST",
                    body: JSON.stringify(plan.title),
                });
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(`There is something wrong: ${data.message}` || 'Network response was not ok')
                }
                return data
            },
            onSuccess: ()=> {
                toast.success("success");
                queryClient.invalidateQueries({ queryKey: ["UserInfor"] });
            },
            onError: ()=> {
                toast.error("failed");
            }
        }
    )
    async function ChangePlan(){
        
        try{
            if (!user) {
                throw new Error("Please sign in to continue.");
            }   

            mutation.mutate();
            
            
        }catch(e){
            toast.error(`${e}`)
        }  
    }


    return(
        <Card className={`relative border-2 hover:shadow-lg 
            transition-all duration-200 hover:scale-105 
            initial-hidden ${isVisible ? "animate-fade-in-left delay-50" : ""}`}>

            <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}$</span>
                    <span className="text-gray-600">/{plan.time}</span>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                    <li key={index} 
                    className={`flex items-center initial-hidden ${isVisible ? "animate-fade-in-up" : ""}`}
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                    </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="h-full items-end">
                { 
                    user?.role == plan.title ? 
                    <ButtonCurrentPlan/> : 
                    <Button disabled={mutation.isPending || isLoading} onClick={ChangePlan} className="w-full hover:cursor-pointer " variant="outline">
                        {plan.buttonText}
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}

function ButtonCurrentPlan(){
    return(
        <Button className=" w-full hover:bg-amber-100 bg-amber-100 text-cyan-800">
            You are using this
        </Button>
    )
}