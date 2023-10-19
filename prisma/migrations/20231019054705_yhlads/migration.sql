/*
  Warnings:

  - You are about to drop the `course_tutors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_courseTutorId_fkey";

-- DropTable
DROP TABLE "course_tutors";

-- CreateTable
CREATE TABLE "courseTutors" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "experience" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "courseTutors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_courseTutorId_fkey" FOREIGN KEY ("courseTutorId") REFERENCES "courseTutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
