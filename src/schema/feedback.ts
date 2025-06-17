import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    title: {type : String, require: true},
    message:{type : String, require: true},
    rating: {type : Number, require: true},
    category:{type : String, require: true},
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true } ,
    createdAt : {type : Date , default : Date.now}
},{
    versionKey: false, 
}
);

const Feedback = mongoose.models.feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;