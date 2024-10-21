"use client";
import DogImages from "@/components/DogImages";
import SignOut from "@/components/Logout";
import { auth, db } from "@/firebase/config";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Home = () => {
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    doc(db, "users", user?.uid ?? "noid")
  );

  const router = useRouter();

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
    <main>
      <p>hello {userDetail?.data()?.email}</p>
      <SignOut />
      <div className="grid grid-cols-3 gap-4 ">
        {userDetail?.data()?.favouriteBreeds?.length &&
          userDetail?.data()?.favouriteBreeds.map((breed: string) => {
            return <DogImages breed={breed} key={breed} />;
          })}
      </div>
    </main>
  );
};

export default Home;
