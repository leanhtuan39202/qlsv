/*
  Warnings:

  - You are about to alter the column `ScoreText` on the `score` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `score` MODIFY `ScoreText` ENUM('A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NULL;
