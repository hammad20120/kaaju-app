-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_ad_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_purchase_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_review_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_user_id_fkey";

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "ad_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "purchase_id" DROP NOT NULL,
ALTER COLUMN "review_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "Ad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
