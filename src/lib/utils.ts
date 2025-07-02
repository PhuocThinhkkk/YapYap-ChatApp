import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString : string | undefined) : string {
	if (!dateString) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

 export function formatTime(dateString : string | undefined) {
	if (!dateString) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

 export function isSameDay(date1String : string | undefined, date2String : string | undefined) {
	
	if (!date1String || !date2String) {
		toast.error('pass in underfined Date to function')
		return ""
	}
	const date1 = new Date(date1String)
	const date2 = new Date(date2String)
	
    return date1.toDateString() === date2.toDateString()
  }