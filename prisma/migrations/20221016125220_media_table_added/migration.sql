/*
  Warnings:

  - Added the required column `name` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ad_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "purchase_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
