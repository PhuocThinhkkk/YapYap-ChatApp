import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);



async function deleteRequest() {
  try {
    await client.connect();
    const db = client.db(); 
    const friendsCollection = db.collection("friends")

    const result = await friendsCollection.deleteMany();
    console.log("deleted :", result.deletedCount)
  }catch(e){
    console.error(e)
  } finally {
    await client.close();
  }
}

deleteRequest()