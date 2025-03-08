import { Bot } from "grammy";

import { InlineKeyboard } from "grammy";

import { prisma } from "../prisma/prismaSett";
export const bot = new Bot(process.env.BOT_TOKEN || "");

// scripts

const palwan = Number(process.env.PALWAN_ID) || 0;
const hajy = Number(process.env.HAJY_ID) || 0;

export async function orderScript(
   buyerId: number,
   buyer: string,
   currency: string,
   product: string,
   amount: string,
   receiver: string,
   total: string,
   orderId: number
) {
   const userIds = [palwan, hajy];
   const adminMessage = `${product} \n Sany: ${amount} \n <a href="tg://user?id=${buyerId}">Kimden:</a> @${buyer} \n Kime: <code>${receiver}</code> \n Jemi töleg: <b>${total} ${currency}</b>`;

   const clientMessage2 = `<b>Sargydyňyzy admin kabul edeninden soň töleg maglumatlary size ugradylar. Haýyş garaşyň</b>⌛`;
   const clientMessage = `${clientMessage2} \n <blockquote expandable>${adminMessage}</blockquote>`;
   try {
      //"Sargyt kabul edilyanca garasyn 📨";
      const adminInfos = await prisma.admin.findMany();
      const getKeyboard = async (chatId: number) => {
         const adminInfo = adminInfos.find(
            (admin) => admin.tgId === chatId.toString()
         );
         if (!adminInfo) {
            return undefined;
         }
         const { numbers } = adminInfo;
         const acceptOrderKeyboard = new InlineKeyboard();
         if (currency === "TMT") {
            numbers.forEach((i) => {
               acceptOrderKeyboard
                  .text(`${i}`, `accept_order_${orderId}_${i}_${currency}`)
                  .row();
            });
         } else {
            acceptOrderKeyboard
               .text(
                  `${adminInfo.binanceId}`,
                  `accept_order_${orderId}_${adminInfo.binanceId}_${currency}`
               )
               .row();
         }
         acceptOrderKeyboard.copyText(receiver, receiver).row();
         return acceptOrderKeyboard;
      };
      if (currency === "TON") {
         return true;
      } else {
         const messageIds: number[] = [];
         await bot.api
            .sendMessage(userIds[0], adminMessage, {
               reply_markup: await getKeyboard(userIds[0]),
               parse_mode: "HTML",
            })
            .then((data) => messageIds.push(data.message_id));
         await bot.api
            .sendMessage(userIds[1], adminMessage, {
               reply_markup: await getKeyboard(userIds[1]),
               parse_mode: "HTML",
            })
            .then((data) => messageIds.push(data.message_id));
         await bot.api.sendMessage(buyerId, clientMessage, {
            parse_mode: "HTML",
         });

         console.log(messageIds);
         await prisma.order.update({
            where: {
               id: orderId,
            },
            data: {
               mssgIds: messageIds,
            },
         });
         return true;
      }
   } catch (error) {
      console.error(`SMS gitmedi: ${error}`);
      return false;
   }
}
export async function trnsctnScript(id: number, message: string) {
   await bot.api.sendMessage(id, message);
}
