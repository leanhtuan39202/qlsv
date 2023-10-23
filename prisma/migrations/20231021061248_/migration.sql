/*
  Warnings:

  - You are about to drop the column `classesId` on the `instructor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Instructor_classesId_key` ON `instructor`;

-- AlterTable
ALTER TABLE `instructor` DROP COLUMN `classesId`;
