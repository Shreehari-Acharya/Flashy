import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, password: true, email: true, upiId: true, name: true }, // Include hashed password if needed
    });

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}