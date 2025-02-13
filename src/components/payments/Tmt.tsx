import Link from "next/link";

const Tmt = () => {
   return (
      <Link href={"/orders"}>
         <button
            className={`bg-green-500 w-full py-2 text-white rounded-lg ring-inherit ring-2 ring-green-600 flex items-center justify-center`}
         >
            Tassykla
         </button>
      </Link>
   );
};

export default Tmt;
