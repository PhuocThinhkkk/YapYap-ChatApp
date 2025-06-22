import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type : String, required : true } ,
    email: { type : String, required : true } ,
    password:  { type : String, required : true },
    roomsOwn: [ {type : mongoose.Schema.Types.ObjectId, ref: 'Room',default: []} ],
    rooms: [{type : mongoose.Schema.Types.ObjectId, ref: 'Room', default: []}],
    createdAt : {type : Date , default : Date.now},
    location : { type : String, default: ""},
    avatarUrl : { type : String, default: ""},
    role : { type : String, default: "Free Plan"},
    bio : { type : String, default: ""},
    backgroundUrl : { type : String, default: ""},
},{
    versionKey: false, 
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;       