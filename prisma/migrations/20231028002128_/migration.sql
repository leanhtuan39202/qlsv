/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `instructor` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Instructor_user_id_key` ON `Instructor`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_user_id_key` ON `Student`(`user_id`);

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
