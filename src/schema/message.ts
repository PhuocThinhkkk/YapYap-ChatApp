import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomName: { type : String, require : true},
    info: { type : String, require: true}
},
{
  versionKey: false, // this removes __v
}
)


const MESSAGE = mongoose.models.message || mongoose.model("message", messageSchema);

export default MESSAGE;