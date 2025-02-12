import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
   // delete users
   await prisma.user.deleteMany();

   // delete stars
   await prisma.star.deleteMany();

   console.log("Deleting completed successfully!");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
