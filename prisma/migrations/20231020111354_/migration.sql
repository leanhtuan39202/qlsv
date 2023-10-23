/*
  Warnings:

  - A unique constraint covering the columns `[classesId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `Classes_instructorId_fkey`;

-- AlterTable
ALTER TABLE `instructor` ADD COLUMN `classesId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Instructor_classesId_key` ON `Instructor`(`classesId`);

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `Classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
