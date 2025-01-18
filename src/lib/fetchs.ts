const cmcApikey = "dd4d85ec-6fdc-4692-8de7-5937ad53a660";

export const cmcApi = async (coin: string) => {
   try {
      const response = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${coin}`, {
         headers: {
            "X-CMC_PRO_API_KEY": cmcApikey,
         },
         cache: "no-store"
      });
      const result = await response.json();
      const coinData = result.data;
      const coinId = Object.keys(coinData)[0]; // İlk anahtarı al
      const coinPrice = coinData[coinId].quote.USD.price; // Fiyatı al
      console.log(coinPrice);
      return coinPrice;
   } catch (error: unknown) {
      console.log((error as Error).message);
      return undefined;
   }
};