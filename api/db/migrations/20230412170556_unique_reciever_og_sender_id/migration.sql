/*
  Warnings:

  - A unique constraint covering the columns `[recieverId,senderId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_recieverId_senderId_key" ON "FriendRequest"("recieverId", "senderId");
