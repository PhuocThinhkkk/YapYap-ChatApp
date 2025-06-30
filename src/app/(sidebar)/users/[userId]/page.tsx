import ProfileComponent from '@/components/UserProfile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserInformation from '@/components/UserInformation';
const Page = async () => {
  
  return (
    
    <>
      {/* Header with trigger for mobile */}
        <header className="relative flex h-18 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Profile</h1>
          <div className="absolute right-8">
            <UserInformation/>
          </div>
        </header>
      <ProfileComponent />
    </>
 
  )
}
export default Page

