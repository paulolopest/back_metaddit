/*
  Warnings:

  - You are about to drop the column `banned_user` on the `Community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "banned_user";

-- CreateTable
CREATE TABLE "Community_Banned_Users" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "banner_id" TEXT NOT NULL,

    CONSTRAINT "Community_Banned_Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Community_Banned_Users" ADD CONSTRAINT "Community_Banned_Users_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Banned_Users" ADD CONSTRAINT "Community_Banned_Users_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
