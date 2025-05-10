import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String ,
    email: String ,
    password: String ,
    roomsOwn: [ {type : mongoose.Schema.Types.ObjectId, ref: 'Room', required : true} ],
    rooms: [{type : mongoose.Schema.Types.ObjectId, ref: 'Room', required : true}],
    createdAt : {type : Date , default : Date.now}
},{
    versionKey: false, 
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;       