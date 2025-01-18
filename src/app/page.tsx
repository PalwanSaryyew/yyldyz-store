
import MainBox from "@/components/MainBox";
import Footer from "@/components/mains/Footer";
import Header from "@/components/mains/Header";
import { cmcApi } from "@/lib/fetchs";

export default async function Home() {
   const price = await cmcApi("toncoin");

  return (
    <main className="min-h-screen">
         <Header tonPrice={price}/>
         <MainBox tonPrice={price}/>
         <Footer />
      </main>
   );
}
