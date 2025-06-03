/*
  Warnings:

  - A unique constraint covering the columns `[productId,brachId,expAt]` on the table `trackingexp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,brachId,sellAt]` on the table `trackingsell` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,brachId,sendAt]` on the table `trackingsend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `trackingexp_productId_brachId_expAt_key` ON `trackingexp`(`productId`, `brachId`, `expAt`);

-- CreateIndex
CREATE UNIQUE INDEX `trackingsell_productId_brachId_sellAt_key` ON `trackingsell`(`productId`, `brachId`, `sellAt`);

-- CreateIndex
CREATE UNIQUE INDEX `trackingsend_productId_brachId_sendAt_key` ON `trackingsend`(`productId`, `brachId`, `sendAt`);
