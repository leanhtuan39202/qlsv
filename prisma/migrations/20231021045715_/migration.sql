/*
  Warnings:

  - A unique constraint covering the columns `[instructorId]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Classes_instructorId_key` ON `Classes`(`instructorId`);
