import Link from "next/link";

type Props = {
  params: { name: string };
};

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!res.ok) return <h1>No PokeMon Found</h1>;

  const pokemon = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <nav className="text-sm mb-4 text-gray-600">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">→</span>
        <span className="capitalize">{name}</span>
      </nav>

      {/* Pokémon Info */}
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <img src={pokemon.sprites.front_default} alt={name} className="w-32 h-32 mx-auto" />
        <h1 className="text-3xl capitalize font-bold mt-4">{name}</h1>

        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <div>
            <p className="text-gray-500">Height</p>
            <p>{pokemon.height}</p>
          </div>
          <div>
            <p className="text-gray-500">Weight</p>
            <p>{pokemon.weight}</p>
          </div>
          <div>
            <p className="text-gray-500">Types</p>
            <p className="capitalize">{pokemon.types.map((t: any) => t.type.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
