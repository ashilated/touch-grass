/*
  Warnings:

  - The values [US,ITALY,GERMANY,UK,MONGOLIA] on the enum `PlantRegion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlantRegion_new" AS ENUM ('CHINA', 'USA', 'CANADA', 'FRANCE', 'JAPAN', 'AUSTRALIA', 'SOUTH_AFRICA', 'MEXICO', 'INDIA', 'BRAZIL');
ALTER TABLE "Plant" ALTER COLUMN "plantRegion" TYPE "PlantRegion_new" USING ("plantRegion"::text::"PlantRegion_new");
ALTER TYPE "PlantRegion" RENAME TO "PlantRegion_old";
ALTER TYPE "PlantRegion_new" RENAME TO "PlantRegion";
DROP TYPE "public"."PlantRegion_old";
COMMIT;
