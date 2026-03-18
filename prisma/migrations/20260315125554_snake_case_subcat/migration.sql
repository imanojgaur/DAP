/*
  Warnings:

  - You are about to drop the `PlantSubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlantSubCategory" DROP CONSTRAINT "PlantSubCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "plants" DROP CONSTRAINT "plants_sub_category_id_fkey";

-- DropTable
DROP TABLE "PlantSubCategory";

-- CreateTable
CREATE TABLE "plant_sub_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "plant_sub_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "plant_sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_sub_category" ADD CONSTRAINT "plant_sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "plant_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
