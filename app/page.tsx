"use client";

import FAB from "@/components/base/FAB";
import SearchBar from "@/components/base/SearchBar";
import FilteredProfiles from "@/components/home/FilteredProfile";
import { FormPerfil } from "@/interfaces/CardPerfil";
import { useFABStore } from "@/store/FABStore";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { hideFAB } = useFABStore();
  const [profiles, setProfiles] = useState<FormPerfil[]>([])
  const [usersUpdated, setUsersUpdated] = useState(false)

  const loadProfiles = () => {
    const allProfiles: FormPerfil[] = [];
    Object.keys(localStorage).forEach((key) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const profile = JSON.parse(item);
          if (profile?.cpf) {
            allProfiles.push(profile);
          }
        }
      } catch {
      }
    });

    setProfiles(allProfiles);
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    if (usersUpdated) {
      loadProfiles()
      setUsersUpdated(false)
    }
  }, [usersUpdated])

  return (
    <div className="p-2">
      <div className="w-full flex justify-end">
        <SearchBar onSearch={setSearchQuery} />
      </div>
        <FilteredProfiles 
          profiles={profiles} 
          searchQuery={searchQuery} 
          updateUserList={setUsersUpdated}
        />
      {!hideFAB ? <FAB route="/perfil" hidden={hideFAB} /> : undefined}
    </div>
  );
}
