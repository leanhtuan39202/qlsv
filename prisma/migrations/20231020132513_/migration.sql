/*
  Warnings:

  - The primary key for the `classes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `instructor` DROP FOREIGN KEY `Instructor_classesId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_class_id_fkey`;

-- DropIndex
DROP INDEX `Classes_instructorId_fkey` ON `classes`;

-- AlterTable
ALTER TABLE `classes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `instructor` MODIFY `classesId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `class_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_classesId_fkey` FOREIGN KEY (`classesId`) REFERENCES `Classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
