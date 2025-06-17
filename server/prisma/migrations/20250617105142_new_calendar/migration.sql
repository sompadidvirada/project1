/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `trackingexp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `trackingsend` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `calendar` ADD COLUMN `isSuccess` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `trackingexp_id_key` ON `trackingexp`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `trackingsend_id_key` ON `trackingsend`(`id`);
