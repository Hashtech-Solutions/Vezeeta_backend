/*
  Warnings:

  - A unique constraint covering the columns `[clinicId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Doctor_clinicId_key" ON "Doctor"("clinicId");
