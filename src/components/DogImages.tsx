import React, { useEffect, useState } from "react";
import Image from "next/image";

type DogImagesParams = {
  breed: string;
};
const DogImages = ({ breed }: DogImagesParams) => {
  const [imageSources, setImagesSources] = useState([]);

  const formatParam = (breed: string) => {
    return breed.split(" ").reverse().join("/");
  };
  const getDogImages = async () => {
    const param = formatParam(breed);
    const res = await fetch(
      `https://dog.ceo/api/breed/${param}/images/random/20`
    );
    const data = await res.json();
    setImagesSources(data?.message);
  };

  useEffect(() => {
    getDogImages();
  }, []);

  if (!imageSources.length) {
    return <p>Loading...</p>;
  }

  return (
    <article className="flex flex-col gap-4 border rounded-md p-4">
      <h2 className="text-2xl">{breed}</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {imageSources.map((src) => {
          return <img src={src} alt={src} key={src} className="h-32" />;
        })}
      </div>
    </article>
  );
};

export default DogImages;