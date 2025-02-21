"use client";

import { Pencil, Trash } from "lucide-react";
import { formatCPF } from "@/utils/formatCpf";
import Image from "next/image";
import { useFABStore } from "@/store/FABStore";
import { FormPerfil } from "@/interfaces/CardPerfil";
import { useState } from "react";

const CardPerfil = ({ cpf, nome, foto, comidaFavorita, corFavorita, onEdit, onDelete }: 
  FormPerfil & {onEdit: (cpf: string) => void, onDelete: (cpf: string, nome: string) => void}) => {
  const { setHideFAB } = useFABStore();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col items-center text-center w-64"
      onMouseEnter={() => setHideFAB(true)}
      onMouseLeave={() => setHideFAB(false)}
    >
      <div className="flex flex-wrap items-center gap-5">
      { foto ?  <Image 
          src={foto as unknown as string} 
          alt={nome} 
          width={100} 
          height={125}  
          className="rounded-full object-cover border border-gray-300" />
        : ''}
        <p className="font-bold text-black text-lg">{nome}</p>
      </div>
      <div className="mt-2 text-gray-600 text-sm">
        CPF: {formatCPF(cpf)}
      </div>
      <button 
        className="hover:bg-primaryBg hover:text-white text-primaryBg text-bold p-0 text-s rounded-md w-full h-1/8"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Ver menos" : "Ver mais"}
      </button>
      {showDetails && (
        <div className="mt-3 w-full text-center">
          <div className="bg-gray-100 p-2 rounded-md">
            <p className="text-gray-500 text-sm font-semibold">Comida Favorita:</p>
            <p className="text-gray-700">{comidaFavorita}</p>
          </div>

          <div className="bg-gray-100 p-2 rounded-md mt-2">
            <p className="text-gray-500 text-sm font-semibold">Cor Favorita:</p>
            <p className="text-gray-700">{corFavorita}</p>
          </div>
        </div>
      )}
      <div onClick={(event) =>{ 
        event.stopPropagation()
        onEdit(cpf)
      }} className="mt-3 flex gap-4">
        <button className="text-blue-600 hover:text-blue-800">
          <Pencil size={20} />
        </button>
        <button onClick={(event) => {
          event.stopPropagation()
          onDelete(cpf, nome)
        }
          } className="text-red-600 hover:text-red-800">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardPerfil;
