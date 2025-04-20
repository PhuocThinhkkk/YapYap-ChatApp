import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    password: { type: String, required: true },
    maxPeople: { type: Number, required: true },
    users: {type: Array , require : true},
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt : {type : Date , default : Date.now}
},{
    versionKey: false, 
}
);

const Room = mongoose.models.room || mongoose.model("room", roomSchema);

export default Room;