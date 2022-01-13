-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_affiliateRetailerId_fkey";

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "affiliateRetailerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_affiliateRetailerId_fkey" FOREIGN KEY ("affiliateRetailerId") REFERENCES "AffiliateRetailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
