import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

//npx prisma db seed

async function main() {
  console.log(`Start seeding ...`)
  for (let i = 1; i <= 30; i++) {
    await prisma.product.create({ data: { name: `product ${i}` } });
  }

  for (let i = 1; i <= 30; i++) {
    await prisma.affiliateRetailer.create({
      data: {
        affiliateName: `Amazon Affiliate ${i}`,
      }
    })
  }
  for (let i = 1; i < 20; i++) {
    await prisma.merchant.create(
      {
        data: {
          buyUrl: `amazon.com/${i}`,
          price: 299 + i,
          affiliateRetailer: {
            connect: { id: i }  //https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connect
          },
          product: {
            connect: { productId: i }
          }

        }
      }
    );
  }
  /*
  "connect" is used above Vs have to do something like this: 
  await prisma.merchant.update({
    where: {
      id: 1,
    },
    data: {
      affiliateRetailerId: 1,
    }
  }));
  */
  
  // Example of creating a merchant and a product at the sametime
  // "create" also acts like "connect" setting the the productId in the merchant table
  await prisma.merchant.create(
    {
      data: {
        buyUrl: "amazon.com/laptop",
        price: 1000,
        product: { 
          create: { name: 'laptop' } 
        }
      }
    }
  );

  
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })