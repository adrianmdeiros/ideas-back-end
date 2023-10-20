/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `color` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `categories_color_key` ON `categories`(`color`);
