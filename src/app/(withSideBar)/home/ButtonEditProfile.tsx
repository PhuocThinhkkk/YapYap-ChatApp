"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Edit } from "lucide-react"

export default function ButtonEditProfile({ userId } : { userId : string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="hover:cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription>Makes changes to your profile here. Click save to save your changes.</DialogDescription>
        </DialogHeader>
        <FormAction userId={userId}/>
      </DialogContent> 
    </Dialog>
  )
}


function FormAction({ userId } : { userId : string }){

    return(
        <>
         <form>
            <div className="py-4">
                <p>Your Name: </p>
                <Input
                name="name"
                placeholder="Enter your name."
                defaultValue={userId}
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button type="submit"  className="hover:cursor-pointer" >Save changes</Button>
            </DialogFooter>
        </form>
        </>
       
    )
}