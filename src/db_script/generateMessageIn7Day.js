import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker'; // For generating fake data

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Generate nonsense messages
const generateNonsenseMessage = () => {
  const messageTypes = [
    () => `The ${faker.color.human()} ${faker.animal.type()} ${faker.word.adverb()} ${faker.word.verb()} over the ${faker.word.adjective()} ${faker.word.noun()}.`,
    () => `${faker.hacker.phrase()} but then ${faker.hacker.verb()} the ${faker.hacker.noun()}.`,
    () => `Did you know ${faker.science.chemicalElement().name} can ${faker.word.verb()} ${faker.word.adverb()}?`,
    () => `Quantum ${faker.word.noun()} suggests ${faker.word.adjective()} ${faker.word.noun()} might ${faker.word.verb()} spontaneously.`
  ];
  
  return messageTypes[Math.floor(Math.random() * messageTypes.length)]();
};

async function main() {
  try {
    await client.connect();
    const db = client.db(); // or db("your-db-name") if not in URI
    const users = db.collection('users');
    const messages = db.collection('messages');

    // Get random users (adjust limit as needed)
    const randomUsers = await users.aggregate([
      { $sample: { size: 50 } }, // Get 50 random users
      { $project: { _id: 1 } } // Only include their IDs
    ]).toArray();

    if (randomUsers.length === 0) {
      console.log('No users found in the database');
      return;
    }

    // Create messages for each of the last 7 days
    for (let daysAgo = 1; daysAgo <= 7; daysAgo++) {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      // Create between 5-20 messages per day
      const messagesPerDay = Math.floor(Math.random() * 16) + 5;
      
      const messageDocs = [];
      for (let i = 0; i < messagesPerDay; i++) {
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        
        messageDocs.push({
          userId: randomUser._id,
          infor: generateNonsenseMessage(),
          createdAt: new Date(date.getTime() + Math.random() * 86400000), // Random time during the day
          roomName : generateNonsenseMessage(),
          roomId : randomUser._id,
          isNonsense: true // Flag to identify these test messages
        });
      }
      
      await messages.insertMany(messageDocs);
      console.log(`Created ${messagesPerDay} messages for ${date.toDateString()}`);
    }

    console.log('Finished creating nonsense messages for the last 7 days');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();