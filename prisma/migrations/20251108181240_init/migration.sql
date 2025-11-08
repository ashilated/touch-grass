/*
  Warnings:

  - Added the required column `imageUrl` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "imageUrl" TEXT NOT NULL;
