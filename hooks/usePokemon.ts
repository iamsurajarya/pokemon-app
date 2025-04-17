"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export function usePokemon() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/type");
        const fetchedTypes = res.data.results.map((type: any) => type.name);
        setTypes(fetchedTypes);
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading };
}
