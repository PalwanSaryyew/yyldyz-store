import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
   // Seed prem
   await prisma.product.createMany({
      data: [
         /* {
            id: 1,
            month: "1",
            priceTMT: 15,
            priceUSDT: 0.75,
         }, */
         {
            name: "tgprem",
            amount: 3,
            priceTMT: 250,
            priceUSDT: 12.5,
         },
         {
            name: "tgprem",
            amount: 6,
            priceTMT: 330,
            priceUSDT: 16.5,
         },
         {
            name: "tgprem",
            amount: 12,
            priceTMT: 590,
            priceUSDT: 29.5,
         },
         /* tg star */
         {
            name: "tgstar",
            amount: 50,
            priceTMT: 15,
            priceUSDT: 0.75,
         },
         {
            name: "tgstar",
            amount: 75,
            priceTMT: 20,
            priceUSDT: 1.13,
         },
         {
            name: "tgstar",
            amount: 100,
            priceTMT: 30,
            priceUSDT: 1.5,
         },
         {
            name: "tgstar",
            amount: 150,
            priceTMT: 45,
            priceUSDT: 2.25,
         },
         {
            name: "tgstar",
            amount: 250,
            priceTMT: 75,
            priceUSDT: 3.75,
         },
         {
            name: "tgstar",
            amount: 350,
            priceTMT: 125,
            priceUSDT: 5.25,
         },
         {
            name: "tgstar",
            amount: 500,
            priceTMT: 150,
            priceUSDT: 7.5,
         },
         {
            name: "tgstar",
            amount: 750,
            priceTMT: 225,
            priceUSDT: 11.25,
         },
         {
            name: "tgstar",
            amount: 1000,
            priceTMT: 300,
            priceUSDT: 15,
         },
         {
            name: "tgstar",
            amount: 1500,
            priceTMT: 410,
            priceUSDT: 22.5,
         },
         {
            name: "tgstar",
            amount: 2500,
            priceTMT: 650,
            priceUSDT: 37.5,
         },
         {
            name: "tgstar",
            amount: 5000,
            priceTMT: 1300,
            priceUSDT: 75,
         },
         {
            name: "tgstar",
            amount: 10000,
            priceTMT: 3000,
            priceUSDT: 150,
         },
      ],
   });

   // Seed admins
   await prisma.admin.createMany({
      data: [
         {
            tgId: "5065229463",
            nickName: "Emeki",
            numbers: [63529433, 63483220],
            binanceId: 888420755,
            tonWallet: "UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO",
         },
         {
            tgId: "6860526719",
            nickName: "Hajy",
            numbers: [62437244],
            binanceId: 162371181,
            tonWallet: "UQDi3J28_M_iFFZ9IiukdK7adLkY5SXiMUgWFMFZNAktkDsO",
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
