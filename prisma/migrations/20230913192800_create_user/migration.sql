-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateEnum
CREATE TYPE "Visualize_style" AS ENUM ('List', 'Card');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Dark', 'Light', 'Custom');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banner_img" TEXT,
    "profile_img" TEXT,
    "karma" BIGINT NOT NULL DEFAULT 0,
    "block_list" TEXT[],
    "follow_users" TEXT[],
    "follow_communities" TEXT[],
    "silencied_communities" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_config" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "genre" "Genre",
    "user_links" TEXT[],
    "user_theme" "Theme" NOT NULL DEFAULT 'Light',
    "visualize_style" "Visualize_style" NOT NULL DEFAULT 'Card',
    "open_post_type" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_config_user_id_key" ON "User_config"("user_id");
