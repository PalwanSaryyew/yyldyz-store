import { cmcApi } from "@/lib/fetchs";
import { prisma } from "../../../../prisma/prismaSett";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = searchParams.get("id");

   const user = searchParams.get("user");
   const product = await prisma.star.findUnique({ where: { id: Number(id) } });
   const tonPrice = await cmcApi();
   if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
   }
   const price = (product.priceUSDT / tonPrice).toFixed(4);


   const transaction = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
         data: {
            userId: 6, // change
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

   return Response.json({ price, tonComment, user });
}
