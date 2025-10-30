// app/api/test-clerk/route.js
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(req) {
  const users = await clerkClient.users.getUserList({ limit: 1 });
  return new Response(JSON.stringify(users), { status: 200 });
}
