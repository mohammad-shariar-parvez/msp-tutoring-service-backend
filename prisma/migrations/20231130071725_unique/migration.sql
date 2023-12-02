/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subjects_title_key" ON "subjects"("title");
