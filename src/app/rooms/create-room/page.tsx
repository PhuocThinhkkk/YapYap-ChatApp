import { CreateChatForm } from "@/components/create-room"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Private Chat</h1>
          <p className="text-muted-foreground mt-2">Set up a new private chat room</p>
        </div>
        <CreateChatForm />
      </div>
    </main>
  )
}