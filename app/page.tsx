"use client";

import FAB from "@/components/base/FAB";
import SearchBar from "@/components/base/SearchBar";
import FilteredProfiles from "@/components/home/FilteredProfile";
import { useFABStore } from "@/store/FABStore";
import { useState } from "react";

// Mock data
const mockProfiles = [
  { id: 1, name: "João Silva", image: "/cibra.webp", cpf: '12345678901' },
  { id: 2, name: "Maria Oliveira", image: "/cibra.webp", cpf: '12345678901' },
  { id: 3, name: "Carlos Souza", image: "/cibra.webp", cpf: '12345678901' },
  { id: 4, name: "Ana Pereira", image: "/cibra.webp", cpf: '12345678901' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { hideFAB } = useFABStore();

  return (
    <div className="p-2">
      <div className="w-full flex justify-end">
        <SearchBar onSearch={setSearchQuery} />
      </div>
        <FilteredProfiles 
          profiles={mockProfiles} 
          searchQuery={searchQuery} 
        />
      {!hideFAB ? <FAB route="/perfil" hidden={hideFAB} /> : undefined}
    </div>
  );
}
