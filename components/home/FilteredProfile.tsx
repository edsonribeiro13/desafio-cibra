import { FormPerfil } from "@/interfaces/CardPerfil";
import CardPerfil from "../base/CardPerfil";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FilteredProfilesProps {
  profiles: FormPerfil[];
  searchQuery: string;
}

const FilteredProfiles = ({ profiles, searchQuery }: FilteredProfilesProps) => {
  const filteredProfiles = profiles.filter((profile) =>
    profile.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();
  const handleEditClick = (cpf: string) => {
    router.push(`/perfil?cpf=${cpf}`)
  };

  return (
    <div className="flex flex-wrap gap-6 p-2 justify-center">
      {filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <CardPerfil 
            key={profile.cpf} 
            foto={profile.foto} 
            nome={profile.nome} 
            cpf={profile.cpf}
            comidaFavorita={profile.comidaFavorita}
            corFavorita={profile.corFavorita}
            onEdit={handleEditClick}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 
        text-center w-full max-w-md p-3 bg-white shadow-lg rounded-lg border border-gray-200">
          <Image
            src="/cibra.webp"
            alt="Nenhum perfil encontrado"
            width={75} 
            height={75}
            className="object-cover mb-4"
          />
          <p className="text-gray-500 text-xl font-semibold">
            Desculpe nenhum perfil encontrado com base na sua busca
          </p>
          <p className="text-gray-400">Tente diferentes palavras ou limpe a busca</p>
        </div>
      )}
    </div>
  );
};

export default FilteredProfiles;
