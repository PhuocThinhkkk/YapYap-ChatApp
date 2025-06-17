import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const categories = ['Bug', 'Feature Request', 'General', 'UI/UX', 'Performance'];


async function generateFeedbacks() {
  try {
    await client.connect();
    const db = client.db(); 
    const userCollection = db.collection("users")
    const feedbackCollecton = db.collection("feedbacks")
    const users = await userCollection.find().toArray();
    if (users.length === 0) {
      console.log('No users found in the database.');
      return;
    }
    console.log(users)

    const feedbacks = Array.from({ length: 20 }).map(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      return {
        title: faker.lorem.sentence(3),
        message: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
        category: faker.helpers.arrayElement(categories),
        user: randomUser._id,
      };
    });

    const result = await feedbackCollecton.insertMany(feedbacks);
    console.log(`Inserted ${result.length} feedbacks.`);
  } catch (err) {
    console.error('Error generating feedback:', err);
  } finally {
    await client.close();
  }
}

generateFeedbacks();
