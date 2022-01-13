-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_productId_fkey";

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
