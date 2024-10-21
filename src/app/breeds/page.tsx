"use client";
import DogBreeds from "@/components/DogBreeds";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Breeds = () => {
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    doc(db, "users", user?.uid ?? "noid")
  );

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

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

  const handleSave = async () => {
    const ref = doc(db, "users", userDetail?.data()?.uid);
    await updateDoc(ref, {
      favouriteBreeds: selectedBreeds,
    });
  };

  useEffect(() => {
    if (!userDetailLoading) {
      setSelectedBreeds(userDetail?.data()?.favouriteBreeds ?? []);
    }
  }, [userDetail, userDetailLoading]);

  if (userLoading || userDetailLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col gap-12 pt-4">
      <h2 className="text-3xl">Select your three favourite dog breeds</h2>
      <div>
        <h3 className="text-xl mb-4">Selected breeds:</h3>
        <article className="flex gap-4">
          {selectedBreeds.map((breed) => {
            return (
              <p key={breed} className="bg-yellow-300 px-4 py-2 rounded">
                {breed}
              </p>
            );
          })}
        </article>
        <button
          className="bg-yellow-300 px-4 py-2 rounded"
          onClick={handleSave}>
          Save
        </button>
      </div>
      <div>
        <h4 className="text-xl mb-4">Breeds:</h4>
        <DogBreeds
          selectedBreeds={selectedBreeds}
          handleSelectBreed={handleSelectBreed}
        />
      </div>
    </main>
  );
};

export default Breeds;
