// app/product/sitemap/[id]/route.ts

import User from '@/schema/user';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic'; // Ensures runtime generation

const BASE_URL = process.env.URL || 'https://yourdomain.com';

export default async function sitemap({
  params,
}: {
  params: { id: string };
}): Promise<MetadataRoute.Sitemap> {
  const id = parseInt(params.id, 10);

  const PAGE_SIZE = 50000;
  const skip = id * PAGE_SIZE;

  // Fetch users in this chunk
  const users = await User.find()
    .skip(skip)
    .limit(PAGE_SIZE)
    .select('_id updatedAt');

  return users.map((user) => ({
    url: `${BASE_URL}/user/${user._id}`,
    lastModified: user.updatedAt ?? new Date(),
  }));
}
