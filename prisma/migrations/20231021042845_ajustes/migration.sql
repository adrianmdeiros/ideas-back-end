-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_userId_fkey`;

-- RenameIndex
ALTER TABLE `projects` RENAME INDEX `projects_categoryId_fkey` TO `projects_categoryId_idx`;

-- RenameIndex
ALTER TABLE `projects` RENAME INDEX `projects_userId_fkey` TO `projects_userId_idx`;
