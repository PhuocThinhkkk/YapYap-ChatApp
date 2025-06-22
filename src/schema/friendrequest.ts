import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
        
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
    isNewToTarget : { type: Boolean, default: true },
},{
    versionKey: false, 
});


const FriendRequest = mongoose.models.FriendRequest || mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;       
