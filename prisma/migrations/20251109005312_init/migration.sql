/*
  Warnings:

  - The primary key for the `Garden` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Plant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_GardenPlants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `location` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Garden" DROP CONSTRAINT "Garden_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_GardenPlants" DROP CONSTRAINT "_GardenPlants_A_fkey";

-- DropForeignKey
ALTER TABLE "_GardenPlants" DROP CONSTRAINT "_GardenPlants_B_fkey";

-- AlterTable
ALTER TABLE "Garden" DROP CONSTRAINT "Garden_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Garden_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Garden_id_seq";

-- AlterTable
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Plant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Plant_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_GardenPlants" DROP CONSTRAINT "_GardenPlants_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_GardenPlants_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GardenPlants" ADD CONSTRAINT "_GardenPlants_A_fkey" FOREIGN KEY ("A") REFERENCES "Garden"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GardenPlants" ADD CONSTRAINT "_GardenPlants_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
