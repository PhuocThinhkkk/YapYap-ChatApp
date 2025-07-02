import {  ResponseMessage, UserDB } from "@/type"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { formatTime } from "@/lib/utils"
export default function Message({ message, user } : {
    message : ResponseMessage,
    user : UserDB
}) {
    return (
        <div
            className={`flex items-start gap-2 sm:gap-3 ${
            message.user._id ===user._id? "justify-end" : "justify-start"
            }`}
        >
            {message.user._id !==user._id&& (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
                <AvatarImage src={message.user.avatarUrl || "/placeholder.svg"} alt={message.user.name} />
                <AvatarFallback className="text-xs">
                {message.user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
            </Avatar>
            )}

            <div
            className={`flex flex-col ${
                message.user._id ===user._id? "items-end" : "items-start"
            } min-w-0 flex-1 max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]`}
            >
            <div className="text-xs text-muted-foreground mb-1 px-1">
                {message.user._id !==user._id? message.user.name : "You"}
            </div>

            <div
                className={` max-w-[150px] sm:max-w-[250px] lg:max-w-[500px] inline-block rounded-lg px-3 py-2 sm:px-4 sm:py-2 ${
                message.user._id ===user._id? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
            >
                <p className="text-sm break-words hyphens-auto overflow-wrap-anywhere">{message.info}</p>
            </div>

            <div className="text-xs text-muted-foreground mt-1 px-1">{formatTime(message.createdAt)}</div>
            </div>

            {message.user._id ===user._id&& (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
                <AvatarImage src={message.user.avatarUrl || "/placeholder.svg"} alt={message.user.name} />
                <AvatarFallback className="text-xs">
                {message.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
            </Avatar>
            )}
        </div>
    )
}