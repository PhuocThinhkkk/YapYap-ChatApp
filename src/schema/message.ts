import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomName: { type : String, default : null},
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default : null },
  friendId : {type: mongoose.Schema.Types.ObjectId, ref : 'Friend', default : null},
  info: { type : String, require: true},
  createdAt : {type : Date , default : Date.now}
},
{
  versionKey: false, 
}
)


const MESSAGE = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MESSAGE;