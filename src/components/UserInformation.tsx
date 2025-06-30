import  UserIconSignIn  from "@/components/UserIconSignIn"
import NotificationBell from "@/components/notification";


const UserInformation = () => {
  return (
    <div className="flex flex-row">
      <NotificationBell/>
      <UserIconSignIn/>
      </div>
  )
}

export default UserInformation