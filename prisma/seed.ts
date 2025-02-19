import { PrismaClient } from "@prisma/client";
const palwan = process.env.PALWAN_ID || "0";
const hajy = process.env.HAJY_ID || "1";

const prisma = new PrismaClient();
async function main() {
   // Seed stars
   await prisma.star.createMany({
      data: [
         {
            id: 1,
            amount: 50,
            priceTMT: 15,
            priceUSDT: 0.75,
         },
         {
            id: 2,
            amount: 75,
            priceTMT: 20,
            priceUSDT: 1.13,
         },
         {
            id: 3,
            amount: 100,
            priceTMT: 30,
            priceUSDT: 1.5,
         },
         {
            id: 4,
            amount: 150,
            priceTMT: 45,
            priceUSDT: 2.25,
         },
         {
            id: 5,
            amount: 250,
            priceTMT: 75,
            priceUSDT: 3.75,
         },
         {
            id: 6,
            amount: 350,
            priceTMT: 125,
            priceUSDT: 5.25,
         },
         {
            id: 7,
            amount: 500,
            priceTMT: 150,
            priceUSDT: 7.5,
         },
         {
            id: 8,
            amount: 750,
            priceTMT: 225,
            priceUSDT: 11.25,
         },
         {
            id: 9,
            amount: 1000,
            priceTMT: 300,
            priceUSDT: 15,
         },
         {
            id: 10,
            amount: 1500,
            priceTMT: 410,
            priceUSDT: 22.5,
         },
         {
            id: 11,
            amount: 2500,
            priceTMT: 650,
            priceUSDT: 37.5,
         },
         {
            id: 12,
            amount: 5000,
            priceTMT: 1300,
            priceUSDT: 75,
         },
         {
            id: 13,
            amount: 10000,
            priceTMT: 3000,
            priceUSDT: 150,
         },
      ],
   });

   // Seed admins
   await prisma.user.createMany({
      data: [
         {
            id: palwan.toString(),
            role: "admin",
         },
         {
            id: hajy.toString(),
            role: "admin",
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
