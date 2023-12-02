/*
  Warnings:

  - Made the column `nationalId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "fees" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'PATIENT',
ALTER COLUMN "nationalId" SET NOT NULL;
