/*
  Warnings:

  - You are about to drop the column `mods_id` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `block_list` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `favorites_communities` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `follow_communities` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `follow_users` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `silenced_communities` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "mods_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "block_list",
DROP COLUMN "favorites_communities",
DROP COLUMN "follow_communities",
DROP COLUMN "follow_users",
DROP COLUMN "silenced_communities";

-- CreateTable
CREATE TABLE "User_Community_Follow" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Community_Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Friends" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "followed_user" TEXT NOT NULL,

    CONSTRAINT "User_Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Blockeds" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "blocked_user" TEXT NOT NULL,

    CONSTRAINT "User_Blockeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Favorites_Communities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,

    CONSTRAINT "User_Favorites_Communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Silenced_Communities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,

    CONSTRAINT "User_Silenced_Communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community_Mods" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Community_Mods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Community_Follow" ADD CONSTRAINT "User_Community_Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Community_Follow" ADD CONSTRAINT "User_Community_Follow_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Friends" ADD CONSTRAINT "User_Friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Blockeds" ADD CONSTRAINT "User_Blockeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Favorites_Communities" ADD CONSTRAINT "User_Favorites_Communities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Favorites_Communities" ADD CONSTRAINT "User_Favorites_Communities_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Silenced_Communities" ADD CONSTRAINT "User_Silenced_Communities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Silenced_Communities" ADD CONSTRAINT "User_Silenced_Communities_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Mods" ADD CONSTRAINT "Community_Mods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Mods" ADD CONSTRAINT "Community_Mods_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
