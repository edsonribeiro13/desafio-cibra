import { Pencil, Trash2 } from 'lucide-react';
import Image from "next/image";
import { useFABStore } from "@/store/FABStore";

interface CardPerfilProps {
  image: string;
  name: string;
}

const CardPerfil = ({ image, name }: CardPerfilProps) => {
  const { setHideFAB } = useFABStore();
  return (
    <div 
      onMouseOver={() => setHideFAB(true)} 
      onMouseOut={() => setHideFAB(false)}
      className="flex flex-wrap items-center p-4 bg-white shadow-md rounded-lg w-64 space-x-4"
    >
      <Image src={image} alt={name} width={75} height={75} className="rounded-full object-cover" />
      <span className="flex-1 font-semibold text-gray-800">{name}</span>
      <button className="text-blue-500 hover:text-blue-700">
        <Pencil size={18} />
      </button>
      <button className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CardPerfil;
