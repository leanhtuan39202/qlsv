/*
  Warnings:

  - The values [STUDYING,STOP,RESERVE] on the enum `Score_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_studenttosubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_studenttosubject` DROP FOREIGN KEY `_StudentToSubject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_studenttosubject` DROP FOREIGN KEY `_StudentToSubject_B_fkey`;

-- AlterTable
ALTER TABLE `score` MODIFY `status` ENUM('PASSED', 'FAILED') NULL;

-- AlterTable
ALTER TABLE `term` ADD COLUMN `studentId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_studenttosubject`;

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
