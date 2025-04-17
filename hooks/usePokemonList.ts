"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

export function usePokemonList(selectedType: string, searchTerm: string) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const limit = 151;
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        setPokemonList(res.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const filter = async () => {
      let filtered = pokemonList;

      if (searchTerm) {
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      if (selectedType) {
        try {
          const res = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
          const pokemonOfType = res.data.pokemon.map((p: any) => p.pokemon.name);
          filtered = filtered.filter((p) => pokemonOfType.includes(p.name));
        } catch (error) {
          console.error("Error filtering by type:", error);
        }
      }

      setFilteredList(filtered);
    };

    filter();
  }, [searchTerm, selectedType, pokemonList]);

  return { filteredList, loading };
}
