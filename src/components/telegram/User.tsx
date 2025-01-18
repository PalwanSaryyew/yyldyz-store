import Image from "next/image";

const User = () => {
   return (
      <div className="bg-blue-500 text-white p-1 font-bold rounded-3xl flex items-center gap-1 ring-2 ring-white">
         <Image
            alt="User"
            src="/emeki.png"
            width={50}
            height={50}
            className="rounded-full"
         />
         <span>Emeki🌱</span>
      </div>
   );
};

export default User;
