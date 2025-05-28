-- CreateTable
CREATE TABLE `calendar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `suplyer` VARCHAR(191) NOT NULL,
    `discription` VARCHAR(191) NOT NULL,
    `polink` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `calendar_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `calendar` ADD CONSTRAINT `calendar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
