

const cmcApikey = process.env.CMC_API_KEY || '';
const toncoinId = "11419";
const coinId = toncoinId;
const fetchUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${coinId}`;

export const cmcApi = async () => {
   try {
      const response = await fetch(fetchUrl, {
         headers: {
            "X-CMC_PRO_API_KEY": cmcApikey,
         },
         cache: "no-cache"
      });
      const result = await response.json();
      const coinData = result.data;
      const coinId = Object.keys(coinData)[0]; // İlk anahtarı al
      const coinPrice = coinData[coinId].quote.USD.price; // Fiyatı al
      
      return coinPrice;
   } catch (error: unknown) {
      console.log((error as Error).message);
      return 0.4;
   }
};
/* export const cmcApi = async () => {
   const response = await fetch(fetchUrl, {
      headers: {
         "X-CMC_PRO_API_KEY": cmcApikey,
      },
      cache: "no-store",
   })
      .then(async (result) => await result.json())
      .then((coinData) => coinData)
      .catch((err) => console.log(err.message));

   const coinData = response.data;
   const coinId = Object.keys(coinData)[0]; // İlk anahtarı al
   const coinPrice = coinData[coinId].quote.USD.price; // Fiyatı al
   return coinPrice;
}; */

//import { coinData } from "./data"

export const cmcApiLoc = async () => {
   // const dataLoc = coinData.find((item) => item.name === coin);
   const data = await cmcApi();
   
   return data;
}
