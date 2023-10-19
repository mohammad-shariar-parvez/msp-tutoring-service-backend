/*
  Warnings:

  - You are about to drop the column `userId` on the `faqs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_userId_fkey";

-- AlterTable
ALTER TABLE "faqs" DROP COLUMN "userId";
