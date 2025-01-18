import MainBox from "@/components/MainBox";
import Footer from "@/components/mains/Footer";
import Header from "@/components/mains/Header";


export default function Home() {
   return (
      <main className="min-h-screen">
         <Header />
         <MainBox />
         <Footer />
      </main>
   );
}
