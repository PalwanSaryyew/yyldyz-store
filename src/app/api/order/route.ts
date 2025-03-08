import { PaymentMethod } from "@prisma/client";
import { prisma } from "../../../../prisma/prismaSett";
import { cmcApi } from "@/lib/fetchs";
import { toncoinId } from "@/lib/settings";
import { orderScript } from "../../../../bot/bot";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const productId = searchParams.get("pid");
   const userId = searchParams.get("bid");
   const busername = searchParams.get("bsrnm");
   const rusername = searchParams.get("rsrnm");
   const currency = searchParams.get("crrnc");
   const tonPrice = await cmcApi(toncoinId);
   if (!tonPrice) {
      console.error("CMC api error");
      return Response.json({
         success: false,
         message: "CMC api error",
      });
   }

   if (
      productId === "undefined" ||
      userId === "undefined" ||
      busername === "undefined" ||
      rusername === "undefined" ||
      currency === "undefined"
   ) {
      console.error("Wrong Request");
      return Response.json({
         success: false,
         message: "Wrong request",
      });
   } else if (!productId || !userId || !busername || !rusername || !currency) {
      console.error("Wrong Request");
      return Response.json({
         success: false,
         message: "Wrong request",
      });
   }

   const productData = await prisma.star.findUnique({
      where: { id: Number(productId) },
   });

   /* if product not found */
   if (!productData) {
      console.error("Product not found");
      return Response.json({
         success: false,
         message: "Product not found",
      });
   }

   const userData = await prisma.user
      .findUnique({
         where: { id: userId },
      })
      .then(async (resuserData) => {
         /* creating user if it is not exist */
         if (resuserData) {
            return resuserData;
         } else {
            const newUserData = await prisma.user.create({
               data: { id: userId },
            });
            return newUserData;
         }
      });

   if (!userData) {
      console.error("User db error");
      return Response.json({
         success: false,
         message: "User db error",
      });
   }

   const transaction = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
         data: {
            userId: userData.id,
            productId: productData.id,
            status: "pending",
            payment: currency as PaymentMethod,
            receiver: rusername,
         },
      });
      const tontonComment = async () => {
         if (newOrder.payment !== "TON") {
            return null;
         }
         const transactionData = await prisma.tonTransaction.create({
            data: {
               price: Number(
                  (productData.priceUSDT / Number(tonPrice)).toFixed(4)
               ),
               orderId: newOrder.id,
            },
         });
         return transactionData;
      };

      return { orderData: newOrder, tonTransaction: await tontonComment() };
   });

   const botRes = await orderScript(
      Number(userData.id),
      busername,
      transaction.orderData.payment,
      "Ýyldyz",
      productData.amount.toString(),
      transaction.orderData.receiver,
      currency === "TMT"
         ? productData.priceTMT.toString()
         : productData.priceUSDT.toString(),
      transaction.orderData.id
   );
   if (!botRes) {
      console.error("Bot message failed");
      return Response.json({
         success: false,
         message: "Bot message failed",
      });
   }

   if (transaction.orderData.payment === "TON") {
      if (transaction.tonTransaction) {
         return Response.json({
            orderId: transaction.orderData.id,
            success: true,
            tonComment: `${productData.amount} Stars for ${transaction.tonTransaction.price} TON\n\n${transaction.tonTransaction.id}`,
            price: transaction.tonTransaction.price,
         });
      }
      console.error("Transaction db error");
      return Response.json({
         success: false,
         message: "Transaction db error",
      });
   }
   return Response.json({
      success: true,
   });
}
