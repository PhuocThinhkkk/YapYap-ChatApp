import { MessageCircleHeart } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
            <div>
            <div className="flex items-center space-x-2 mb-4">
                <MessageCircleHeart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Simple Chat App</span>
            </div>
            <p className="text-gray-400">Streamline your workflow with our powerful productivity platform.</p>
            </div>
            <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
                <li>
                <Link href="/role" className="hover:text-white">
                    Features
                </Link>
                </li>
                <li>
                <Link href="/role" className="hover:text-white">
                    Pricing
                </Link>
                </li>
                
            </ul>
            </div>
            <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
                <li>
                <Link href="#" className="hover:text-white">
                    About
                </Link>
                </li>
                <li>
                <Link href="#" className="hover:text-white">
                    Blog
                </Link>
                </li>
                <li>
                <Link href="#" className="hover:text-white">
                    Careers
                </Link>
                </li>
                <li>
                <Link href="#" className="hover:text-white">
                    Contact
                </Link>
                </li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
                <li>
                <Link href="#" className="hover:text-white">
                    Help Center
                </Link>
                </li>
                <li>
                <Link href="#" className="hover:text-white">
                    Github
                </Link>
                </li>
               
                
            </ul>
            </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Simple Chat App. All rights reserved.</p>
        </div>
        </div>
    </footer>
  )
}

export default Footer