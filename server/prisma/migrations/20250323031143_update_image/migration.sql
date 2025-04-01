/*
  Warnings:

  - You are about to drop the `imageuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_imageUserId_fkey`;

-- DropIndex
DROP INDEX `User_imageUserId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `imageuser`;
