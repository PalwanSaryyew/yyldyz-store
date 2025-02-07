import MainBox from "@/components/mains/MainBox";
import Footer from "@/components/mains/Footer";
import Header from "@/components/mains/Header";
import ModalProvider from "@/components/modals/ModalProvider";

export default async function Home() {

   return (
      <main className="min-h-screen">
         <span className="text-orange-500 text-blue-500 text-green-500"></span>
         <ModalProvider />
         <Header />
         <MainBox  />
         <Footer />
      </main>
   );
}
