import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db(); // or db("your-db-name") if not in URI
    const messages = db.collection('messages');

    const result = await messages.updateMany(
        { },
        { $rename: { 'userId': 'user', 'roomId': 'room' }  }
    );

    console.log(`Updated ${result.modifiedCount} messages`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
