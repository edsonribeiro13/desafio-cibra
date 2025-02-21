"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCPF } from "@/utils/formatCpf";
import Image from "next/image";
import { Camera } from "lucide-react";
import { isValidCPF } from "@/utils/validateCpf";
import { dataURLtoFile, toBase64 } from "@/utils/base64";
import {AlertDialog} from 'radix-ui'
import { useSearchParams, useRouter } from 'next/navigation'

const COMIDAS = ["Pizza", "Hambúrguer", "Sushi", "Churrasco", "Lasanha"];
const CORES = ["Vermelho", "Azul", "Verde", "Amarelo", "Preto"];

const perfilSchema = z.object({
  foto: z.instanceof(File).optional(),
  nome: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string()
    .min(14, "O CPF deve ter 11 números")
    .refine((cpf: string) => isValidCPF(cpf), {message: 'CPF inválido'}),
  comidaFavorita: z.string().min(1, "Escolha sua comida favorita"),
  corFavorita: z.string().min(1, "Escolha sua cor favorita"),
});

interface FormPerfil {
    nome: string
    cpf: string
    comidaFavorita: string
    corFavorita: string
    foto?: File
}

const PerfilForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useSearchParams();
  const redirect = useRouter()
  const cpfFromUrl = router.get('cpf');
  const [isFormDisabled, setFormDisabled] = useState(false); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(perfilSchema),
  });

  useEffect(() => {
    if (cpfFromUrl && typeof cpfFromUrl === "string") {
      const storedUser = localStorage.getItem(cpfFromUrl);
      if (storedUser) {
        const profile = JSON.parse(storedUser ?? '')
        const profilePhoto = dataURLtoFile(profile.foto, 'fotoUsuario')
        setValue('nome', profile.nome);
        setValue('cpf', formatCPF(profile.cpf));
        setValue('comidaFavorita', profile.comidaFavorita);
        setValue('corFavorita', profile.corFavorita);
        setValue('foto', profilePhoto);
        setPreview(URL.createObjectURL(profilePhoto))
        setFormDisabled(true);
      }
    }
  }, [cpfFromUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("foto", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawCPF = e.target.value.replace(/\D/g, "").slice(0, 11);
    setValue("cpf", formatCPF(rawCPF));
  };

  const onSubmit = async (data: FormPerfil) => {
    if (localStorage.getItem(data.cpf.replace(/\D/g, "")) && !cpfFromUrl) {
        setDialogOpen(true);
        return;
    }

    let fotoBase64 = null;
    if (data.foto) {
      fotoBase64 = await toBase64(data.foto);
    }

    localStorage.setItem(data.cpf.replace(/\D/g, ""), JSON.stringify({
      nome: data.nome,
      cpf: data.cpf.replace(/\D/g, ""),
      foto: fotoBase64,
      comidaFavorita: data.comidaFavorita,
      corFavorita: data.corFavorita,
    }));

    redirect.push('/')
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="foto" className="cursor-pointer">
          <div className="flex items-center bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
            <Camera className="w-6 h-6 text-gray-600" />
            {(preview) ? (
              <Image 
                    src={preview}
                    width={75} 
                    height={50}  
                    alt="Preview foto de perfil" 
                    className="rounded-full object-cover" 
                />
            ) : (
              <span className="ml-3 text-gray-600">Adicionar foto</span>
            )}
          </div>
        </label>
        <input
          type="file"
          id="foto"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div>
        <label className="block font-medium">Nome</label>
        <input
          {...register("nome")}
          className={`w-full p-2 border rounded-md focus:outline-none focus:border-[#b0d136] transition duration-200 
            ${ isFormDisabled ? 'bg-gray-300' : ''}`}
          placeholder="Digite seu nome"
          disabled={isFormDisabled}
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
      </div>
      <div>
        <label className="block font-medium">CPF</label>
        <input
          {...register("cpf")}
          className={`w-full p-2 border rounded-md focus:outline-none focus:border-[#b0d136] transition duration-200 
            ${ isFormDisabled ? 'bg-gray-300' : ''}`}
          placeholder="000.000.000-00"
          disabled={isFormDisabled}
          onChange={handleCPFChange}
        />
        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Comida Favorita</label>
        <select {...register("comidaFavorita")} className="w-full p-2 border rounded-md">
          <option value="">Selecione...</option>
          {COMIDAS.map((comida) => (
            <option key={comida} value={comida}>
              {comida}
            </option>
          ))}
        </select>
        {errors.comidaFavorita && <p className="text-red-500 text-sm">{errors.comidaFavorita.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Cor Favorita</label>
        <select {...register("corFavorita")} className="w-full p-2 border rounded-md">
          <option value="">Selecione...</option>
          {CORES.map((cor) => (
            <option key={cor} value={cor}>
              {cor}
            </option>
          ))}
        </select>
        {errors.corFavorita && <p className="text-red-500 text-sm">{errors.corFavorita.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-primaryBg text-white rounded-md hover:bg-green-700">
        Salvar
      </button>
    </form>
    <AlertDialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Trigger />
        <AlertDialog.Overlay 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={() => setDialogOpen(false)}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <AlertDialog.Title className="text-xl font-bold">Erro!</AlertDialog.Title>
          <AlertDialog.Description className="mt-2">
            O CPF informado já está cadastrado. Por favor, insira um CPF diferente.
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default PerfilForm

