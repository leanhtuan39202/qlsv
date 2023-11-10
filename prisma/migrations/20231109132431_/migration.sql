/*
  Warnings:

  - Added the required column `status` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `term` ADD COLUMN `status` ENUM('OPEN', 'CLOSED') NOT NULL;
