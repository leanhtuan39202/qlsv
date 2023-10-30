/*
  Warnings:

  - You are about to drop the `_studenttoterm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_studenttoterm` DROP FOREIGN KEY `_StudentToTerm_A_fkey`;

-- DropForeignKey
ALTER TABLE `_studenttoterm` DROP FOREIGN KEY `_StudentToTerm_B_fkey`;

-- DropTable
DROP TABLE `_studenttoterm`;

-- CreateTable
CREATE TABLE `Enrollment` (
    `studentId` VARCHAR(191) NOT NULL,
    `tearmId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`studentId`, `tearmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_tearmId_fkey` FOREIGN KEY (`tearmId`) REFERENCES `Term`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
