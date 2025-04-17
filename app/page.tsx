"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import PokemonCard from "@/components/PokemonCard";
import { usePokemonList } from "@/hooks/usePokemonList";

export default function HomePage() {
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { filteredList, loading } = usePokemonList(selectedType, searchTerm);

  console.log(filteredList, "srj filter");

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon Search</h1>

      <SearchForm
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <p className="mt-8">Loading Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      )}
    </main>
  );
}
