-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "nsfw" DROP NOT NULL,
ALTER COLUMN "nsfw" SET DEFAULT false;
