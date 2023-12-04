/*
  Warnings:

  - The `nationalId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "clinicId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nationalId",
ADD COLUMN     "nationalId" INTEGER;

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "workingHoursStart" TIMESTAMP(3) NOT NULL,
    "workingHoursEnd" TIMESTAMP(3) NOT NULL,
    "bookingDuration" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
