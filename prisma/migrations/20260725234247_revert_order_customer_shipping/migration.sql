/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_createdAt_idx";

-- DropIndex
DROP INDEX "Order_customerEmail_idx";

-- DropIndex
DROP INDEX "Order_status_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
DROP COLUMN "department",
DROP COLUMN "district",
DROP COLUMN "province",
DROP COLUMN "reference";
