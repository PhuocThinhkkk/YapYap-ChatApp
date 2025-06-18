import { createPortal } from 'react-dom'
import { Banana } from 'lucide-react'
const BananaLoading = ({ isRedirect } : { isRedirect : boolean }) => {
  return (
    <>
    {isRedirect && createPortal(
            <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                <Banana className="h-16 w-16 animate-spin text-primary" />
                <p className="text-sm font-medium">Loading...</p>
                </div>
            </div>,
            document.body
        )}
    </>
  )
}

export default BananaLoading