import { PaymentMethod } from "@prisma/client";
import { prisma } from "../../../../prisma/prismaSett";
import { orderScript } from "../../../../bot/scripts";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const productId = searchParams.get("pid");
   const userId = searchParams.get("bid");
   const busername = searchParams.get("bsrnm");
   const rusername = searchParams.get("rsrnm");
   const currency = searchParams.get("crrnc");

   const product = await prisma.star
      .findUnique({
         where: { id: Number(productId) },
      })
      .catch((error) => {
         console.log(error);
         return Response.json({ success: false, error });
      });

   const transaction = await prisma.$transaction(async (prisma) => {
      const whichUser = await prisma.user.upsert({
         where: { id: userId?.toString() || "" },
         update: { id: userId?.toString() || "" },
         create: { id: userId?.toString() || "" },
      });
      const newOrder = await prisma.order
         .create({
            data: {
               userId: whichUser ? whichUser.id : "",
               productId:
                  product && !(product instanceof Response) ? product.id : 0,
               status: "pending",
               payment: currency as PaymentMethod,
            },
         })
         .catch((error) => {
            console.log(error);
            return Response.json({ success: false, error });
         });

      return { order: newOrder, user: whichUser };
   });
   const botMess = await orderScript(
      transaction.user.id,
      busername?.toString() || "",
      currency || "",
      "Ýyldyz",
      product && !(product instanceof Response)
         ? product.amount.toString()
         : "0",
      rusername?.toString() || "",
      currency === "TMT"
         ? product && !(product instanceof Response)
            ? product.priceTMT.toString()
            : "0"
         : product && !(product instanceof Response)
         ? product.priceUSDT.toString()
         : "0"
   );

   if (!botMess)  return Response.json({ success: false });
   return Response.json({ success: true });
}
