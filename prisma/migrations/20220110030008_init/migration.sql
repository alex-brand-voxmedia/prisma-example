-- CreateTable
CREATE TABLE "Product" (
    "productId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "buyUrl" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "affiliateRetailerId" INTEGER NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateRetailer" (
    "id" SERIAL NOT NULL,
    "affiliateName" TEXT NOT NULL,

    CONSTRAINT "AffiliateRetailer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_affiliateRetailerId_fkey" FOREIGN KEY ("affiliateRetailerId") REFERENCES "AffiliateRetailer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
