/*
  Warnings:

  - You are about to drop the column `studentInfoId` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `schoolyear_id` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `specialized_id` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `studentInfoId` on the `subject` table. All the data in the column will be lost.
  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `student_id` on table `studentinfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_studentInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `studentinfo` DROP FOREIGN KEY `StudentInfo_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `studentinfo` DROP FOREIGN KEY `StudentInfo_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `studentinfo` DROP FOREIGN KEY `StudentInfo_schoolyear_id_fkey`;

-- DropForeignKey
ALTER TABLE `studentinfo` DROP FOREIGN KEY `StudentInfo_specialized_id_fkey`;

-- DropForeignKey
ALTER TABLE `studentinfo` DROP FOREIGN KEY `StudentInfo_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_studentInfoId_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `studentInfoId`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `class_id` INTEGER NULL,
    ADD COLUMN `department_id` VARCHAR(191) NULL,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL,
    ADD COLUMN `schoolyear_id` INTEGER NULL,
    ADD COLUMN `specialized_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `studentinfo` DROP COLUMN `address`,
    DROP COLUMN `class_id`,
    DROP COLUMN `department_id`,
    DROP COLUMN `fullname`,
    DROP COLUMN `schoolyear_id`,
    DROP COLUMN `specialized_id`,
    MODIFY `student_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `studentInfoId`,
    ADD COLUMN `studentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_schoolyear_id_fkey` FOREIGN KEY (`schoolyear_id`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_specialized_id_fkey` FOREIGN KEY (`specialized_id`) REFERENCES `Specialized`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInfo` ADD CONSTRAINT `StudentInfo_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
