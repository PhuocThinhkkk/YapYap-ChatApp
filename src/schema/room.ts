import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    password: { type: String, required: true },
    maxPeople: { type: Number, required: true },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Room = mongoose.models.room || mongoose.model("room", roomSchema);

export default Room;