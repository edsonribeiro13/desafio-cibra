"use client";

import SearchBar from "@/components/base/SearchBar";
import FilteredProfiles from "@/components/home/FilteredProfile";
import { useState } from "react";

// Mock data
const mockProfiles = [
  { id: 1, name: "João Silva", image: "/cibra.webp" },
  { id: 2, name: "Maria Oliveira", image: "/cibra.webp" },
  { id: 3, name: "Carlos Souza", image: "/cibra.webp" },
  { id: 4, name: "Ana Pereira", image: "/cibra.webp" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-2">
      <div className="w-full flex justify-end">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <FilteredProfiles profiles={mockProfiles} searchQuery={searchQuery} />
    </div>
  );
}
