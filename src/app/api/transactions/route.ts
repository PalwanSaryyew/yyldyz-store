import { cmcApi } from "@/lib/fetchs";
import { prisma } from "../../../../prisma/prismaSett";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const id = searchParams.get("id");
   
   const user = searchParams.get("user");
   const product = await prisma.star.findUnique({ where: { id: Number(id) } });
   const tonPrice = await cmcApi();
   const price =
      product && product.priceUSDT ? (product.priceUSDT / tonPrice).toFixed(4): undefined;
   const tonComment = `${product?.amount} stars for ${price} TON`;

   return Response.json({ price, tonComment, user });
}
