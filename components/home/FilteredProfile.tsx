import CardPerfil from "../base/CardPerfil";
import Image from "next/image";

interface FilteredProfilesProps {
  profiles: { id: number; name: string; image: string, cpf: string }[];
  searchQuery: string;
}

const FilteredProfiles = ({ profiles, searchQuery }: FilteredProfilesProps) => {
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-6 p-2 justify-center">
      {filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <CardPerfil key={profile.id} image={profile.image} name={profile.name} cpf={profile.cpf} />
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
