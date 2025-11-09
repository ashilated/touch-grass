/*
  Warnings:

  - You are about to drop the column `gardenId` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `plantRegion` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlantRegion" AS ENUM ('CHINA', 'US', 'CANADA', 'FRANCE', 'ITALY', 'GERMANY', 'UK', 'MEXICO', 'MONGOLIA', 'BRAZIL');

-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_gardenId_fkey";

-- DropIndex
DROP INDEX "Plant_gardenId_key";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "gardenId",
DROP COLUMN "pos",
DROP COLUMN "type",
ADD COLUMN     "plantRegion" "PlantRegion" NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "location" "PlantRegion" NOT NULL;

-- CreateTable
CREATE TABLE "_GardenPlants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GardenPlants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GardenPlants_B_index" ON "_GardenPlants"("B");

-- AddForeignKey
ALTER TABLE "_GardenPlants" ADD CONSTRAINT "_GardenPlants_A_fkey" FOREIGN KEY ("A") REFERENCES "Garden"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GardenPlants" ADD CONSTRAINT "_GardenPlants_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
