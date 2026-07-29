-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" VARCHAR(250),
ADD COLUMN     "customerEmail" VARCHAR(150),
ADD COLUMN     "customerName" VARCHAR(150),
ADD COLUMN     "customerPhone" VARCHAR(30),
ADD COLUMN     "department" VARCHAR(100),
ADD COLUMN     "district" VARCHAR(100),
ADD COLUMN     "province" VARCHAR(100),
ADD COLUMN     "reference" VARCHAR(250);

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_customerEmail_idx" ON "Order"("customerEmail");
