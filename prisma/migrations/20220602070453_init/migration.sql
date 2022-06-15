-- CreateTable
CREATE TABLE `Invite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `vientCeremonie` BOOLEAN NOT NULL,
    `vientVinDHonneur` BOOLEAN NOT NULL,
    `vientRepas` BOOLEAN NOT NULL,
    `repasId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repas` (
    `id` INTEGER NOT NULL,
    `libele` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_repasId_fkey` FOREIGN KEY (`repasId`) REFERENCES `Repas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
