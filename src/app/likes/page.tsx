"use client";
import Header from "@/components/Header";
import { auth, db } from "@/firebase/config";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const LikesPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    doc(db, "users", user?.uid ?? "noid")
  );
  const router = useRouter();
  const userData = userDetail?.data();

  const likedPictures: string[] = userData?.likedPictures;

  if (userLoading || userDetailLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push("/login");
    return;
  }

  if (userLoading || userDetailLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header title="Liked pictures" />
      <main className="p-4 flex flex-wrap gap-4">
        {likedPictures?.length ? (
          likedPictures?.map((src) => {
            return <img src={src} alt={src} className="h-48" key={src} />;
          })
        ) : (
          <p>
            No liked pictures. Select{" "}
            <Link href={"/"} className="underline">
              here
            </Link>
          </p>
        )}
      </main>
    </>
  );
};

export default LikesPage;
