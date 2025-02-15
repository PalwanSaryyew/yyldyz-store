import { cmcApi } from "@/lib/fetchs";
import { prisma } from "../../../../prisma/prismaSett";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const productId = searchParams.get("id");
   const userId = searchParams.get("user");
   console.log(userId);

   const product = await prisma.star.findUnique({
      where: { id: Number(productId) },
   });
   const tonPrice = await cmcApi();
   if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
   }
   const price = (product.priceUSDT / tonPrice).toFixed(4);

   const transaction = await prisma.$transaction(async (prisma) => {
      const whichUser = await prisma.user.upsert({
         where: { id: userId?.toString() || "" },
         update: { id: userId?.toString() || "" },
         create: { id: userId?.toString() || "" },
      });
      const newOrder = await prisma.order.create({
         data: {
            userId: whichUser ? whichUser.id : "",
            productId: product?.id || 0,
            status: "pending",
            payment: "TON",
         },
      });

      const newTonTransaction = await prisma.tonTransaction.create({
         data: {
            price: Number(price),
            orderId: newOrder.id,
         },
      });

      return { order: newOrder, tonTransaction: newTonTransaction };
   });
   const tonComment = `${product?.amount} Stars for ${price} TON\n\n${transaction.tonTransaction.id}`;

   return Response.json({ price, tonComment, userId });
}
