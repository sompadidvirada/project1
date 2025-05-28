/*
  Warnings:

  - You are about to drop the column `avilable` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `avilable`;

-- CreateTable
CREATE TABLE `avilableproduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aviableStatus` BOOLEAN NOT NULL DEFAULT true,
    `updateAt` DATETIME(3) NULL,
    `productId` INTEGER NOT NULL,
    `brachId` INTEGER NOT NULL,

    UNIQUE INDEX `avilableproduct_productId_brachId_key`(`productId`, `brachId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avilableproduct` ADD CONSTRAINT `avilableproduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avilableproduct` ADD CONSTRAINT `avilableproduct_brachId_fkey` FOREIGN KEY (`brachId`) REFERENCES `brach`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
