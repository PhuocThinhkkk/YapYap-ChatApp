import { MongoClient, } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedFriendRequests(count = 10) {
  try {
    await client.connect();
    const db = client.db();

    const usersCol = db.collection('users');
    const friendRequestsCol = db.collection('friendrequests');

    const users = await usersCol.find().toArray();

    if (users.length < 2) {
      console.log('❗ Not enough users in the database to create friend requests.');
      return;
    }

    let created = 0;

    for (let i = 0; i < count; i++) {
      const from = users[Math.floor(Math.random() * users.length)];
      let to = users[Math.floor(Math.random() * users.length)];

      // ensure from ≠ to
      while (to._id.equals(from._id)) {
        to = users[Math.floor(Math.random() * users.length)];
      }

      // avoid duplicates
      const exists = await friendRequestsCol.findOne({
        from: from._id,
        to: to._id,
        status: 'pending',
      });

      if (exists) continue;

      await friendRequestsCol.insertOne({
        from: from._id,
        to: to._id,
        status: 'pending',
        createdAt: new Date(),
        isNewToTarget: true,
      });

      created++;
      console.log(`✅ Friend request: ${from._id} → ${to._id}`);
    }

    console.log(`\n🎉 Successfully created ${created} friend request(s).`);
  } catch (error) {
    console.error('❌ Error seeding friend requests:', error);
  } finally {
    await client.close();
  }
}

seedFriendRequests(100); // call with desired number
