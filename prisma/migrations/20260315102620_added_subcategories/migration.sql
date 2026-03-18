/*
  Warnings:

  - You are about to drop the column `category_id` on the `plants` table. All the data in the column will be lost.
  - Added the required column `sub_category_id` to the `plants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "plants" DROP CONSTRAINT "plants_category_id_fkey";

-- AlterTable
ALTER TABLE "plants" DROP COLUMN "category_id",
ADD COLUMN     "sub_category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlantSubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "PlantSubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "PlantSubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantSubCategory" ADD CONSTRAINT "PlantSubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "plant_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
