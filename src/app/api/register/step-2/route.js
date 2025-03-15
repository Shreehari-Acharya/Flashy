import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, userId } = body;

    if (!username || !password || !userId ) {
      return Response.json({ error: 'Username , password, id are required' }, { status: 400 });
    }


    // Find user by ID
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { username, password },
    });

    return Response.json({ updatedUser }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
