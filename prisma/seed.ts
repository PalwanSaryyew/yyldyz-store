import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
   // Seed users
   await prisma.user.deleteMany()
   await prisma.user.createMany({
      data: [
         {
            username: "admin",
            name: "Admin User",
            role: "admin",
         },
         {
            username: "client",
            name: "Client User",
            role: "client",
         },
      ],
   });

   // Seed stars
   await prisma.star.deleteMany()
   await prisma.star.createMany({
      data: [
         {
            id: 1,
            amount: 50,
            priceTMT: 15, 
            priceUSDT: 0.75
         },
         {
            id: 2,
            amount: 75,
            priceTMT: 20, 
            priceUSDT: 1.13
         },
         {
            id: 3,
            amount: 100,
            priceTMT: 30,
            priceUSDT:  1.5
         },
         {
            id: 4,
            amount: 150,
            priceTMT: 45, 
            priceUSDT: 2.25
         },
         {
            id: 5,
            amount: 250,
            priceTMT: 75, 
            priceUSDT: 3.75
         },
         {
            id: 6,
            amount: 350,
            priceTMT: 125, 
            priceUSDT: 5.25
         },
         {
            id: 7,
            amount: 500,
            priceTMT: 150,
            priceUSDT:  7.5
         },
         {
            id: 8,
            amount: 750,
            priceTMT: 225, 
            priceUSDT: 11.25
         },
      ],
   });

   console.log("Seeding completed successfully!");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
