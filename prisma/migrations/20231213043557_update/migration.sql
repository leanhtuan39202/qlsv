/*
  Warnings:

  - You are about to drop the column `specialized_id` on the `classes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `Classes_specialized_id_fkey`;

-- AlterTable
ALTER TABLE `classes` DROP COLUMN `specialized_id`;
