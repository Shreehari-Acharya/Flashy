-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "upiId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
