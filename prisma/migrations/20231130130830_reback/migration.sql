/*
  Warnings:

  - You are about to drop the `SubjectCourseTutor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectCourseTutor" DROP CONSTRAINT "SubjectCourseTutor_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectCourseTutor" DROP CONSTRAINT "SubjectCourseTutor_tutorId_fkey";

-- DropTable
DROP TABLE "SubjectCourseTutor";

-- AddForeignKey
ALTER TABLE "courseTutors" ADD CONSTRAINT "courseTutors_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
