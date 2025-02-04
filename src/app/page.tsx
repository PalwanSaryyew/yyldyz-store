import MainBox from "@/components/mains/MainBox";
import Footer from "@/components/mains/Footer";
import Header from "@/components/mains/Header";
import ChktMdl from "@/components/modals/ChktMdl";
import { cmcApi } from "@/lib/fetchs";

export default async function Home() {
   const price = (await cmcApi("TON")) ?? 0;

   return (
      <main className="min-h-screen">
         <ChktMdl />
         <Header  />
         <MainBox tonPrice={price} />
         <Footer />
      </main>
   );
}
