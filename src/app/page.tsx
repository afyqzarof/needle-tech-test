"use client";
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

  return (
    <main>
      <p>hello {userDetail?.data()?.email}</p>
      <SignOut />
    </main>
  );
};

export default Home;
