/*
  Warnings:

  - You are about to drop the column `instructorId` on the `subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_instructorId_fkey`;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `instructorId`;
