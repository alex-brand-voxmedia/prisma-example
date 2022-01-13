import { PrismaClient, Merchant, Prisma } from '@prisma/client'
import express from 'express';
const app = express()
const port = 3000

//const prisma = new PrismaClient();

// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging
//const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']})
const prisma = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] });


//https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#event-types
prisma.$on('query', (e) => {
  console.log(e)
})


app.get('/', (req, res) => {
  res.send('Hello prisma!')
})

app.get('/test', (req, res) => {

})

app.get('/p', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products);
})

app.get('/m', async (req, res) => {
  //Note: that type Merchant[] is automatically made by Prisma
  const merchants: Merchant[] = await prisma.merchant.findMany({
    include: { product: true }
  });

  // https://www.prisma.io/docs/concepts/components/prisma-client/select-fields
  const merchants2: Merchant[] = await prisma.merchant.findMany({
    include: {
      product: { select: { name: true } }
    }
  })
  res.json(merchants);
})


app.get('/m2', async (req, res) => {
  const merchants = await prisma.merchant.findUnique({
    where: {
      id: 19,
    },
    select: {
      buyUrl: true,
      productId: true,
      affiliateRetailerId: true,
      product: {
        select: {
          name: true,
        },
      },
      affiliateRetailer: {
        select: {
          affiliateName: true
        }
      }
    },
  })
  res.json(merchants);
})

app.get('/ar', async (req, res) => {
  const ar = await prisma.affiliateRetailer.findMany()
  res.json(ar);
})

app.get('/raw', async (req, res) => {
  // Proof that ::json works
  // https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw
  // https://developer.mozilla.org/en-US/docs/web/javascript/reference/template_literals#tagged_templates
  const jsonTest = await prisma.$queryRaw`select '[1,2,3]'::json`
  res.json(jsonTest);
})

app.listen(port, () => {
  console.log(`app listening http://localhost:${port}`)
})