/*
  Warnings:

  - You are about to drop the column `clinicId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Clinic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_clinicId_fkey";

-- DropIndex
DROP INDEX "Doctor_clinicId_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "clinicId",
ADD COLUMN     "bookingDuration" DOUBLE PRECISION,
ADD COLUMN     "workingHoursEnd" TEXT,
ADD COLUMN     "workingHoursStart" TEXT;

-- DropTable
DROP TABLE "Clinic";
