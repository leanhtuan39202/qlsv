-- DropIndex
DROP INDEX `Instructor_phone_key` ON `instructor`;

-- AlterTable
ALTER TABLE `classes` ADD COLUMN `specialized_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_specialized_id_fkey` FOREIGN KEY (`specialized_id`) REFERENCES `Specialized`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
