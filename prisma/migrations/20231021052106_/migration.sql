-- DropForeignKey
ALTER TABLE `instructor` DROP FOREIGN KEY `Instructor_classesId_fkey`;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
