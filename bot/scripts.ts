import { bot } from "./bot";
const palwan = process.env.PALWAN_ID || 0;
const hajy = process.env.HAJY_ID || 0;

export async function orderScript(
   buyerId: string,
   buyer: string,
   currency: string,
   product: string,
   amount: string,
   receiver: string,
   total: string
) {
   try {
      const userIds = [palwan,/*  hajy, */ Number(buyerId)];

      const adminMessage = `${product} \n Sany: ${amount} \n Kimden: @${buyer} \n Kime: ${receiver} \n Jemi toleg: ${total} ${currency}`;
      const clientMessage = "Sargyt kabul edilyanca garasyn";

      await Promise.all(
         userIds.map(async (i) => {
            const message = i === Number(buyerId) ? clientMessage : adminMessage;
            await bot.api.sendMessage(i, message);
            console.log(`SMS gitdi`);
         })
      );
      console.log("SMS gitdi");
      return true;
   } catch (error) {
      console.error(`SMS gitmedi: ${error}`);
      return false;
   }
}
export async function sendAutomaticMessage(userIds: number[], message: string) {
   try {
      await Promise.all(
         userIds.map(async (userId) => {
            await bot.api.sendMessage(userId, message);
            console.log(`SMS ${userId}-a gitdi: ${message}`);
         })
      );
      console.log("SMS gitdi");
   } catch (error) {
      console.error(`SMS gitmedi: ${error}`);
   }
}
