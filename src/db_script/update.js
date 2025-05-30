import User from "../schema/user.ts"
import connectDb from "../lib/mongoDb.js"

await connectDb()


User.updateMany(
    { role: { $exists: false } },
    { $set: { role: "Free Plan" } },
)