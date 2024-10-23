import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

type DogImagesParams = {
  breed: string;
  handleLikePicture: (src: string) => void;
};
const DogImages = ({ breed, handleLikePicture }: DogImagesParams) => {
  const [imageSources, setImagesSources] = useState<string[] | null>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!imageSources) {
    return <Loading />;
  }

  if (!imageSources.length) {
    return <p>No images</p>;
  }

  return (
    <article className="flex flex-col gap-4 border-2 rounded-lg p-4 border-green-900">
      <h2 className="text-2xl uppercase">{breed}</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {imageSources.map((src) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={src}
              alt={src}
              key={src}
              className="h-32 hover:border-2 cursor-pointer w-auto"
              onClick={() => {
                handleLikePicture(src);
              }}
              height={100}
              width={100}
            />
          );
        })}
      </div>
    </article>
  );
};

export default DogImages;
