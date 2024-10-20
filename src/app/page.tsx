"use client";
import SignOut from "@/components/Logout";
import { auth, db } from "@/firebase/config";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Home = () => {
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    doc(db, "users", user?.uid ?? "noid")
  );

  if (userLoading || userDetailLoading) {
    return <p>loading</p>;
  }

  if (!user) {
    return <p>not logged in</p>;
  }

  return (
    <main>
      <p>hello {userDetail?.data()?.email}</p>
      <SignOut />
    </main>
  );
};

export default Home;
