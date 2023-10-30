/*
  Warnings:

  - The primary key for the `enrollment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tearmId` on the `enrollment` table. All the data in the column will be lost.
  - Added the required column `termId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_tearmId_fkey`;

-- AlterTable
ALTER TABLE `enrollment` DROP PRIMARY KEY,
    DROP COLUMN `tearmId`,
    ADD COLUMN `termId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`studentId`, `termId`);

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `Term`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
