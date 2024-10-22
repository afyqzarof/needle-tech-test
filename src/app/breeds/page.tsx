"use client";
import DogBreeds from "@/components/DogBreeds";
import Header from "@/components/Header";
import { auth, db } from "@/firebase/config";
import removeItemOnce from "@/utils/remove-from-array";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Breeds = () => {
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    doc(db, "users", user?.uid ?? "noid")
  );

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const handleSelectBreed = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      const newArray = removeItemOnce(selectedBreeds, breed);
      setSelectedBreeds(newArray);
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
    router.push("/");
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
    <>
      <Header title="Select your three favourite dog breeds" />
      <main className="flex flex-col gap-12 p-4">
        <div>
          <h3 className="text-xl mb-4">Selected breeds:</h3>
          <article className="flex gap-4 mb-4">
            {selectedBreeds.map((breed) => {
              return (
                <p key={breed} className="px-4 py-2 rounded border">
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
    </>
  );
};

export default Breeds;
