-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_community_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
