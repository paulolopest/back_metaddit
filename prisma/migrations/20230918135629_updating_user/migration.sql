/*
  Warnings:

  - You are about to alter the column `karma` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favorites_communities" TEXT[],
ALTER COLUMN "karma" SET DATA TYPE INTEGER;
