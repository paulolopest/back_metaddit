/*
  Warnings:

  - You are about to drop the column `silencied_communities` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "silencied_communities",
ADD COLUMN     "silenced_communities" TEXT[];
