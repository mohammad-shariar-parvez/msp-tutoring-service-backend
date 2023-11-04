/*
  Warnings:

  - Added the required column `location` to the `courseTutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courseTutors" ADD COLUMN     "location" TEXT NOT NULL;
