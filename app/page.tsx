import CardPerfil from "@/components/base/CardPerfil";

// Mock data
const mockProfiles = [
  { id: 1, name: "João Silva", image: "/cibra.webp" },
  { id: 2, name: "Maria Oliveira", image: "/cibra.webp" },
  { id: 3, name: "Carlos Souza", image: "/cibra.webp" },
  { id: 4, name: "Ana Pereira", image: "/cibra.webp" },
];

export default function Home() {
  return (
    <div className="flex flex-wrap gap-6 p-8 justify-center">
        {mockProfiles.map((profile) => (
          <CardPerfil key={profile.id} image={profile.image} name={profile.name} />
        ))}
      </div>
  );
}
