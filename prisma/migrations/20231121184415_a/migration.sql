-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateEnum
CREATE TYPE "Visualize_style" AS ENUM ('List', 'Card');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Dark', 'Light', 'Custom');

-- CreateEnum
CREATE TYPE "Community_type" AS ENUM ('Private', 'Public');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banner_img" TEXT,
    "profile_img" TEXT,
    "karma" INTEGER NOT NULL DEFAULT 0,

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

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "banner_img" TEXT,
    "profile_img" TEXT,
    "language" TEXT,
    "country" TEXT,
    "type" "Community_type" NOT NULL,
    "primary_topic" TEXT,
    "topics" TEXT[],
    "nsfw" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rules" JSONB[],

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community_style" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "member_name" TEXT,
    "post_name" TEXT,
    "theme_color" TEXT,
    "body_color" TEXT,
    "post_title_color" TEXT,
    "post_background_color" TEXT,

    CONSTRAINT "Community_style_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "votes" BIGINT NOT NULL DEFAULT 0,
    "spoiler" BOOLEAN NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "votes" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_Replie" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "votes" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Comment_Replie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Community_Follow" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "community_name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Community_Banned_Users" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "banner_id" TEXT NOT NULL,

    CONSTRAINT "Community_Banned_Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_config_user_id_key" ON "User_config"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Community_style_community_id_key" ON "Community_style"("community_id");

-- AddForeignKey
ALTER TABLE "User_config" ADD CONSTRAINT "User_config_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_style" ADD CONSTRAINT "Community_style_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Replie" ADD CONSTRAINT "Comment_Replie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Replie" ADD CONSTRAINT "Comment_Replie_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Community_Banned_Users" ADD CONSTRAINT "Community_Banned_Users_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community_Banned_Users" ADD CONSTRAINT "Community_Banned_Users_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
