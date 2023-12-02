-- DropForeignKey
ALTER TABLE "courseTutors" DROP CONSTRAINT "courseTutors_subjectId_fkey";

-- CreateTable
CREATE TABLE "course_faculties" (
    "courseTutorId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "course_faculties_pkey" PRIMARY KEY ("courseTutorId","subjectId")
);

-- AddForeignKey
ALTER TABLE "course_faculties" ADD CONSTRAINT "course_faculties_courseTutorId_fkey" FOREIGN KEY ("courseTutorId") REFERENCES "courseTutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculties" ADD CONSTRAINT "course_faculties_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
