/*
  Warnings:

  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_studenttosubject` DROP FOREIGN KEY `_StudentToSubject_B_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_subjectId_fkey`;

-- AlterTable
ALTER TABLE `_studenttosubject` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `score` MODIFY `subjectId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `subject` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToSubject` ADD CONSTRAINT `_StudentToSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
