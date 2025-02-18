import { InlineKeyboard } from "grammy";
import { bot } from "./bot";

bot.command("start", (ctx) => {
   const keyboard = new InlineKeyboard().url(
      "Başla",
      "http://t.me/officialstarstorebot/str"
   );

   ctx.reply("Söwda başlamak üçin aşakdaky dügmä basyň", {
      reply_markup: keyboard,
   });
});

bot.on("message", (ctx) => ctx.reply("Eylen beylen!"));

bot.start();
