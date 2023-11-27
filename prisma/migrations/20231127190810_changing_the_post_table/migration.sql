/*
  Warnings:

  - You are about to alter the column `votes` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "votes" SET DATA TYPE INTEGER,
ALTER COLUMN "flags" DROP NOT NULL,
ALTER COLUMN "flags" SET DATA TYPE TEXT;
