"use client";

import { usePokemon } from "@/hooks/usePokemon";

type Props = {
  selectedType: string;
  searchTerm: string;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export default function SearchForm({
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}: Props) {
  const { types, loading } = usePokemon();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow rounded-xl">
      <select
        className="p-2 border rounded w-full md:w-1/3"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">All Types</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))
        )}
      </select>

      <input
        type="text"
        className="p-2 border rounded w-full md:w-2/3"
        placeholder="Search Pokémon by name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
