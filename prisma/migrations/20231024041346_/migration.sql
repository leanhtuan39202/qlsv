/*
  Warnings:

  - You are about to drop the column `Total` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `gpa` on the `studentinfo` table. All the data in the column will be lost.
  - Added the required column `termId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_subjectId_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `Total`,
    DROP COLUMN `subjectId`,
    ADD COLUMN `ScoreText` VARCHAR(191) NULL,
    ADD COLUMN `Total10` DOUBLE NULL,
    ADD COLUMN `Total4` DOUBLE NULL,
    ADD COLUMN `status` ENUM('STUDYING', 'STOP', 'RESERVE') NULL,
    ADD COLUMN `termId` VARCHAR(191) NOT NULL,
    MODIFY `CC` DOUBLE NULL;

-- AlterTable
ALTER TABLE `studentinfo` DROP COLUMN `gpa`,
    ADD COLUMN `gpa10` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `gpa4` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Term` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `Term`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
