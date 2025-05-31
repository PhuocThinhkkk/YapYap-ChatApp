import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db(); // or db("your-db-name") if not in URI
    const users = db.collection('users');

    const result = await users.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'Free Plan' } }
    );

    console.log(`Updated ${result.modifiedCount} users`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
