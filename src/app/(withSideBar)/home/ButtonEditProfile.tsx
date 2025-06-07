"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import * as z from "zod";
import { ContactFormData, UserProfile } from "@/type";
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
import { Edit, ImageIcon } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner"
import { 
  useMutation,
  useQueryClient

} from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/text-area-v0";
import { Placeholder } from "@/components/Placeholder";


export default function ButtonEditProfile({ user } : {user : UserProfile}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={() => {
            setIsOpen(true)
          }} 
          size="sm" variant="outline" 
          className="hover:cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
            Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription>Makes changes to your profile here. Click save to save your changes.</DialogDescription>
        </DialogHeader>
        
        <FormAction user={user} setIsOpen={setIsOpen}/>
 
      </DialogContent> 
    </Dialog>
  )
}


const MAX_FILE_SIZE = 1024 * 1024 * 1;  // 1MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


export const formSchema = z.object({
  userName : z.string().max(20, "Your name should be less than 20 characters."),
  userBio : z.string().max(200, "Your bio should be less than 200 characters."),
  avatarImg: z
    .any()
    .optional()
    .refine((files) => {
      console.log(files?.[0]?.size)
      // Only validate if a file is present
      if (!files?.[0]) return true;
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 1MB.`)
    .refine(
      (files) => {
        if (!files?.[0]) return true;
        console.log("type of avatar: ",files?.[0]?.type)
        return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)
      },
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
    backgroundImg: z
    .any()
    .optional()
    .refine((files) => {
      console.log(files?.[0]?.size)
      // Only validate if a file is present
      if (!files?.[0]) return true;
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 1MB.`)
    .refine(
      (files) => {
        if (!files?.[0]) return true;
        console.log("type of background: ",files?.[0]?.type)
        return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)
      },
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

function FormAction({ user, setIsOpen } : {user : UserProfile, setIsOpen : ( bool : boolean )  => void}){
  const clientQuery = useQueryClient();
  const [currentAvatarImg, setCurrentAvatarImg] = useState<ContactFormData["avatarImg"] | null >(null)
  const [currentBackgroundImg, setCurrentBackgroundImg] = useState<ContactFormData["backgroundImg"] | null >(null)
  const mutaion = useMutation(
    {
      mutationFn: updateUser,
      onSuccess: () => {
        toast.success(`Your changes have been success. `);
        setIsOpen(false)
        clientQuery.invalidateQueries({ queryKey: ["UserInfor"] });

      },
      onError: (err)=>{
        toast.error(`${err}`);
      }
    }
  )

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userBio: user.bio,
      userName: user.name,
      avatarImg: undefined,
      backgroundImg: undefined,
    },
  });
  const userId = user._id;

  async function onSubmit(data: ContactFormData) {
    try {
      if(!data) {
        toast("please dont do sth stupiz!",{
        description: "hello.",
        });
        return;
      }

      toast.info("Your changes have been sent.");


      const formData = new FormData();
      if (data?.avatarImg?.[0]) {
        formData.append("avatarImg", data?.avatarImg?.[0]);  
      }
      if (data?.backgroundImg?.[0]) {
        formData.append("backgroundImg", data?.backgroundImg?.[0]); 
      }
      formData.append("userBio", data.userBio)
      formData.append("userName", data.userName)
      
      mutaion.mutate({userId, formData })
    } catch (error) {
      console.log("error in submit func: ",error)
      toast.error("There is something wrong.")
    }
    
      
  }
  console.log("form: ",form)

return(
  <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <ScrollArea className="h-[500] py-4">
        <div className="py-4">  
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name here. " {...field}/>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div className="py-4">  
          <FormField
            control={form.control}
            name="userBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your bio</FormLabel>
                <FormControl>
                  <Textarea  placeholder="Enter your bio here..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public bio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

        <div className="py-4">
          <FormField 
            control={form.control}
            name="avatarImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar img</FormLabel>
                { currentAvatarImg ? 
                <Image 
                src={URL.createObjectURL(currentAvatarImg)}
                alt="Your img."
                width={150}
                height={150}
                style={{ aspectRatio: "150/150", objectFit: "cover" }}
                /> : <Placeholder 
                width={150}
                height={150}
                icon={ImageIcon}
                iconSize={32}
                /> }
                <FormControl>
                  <Input 
                  placeholder="Enter your name here. " 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const fileList = e.target.files
                    if (fileList) {
                      field.onChange(fileList)
                      setCurrentAvatarImg(e.target.files?.[0] as ContactFormData["avatarImg"])
                    } 
                    }}/>
                  
                </FormControl>
                <FormDescription>
                  This is your public avatar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      
        <div className="py-4">
          <FormField 
            control={form.control}
            name="backgroundImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Img</FormLabel>
                { currentBackgroundImg ? 
                <Image 
                src={URL.createObjectURL(currentBackgroundImg)}
                alt="Your img."
                width={500}
                height={150}
                style={{ aspectRatio: "500/150", objectFit: "cover" }}
                /> : <Placeholder 
                width={500}
                height={150}
                icon={ImageIcon}
                iconSize={32}
                /> }
                <FormControl>
                  <Input 
                  placeholder="Enter your name here. " 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const fileList = e.target.files
                    if (fileList) {
                      field.onChange(fileList)
                      setCurrentBackgroundImg(e.target.files?.[0] as ContactFormData["backgroundImg"])
                    } 
                    }}/>
                  
                </FormControl>
                <FormDescription>
                  This is your public background.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      </ScrollArea>
      <DialogFooter>
          <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button disabled={mutaion.isPending} type="submit"  className="hover:cursor-pointer" >Save changes</Button>
      </DialogFooter>
    </form>
  </Form>
  )
}

async function updateUser({
  userId, 
  formData 
} : { 
  userId : string,
  formData: FormData
}){
  const response = await fetch(`/api/users/${userId}/profile`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.status !== 200) {
    const err = (await response.json()).message
    throw new Error(`${err}`);
  }
  return response;
}