import { cmcApi } from "@/lib/fetchs";

const Pricer = async ({ round }: { round: number }) => {
   const price = await cmcApi();
   return (
      <>
         {/* {Math.round(price * 100) / 100} */}
         {price?.toFixed(round)}
      </>
   );
};

export default Pricer;
