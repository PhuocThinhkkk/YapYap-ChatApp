"use cache"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Lock,
  Users,
  Smile,
  LayoutDashboard,
  UserCircle,
  Edit,
  UserPlus,
  ArrowRight,
  Star,
} from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { 
  Card,  
  CardContent 
} from "@/components/ui/card"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import { get4FiveStarFeedbacks } from "@/lib/db/feedback"
import type { FeedbackDb } from "@/type"
import image1 from './images/image1.jpg';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';

export default async function LandingPage() {

  const initialFeedbacks : FeedbackDb[] = await get4FiveStarFeedbacks()
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-8 text-purple-600" />
          <span className="text-2xl font-bold text-gradient from-purple-600 to-pink-500">YapYap</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
            Features
          </Link>
          <Link href="#interface" className="text-gray-600 hover:text-purple-600 transition-colors">
            Interface
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">
            Testimonials
          </Link>
        </nav>
        <div className="flex items-center gap-4">
        <Link href={'/sign-in'}>
          <Button variant="ghost" className="hidden md:inline-flex">
            Log in
          </Button>
        </Link>
          <Link href={'/sign-up'}>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
            Sign up free
          </Button>
          </Link>
        </div>
      </header>

       {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Animated Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-40 blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-40 blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-50 rounded-full opacity-30 blur-2xl animate-pulse"></div>

          {/* Additional floating elements */}
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-pink-200 rounded-full opacity-20 blur-lg animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-purple-200 rounded-full opacity-25 blur-xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-8 lg:px-12 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Animated Text Content */}
            <div className="lg:w-1/3 text-center lg:text-left animate-fade-in-up">
              <h1 className="font-bold mb-6">
                <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  YapYap
                </span>
                <br />
                <span className="mt-8 text-gray-800 text-sm md:text-xl lg:text-2xl font-medium animate-fade-in-up animation-delay-200">
                  For those who just cant stop yapping.
                </span>
              </h1>
              <p className="text-base md:text-sm lg:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-400">
                Connect with friends, create private rooms, and express yourself with emojis in our beautiful, intuitive
                chat platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    Get Started <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Animated Image - Hidden on small screens, visible on large screens */}
            <div className="hidden lg:block lg:w-2/3 relative animate-fade-in-right animation-delay-300">
              <div className="relative z-10 rounded-2xl overflow-hidden bg-white aspect-[3/2] w-full 
              transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl group
              image-blur-edges">
                <Image
                  height={783}
                  width={1175}
                  src={image1}
                  alt="YapYap App Interface"
                  className="w-full h-full object-cover scale-[1.05] transition-transform duration-700 group-hover:scale-110"
                />
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Animated Decorative background elements */}
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-float"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl animate-float-delayed"></div>
              <div className="absolute top-1/2 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-4 md:px-10 lg:px-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Features Youll Love</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            YapYap is packed with all the tools you need to connect, share, and express yourself.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Lock className="size-10 text-purple-600" />}
              title="Private Rooms"
              description="Create secure, invitation-only spaces for your conversations."
            />
            <FeatureCard
              icon={<Smile className="size-10 text-purple-600" />}
              title="Emoji Support"
              description="Express yourself with a wide range of emojis and reactions."
            />
            <FeatureCard
              icon={<LayoutDashboard className="size-10 text-purple-600" />}
              title="Beautiful Dashboard"
              description="Navigate your chats with our intuitive, customizable interface."
            />
            <FeatureCard
              icon={<UserPlus className="size-10 text-purple-600" />}
              title="Add Friends"
              description="Grow your network and connect with new people easily."
            />
          </div>
        </div>
      </section>

      {/* App Interface Showcase */}
      <section id="interface" className="py-20 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Beautiful Interface</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Designed with user experience in mind, YapYap makes chatting a pleasure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InterfaceCard
              image={image2}
              title="User Dashboard"
              description="Didn't really need it… but hey, who doesn't love a good dashboard?"
              icon={<UserCircle className="size-6" />}
            />
            <InterfaceCard
              image={image3}
              title="Chat Rooms"
              description="Join public rooms or create private ones for your inner circle."
              icon={<Users className="size-6" />}
            />
            <InterfaceCard
              image={image4}
              title="Profile Editing"
              description="Update your information and preferences with ease."
              icon={<Edit className="size-6" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white px-4 md:px-10 lg:px-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">What Users Say</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Dont just take our word for it - hear from our happy users.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {initialFeedbacks.map((feedback, index) => ( 
              <Card
              key={feedback._id}
              className="hover:cursor-pointer bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                {/* Star Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Feedback Message */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">{feedback.message}</p>


                {/* User Info */}
               
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={feedback.user.avatarUrl}
                      alt={feedback.user.name}
                    />
                    <AvatarFallback className="bg-slate-50 text-zinc-800">
                      {feedback.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{feedback.user.name}</p>
                    <p className="text-sm text-gray-600">
                      {feedback.title} • {(new Date(feedback.createdAt)).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-10 lg:px-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Yapping?</h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Join thousands of users already connecting, sharing, and expressing themselves on YapYap.
          </p>
          <Link href={'/sign-up'}>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Sign Up Now <ArrowRight className="ml-2 size-4" />
          </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-10 lg:px-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="size-6 text-purple-400" />
                <span className="text-xl font-bold text-white">YapYap</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                For those who just cant stop yapping. Connect, share, and express yourself.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 YapYap. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ 
    icon, 
    title, 
    description 
} : {
    icon : unknown,
    title : string,
    description : string,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="mb-6 p-3 bg-purple-50 rounded-full">{icon as true}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function InterfaceCard({ 
    image, 
    title, 
    description, 
    icon 
} : {
    icon : unknown,
    title : string,
    description : string,
    image : StaticImageData
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Image src={image } alt={title} 
        height={250}
        width={300} 
        className="w-full h-full object-cove r"/>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {icon as true}
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

