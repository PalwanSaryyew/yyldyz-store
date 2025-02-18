import { InlineKeyboard } from "grammy";
import { bot } from "./bot";

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => {
   const keyboard = new InlineKeyboard().url(
      "Başla",
      "http://t.me/officialstarstorebot/str"
   ); 

   ctx.reply("Söwda başlamak üçin aşakdaky dügmä basyň", {
      reply_markup: keyboard,
   });
});
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Eylen beylen!"));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
