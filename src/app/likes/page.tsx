"use client";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { auth, db } from "@/firebase/config";
import { doc } from "firebase/firestore";
import Image from "next/image";
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
    return <Loading />;
  }

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <>
      <Header title="Liked pictures" />
      <main className="p-8 gap-4">
        <div className="border-2 border-green-900 flex flex-wrap gap-4 p-4 rounded-lg">
          {likedPictures?.length ? (
            likedPictures?.map((src) => {
              return (
                <Image
                  src={src}
                  alt={src}
                  className="h-48 w-auto"
                  key={src}
                  width={100}
                  height={100}
                />
              );
            })
          ) : (
            <p>
              No liked pictures. Select{" "}
              <Link href={"/"} className="underline">
                here
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default LikesPage;
