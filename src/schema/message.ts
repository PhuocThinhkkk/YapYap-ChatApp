import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomName: { type : String, require : true},
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  info: { type : String, require: true},
  createdAt : {type : Date , default : Date.now}
},
{
  versionKey: false, 
}
)


const MESSAGE = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MESSAGE;