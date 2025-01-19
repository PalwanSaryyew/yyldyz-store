'use client'
import { useHandleModal } from "../store/UniStore";

const ChktMdl = () => {
   const openState = useHandleModal((state) => state.isOpen);
   const modalCloser = useHandleModal((state) => state.toogle);

    if (!openState) {
        return null; 
    }
   return (
      <div className="bg-black/50 fixed w-full h-full flex items-center justify-center z-50">
        <button onClick={()=>modalCloser()}>Close</button>
        <div className="w-[80%] fixed bg-slate-300 rounded-2xl">modal</div>
      </div>
      
   );
};

export default ChktMdl;
