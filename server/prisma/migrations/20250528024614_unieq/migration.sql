/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `avilableproduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `avilableproduct_id_key` ON `avilableproduct`(`id`);
