/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Instructor_phone_key` ON `Instructor`(`phone`);
