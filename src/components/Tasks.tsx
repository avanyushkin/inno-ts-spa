import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "@/graphql/queries/task";
import { Card, CardContent } from "@/components/ui/card";

type Character = {
  id: number;
  name: string;
  species: string;
  status: string;
};

export function Tasks() {
  const { data, loading, error } = useQuery<{ characters: { results: Character[] } }>(GET_CHARACTERS, {
    errorPolicy: "all",
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Loading characters...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-500">
          Error loading characters: {error.message}
        </CardContent>
      </Card>
    );
  }

  const characters = data?.characters?.results || [];

  if (characters.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No characters found
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {characters.map((character) => (
        <Card key={character.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{character.name}</h3>
                <p className="text-sm text-gray-500">{character.species}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                character.status === 'Alive' ? 'bg-green-100 text-green-800' :
                character.status === 'Dead' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {character.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}