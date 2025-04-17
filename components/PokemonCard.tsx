"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
};

export default function PokemonCard({ name }: Props) {
  const router = useRouter();

  const id = getIdFromName(name);
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  function getIdFromName(name: string): number {
    const map: { [key: string]: number } = {
      bulbasaur: 1,
      ivysaur: 2,
      venusaur: 3,
      charmander: 4,
    };
    return map[name] ?? 1;
  }

  return (
    <div
      onClick={() => router.push(`/pokemon/${name}`)}
      className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
    >
      <Image src={image} alt={name} width={80} height={80} className="mx-auto" />
      <h2 className="capitalize font-semibold mt-2">{name}</h2>
    </div>
  );
}
