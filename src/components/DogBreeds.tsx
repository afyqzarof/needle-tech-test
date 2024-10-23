"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

type BreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

type DogBreedsProps = {
  selectedBreeds: string[];
  handleSelectBreed: (breed: string) => void;
};

const DogBreeds = ({ selectedBreeds, handleSelectBreed }: DogBreedsProps) => {
  const [data, setData] = useState<string[]>([]);

  const fetchData = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data: BreedsResponse = await res.json();
    const breeds = formatDogs(data.message);
    setData(breeds);
  };

  const formatDogs = (dogBreeds: Record<string, string[]>) => {
    const breeds: string[] = [];

    for (const breed in dogBreeds) {
      if (dogBreeds[breed].length === 0) {
        breeds.push(breed);
      } else {
        for (const subBreed of dogBreeds[breed]) {
          breeds.push(`${subBreed} ${breed}`);
        }
      }
    }

    return breeds;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data.length) {
    return <Loading />;
  }

  return (
    <section className="flex flex-wrap gap-4">
      {data.map((breed) => {
        return (
          <p
            key={breed}
            className={`secondary-button cursor-pointer ${
              selectedBreeds.includes(breed) ? "bg-yellow-100" : ""
            }`}
            onClick={() => {
              handleSelectBreed(breed);
            }}>
            {breed}
          </p>
        );
      })}
    </section>
  );
};

export default DogBreeds;
