/*
  Warnings:

  - You are about to drop the `tutors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseTutorId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_tutors" DROP CONSTRAINT "course_tutors_courseId_fkey";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "courseTutorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "tutors";

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_courseTutorId_fkey" FOREIGN KEY ("courseTutorId") REFERENCES "course_tutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
