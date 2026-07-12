import { Loader2 } from "lucide-react"

export default function Loading(){
    return (
        <div className="h-full w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-primary h-10 w-10 " />
        </div>
         
    )
}