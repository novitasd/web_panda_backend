/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubigeo` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" VARCHAR(250) NOT NULL,
ADD COLUMN     "customerLastName" VARCHAR(100) NOT NULL,
ADD COLUMN     "customerName" VARCHAR(100) NOT NULL,
ADD COLUMN     "customerPhone" VARCHAR(20) NOT NULL,
ADD COLUMN     "department" VARCHAR(100) NOT NULL,
ADD COLUMN     "district" VARCHAR(100) NOT NULL,
ADD COLUMN     "province" VARCHAR(100) NOT NULL,
ADD COLUMN     "reference" VARCHAR(250),
ADD COLUMN     "shippingName" VARCHAR(100) NOT NULL,
ADD COLUMN     "shippingPaymentAtDestination" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shippingPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "shippingType" VARCHAR(30) NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "ubigeo" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
