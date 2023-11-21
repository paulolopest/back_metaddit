/*
  Warnings:

  - Added the required column `community_name` to the `Community_Mods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Community_Mods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `community_name` to the `User_Favorites_Communities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User_Favorites_Communities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community_Mods" ADD COLUMN     "community_name" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Favorites_Communities" ADD COLUMN     "community_name" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;
