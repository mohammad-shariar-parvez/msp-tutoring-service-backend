-- DropForeignKey
ALTER TABLE "courseTutors" DROP CONSTRAINT "courseTutors_subjectId_fkey";

-- CreateTable
CREATE TABLE "SubjectCourseTutor" (
    "subjectId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectCourseTutor_pkey" PRIMARY KEY ("subjectId","tutorId")
);

-- AddForeignKey
ALTER TABLE "SubjectCourseTutor" ADD CONSTRAINT "SubjectCourseTutor_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectCourseTutor" ADD CONSTRAINT "SubjectCourseTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "courseTutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
