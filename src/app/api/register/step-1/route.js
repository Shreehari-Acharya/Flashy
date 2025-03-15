import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return Response.json({ error: 'Username and password are required' }, { status: 400 });
    }
    // Create user
    const user = await prisma.user.create({
      data: { name, email },
    });

    return Response.json({ message: 'User created successfully', user: { id: user.id, name: user.name } }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}