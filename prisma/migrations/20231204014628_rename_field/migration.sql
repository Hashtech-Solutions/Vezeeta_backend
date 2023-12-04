/*
  Warnings:

  - You are about to drop the column `city` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "city",
ADD COLUMN     "workplace" TEXT;
