/*
  Warnings:

  - The `flags` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "nsfw" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "flags",
ADD COLUMN     "flags" JSONB;
