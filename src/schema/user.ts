import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type : String, required : true } ,
    email: { type : String, required : true } ,
    password:  { type : String, required : true },
    roomsOwn: [ {type : mongoose.Schema.Types.ObjectId, ref: 'Room', required : true} ],
    rooms: [{type : mongoose.Schema.Types.ObjectId, ref: 'Room', required : true}],
    createdAt : {type : Date , default : Date.now},
    location : String,
    avatarUrl : String,
    role : String,
    bio : String,
    backGroundUrl : String,
},{
    versionKey: false, 
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;       