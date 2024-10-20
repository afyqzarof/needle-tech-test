"use client";
import DogBreeds from "@/components/DogBreeds";
import { useState } from "react";

const Breeds = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([
    "affenpinscher",
    "australian cattledog",
    "cavapoo",
  ]);

  const handleSelectBreed = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      return;
    }

    const newBreeds = [...selectedBreeds];
    if (newBreeds.length === 3) {
      newBreeds.shift();
    }
    newBreeds.push(breed);
    setSelectedBreeds(newBreeds);
  };
  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-3xl">Select your three favourite dog breeds:</h2>
      <h3 className="text-xl">Selected breeds:</h3>
      <article className="flex gap-4">
        {selectedBreeds.map((breed) => {
          return (
            <p key={breed} className="bg-yellow-300 px-4 py-2 rounded">
              {breed}
            </p>
          );
        })}
      </article>
      <h4 className="text-xl">Breeds:</h4>
      <DogBreeds
        selectedBreeds={selectedBreeds}
        handleSelectBreed={handleSelectBreed}
      />
    </main>
  );
};

export default Breeds;
