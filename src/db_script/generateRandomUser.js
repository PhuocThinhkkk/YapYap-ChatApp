import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Faker } from '@faker-js/faker';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

    const randomAvatar = () =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${Math.random().toString(36).substring(7)}`;


async function seedUsers(count = 10) {
  try {
    const randomEmail = Faker.email

    await client.connect();
    const db = client.db();
    const usersCol = db.collection('users');

    const users = Array.from({ length: count }).map(() => {
      const name = Faker.name
      return {
        name,
        email: randomEmail,
        password : 1,
        avatarUrl: randomAvatar(),
        role: 'user',
        createdAt: new Date()
      };
    });

    const result = await usersCol.insertMany(users);
    console.log(`✅ Inserted ${result.insertedCount} users.`);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  } finally {
    await client.close();
  }
}

seedUsers(10); // change the number if needed
