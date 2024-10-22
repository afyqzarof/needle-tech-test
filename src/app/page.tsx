"use client";
import DogImages from "@/components/DogImages";
import Header from "@/components/Header";
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
  const userData = userDetail?.data();

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
      <Header title={`${userData?.email}'s Feed`} />
      <SignOut />
      <div className="grid grid-cols-3 gap-4 p-4">
        {userData?.favouriteBreeds?.length &&
          userData?.favouriteBreeds.map((breed: string) => {
            return <DogImages breed={breed} key={breed} />;
          })}
      </div>
    </main>
  );
};

export default Home;
