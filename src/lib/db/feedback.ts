import Feedback from '@/schema/feedback';
import { cache } from 'react';
import connectDB from '../mongoDb';
import { FeedbackDb, FeedbackFormType } from '@/type';
import mongoose from 'mongoose';

export const getAllFeedbacks : () => Promise<FeedbackDb[]> = cache( async() => {
    await connectDB()
    const feedbacks = await Feedback.aggregate([
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $unwind: '$user' 
    },
    {
        $addFields: {
            user: {
                _id: { $toString: '$user._id' },
                name: '$user.name',
                avatarUrl: '$user.avatarUrl',
                email : '$user.email',

            },
            '_id': { $toString: '$_id' },        
        }
    },
    {
        $project: {
            __v: 0, 
            'user.password': 0,
            'user.rooms': 0, 
            'user.roomsOwn': 0, 
        }
    }
    ])
    return feedbacks
})

export async function createFeedback( userId : string, formdata : FeedbackFormType) {
    await connectDB();
    const result = await Feedback.create({
        user : new mongoose.Types.ObjectId(userId),
        title : formdata.title,
        category : formdata.category,
        message : formdata.message,
        ratting : formdata.ratting
    })
    return result
}