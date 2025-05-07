-- DropForeignKey
ALTER TABLE `trackingexp` DROP FOREIGN KEY `trackingexp_productId_fkey`;

-- DropForeignKey
ALTER TABLE `trackingsell` DROP FOREIGN KEY `trackingsell_productId_fkey`;

-- DropForeignKey
ALTER TABLE `trackingsend` DROP FOREIGN KEY `trackingsend_productId_fkey`;

-- DropIndex
DROP INDEX `trackingexp_productId_fkey` ON `trackingexp`;

-- DropIndex
DROP INDEX `trackingsell_productId_fkey` ON `trackingsell`;

-- DropIndex
DROP INDEX `trackingsend_productId_fkey` ON `trackingsend`;

-- AddForeignKey
ALTER TABLE `trackingsell` ADD CONSTRAINT `trackingsell_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trackingsend` ADD CONSTRAINT `trackingsend_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trackingexp` ADD CONSTRAINT `trackingexp_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
