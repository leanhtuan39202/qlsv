/*
  Warnings:

  - You are about to drop the column `gpa10` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `gpa4` on the `studentinfo` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `term` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificationNumber]` on the table `StudentInfo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `studentId` on table `score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectId` on table `term` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_termId_fkey`;

-- DropForeignKey
ALTER TABLE `term` DROP FOREIGN KEY `Term_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `term` DROP FOREIGN KEY `Term_subjectId_fkey`;

-- AlterTable
ALTER TABLE `score` MODIFY `studentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `studentinfo` DROP COLUMN `gpa10`,
    DROP COLUMN `gpa4`;

-- AlterTable
ALTER TABLE `term` DROP COLUMN `studentId`,
    ADD COLUMN `instructorId` VARCHAR(191) NULL,
    MODIFY `subjectId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_StudentToTerm` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StudentToTerm_AB_unique`(`A`, `B`),
    INDEX `_StudentToTerm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `StudentInfo_identificationNumber_key` ON `StudentInfo`(`identificationNumber`);

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `Term`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToTerm` ADD CONSTRAINT `_StudentToTerm_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToTerm` ADD CONSTRAINT `_StudentToTerm_B_fkey` FOREIGN KEY (`B`) REFERENCES `Term`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
