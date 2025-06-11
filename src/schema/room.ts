import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    password: { type: String, required: true },
    maxPeople: { type: Number, required: true },
    users:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true } ],
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt : {type : Date , default : Date.now}
},{
    versionKey: false, 
}
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;