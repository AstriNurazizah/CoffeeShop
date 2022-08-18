/*
  Warnings:

  - You are about to drop the `kopi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `kopi`;

-- CreateTable
CREATE TABLE `jeniskopi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `rasa` VARCHAR(191) NULL,
    `origin` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
