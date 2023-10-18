/*
  Warnings:

  - You are about to drop the column `address` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `student` table. All the data in the column will be lost.
  - Added the required column `address` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_department_id_fkey`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `address`,
    DROP COLUMN `department_id`,
    DROP COLUMN `fullname`;

-- AlterTable
ALTER TABLE `studentinfo` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `department_id` VARCHAR(191) NULL,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StudentInfo` ADD CONSTRAINT `StudentInfo_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
