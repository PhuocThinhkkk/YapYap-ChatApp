import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);


async function generateFeedbacks() {
  try {
    await client.connect();
    const db = client.db(); 
    const feedbackCollecton = db.collection("feedbacks")
   
    const result = await feedbackCollecton.updateMany({},
      { $set: { createdAt : new Date(Date.now() + Math.floor(Math.random() * 86400000))}}
    )
    console.log(`Inserted ${result.modifiedCount} feedbacks.`);
  } catch (err) {
    console.error('Error generating feedback:', err);
  } finally {
    await client.close();
  }
}

generateFeedbacks();
