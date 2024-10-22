"use client";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";

const SignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const router = useRouter();

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <button
      className="text-xl"
      onClick={async () => {
        const success = await signOut();
        if (success) {
          router.push("/login");
        }
      }}>
      Log out
    </button>
  );
};

export default SignOut;
