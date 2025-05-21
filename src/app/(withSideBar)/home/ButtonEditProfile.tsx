"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormMessage, 
  FormLabel
} from "@/components/ui/form";
import { Edit } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner"


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

const MAX_FILE_SIZE = 1024 * 1024 * 5;  // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


 const formSchema = z.object({
  username : z.string().max(20, "Your name should be less than 20 characters."),
  adImage: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type ContactFormData = z.infer<typeof formSchema>;


function FormAction({ userId } : { userId : string }){

  const [currentImg, setCurrentImg] = useState<ContactFormData["adImage"] | null >(null)


  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userId,
      adImage: undefined,
    },
  });


  function onSubmit(data: ContactFormData) {
    toast("Your changes are successfull!",{
      description: "hello",
    })
  }
  console.log(form)

return(
  <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="pt-4">  
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name here. " {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

      { currentImg ? 
      <Image 
      src={URL.createObjectURL(currentImg)}
      alt="Your img."
      width={500}
      height={500}
      /> : null }
      <div className="pt-4">
        <FormField 
              control={form.control}
              name="adImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Img</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here. " type="file" {...field} 
                    onChange={(e) => { 
                      setCurrentImg(e.target.files?.[0] as ContactFormData["adImage"])
                      } }/>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
      </div>
      <DialogFooter>
          <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button type="submit"  className="hover:cursor-pointer" >Save changes</Button>
      </DialogFooter>
    </form>
  </Form>
  )
}