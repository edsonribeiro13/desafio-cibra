"use client";

import { Pencil, Trash } from "lucide-react";
import { formatCPF } from "@/utils/formatCpf";
import Image from "next/image";
import { useFABStore } from "@/store/FABStore";
import { FormPerfil } from "@/interfaces/CardPerfil";

const CardPerfil = ({ cpf, nome, foto }: FormPerfil) => {
  const { setHideFAB } = useFABStore();

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col items-center text-center w-64"
      onMouseEnter={() => setHideFAB(true)}
      onMouseLeave={() => setHideFAB(false)}
    >
      <div className="flex flex-wrap items-center gap-5">
        <Image 
          src={foto as unknown as string} 
          alt={nome} 
          width={100} 
          height={125}  
          className="rounded-full object-cover border border-gray-300" />
        <p className="font-bold text-black text-lg">{nome}</p>
      </div>
      <div className="mt-2 text-gray-600 text-sm">
        {formatCPF(cpf)}
      </div>
      <div className="mt-3 flex gap-4">
        <button className="text-blue-600 hover:text-blue-800">
          <Pencil size={20} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardPerfil;
