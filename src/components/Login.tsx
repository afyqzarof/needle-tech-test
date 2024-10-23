"use client";
import { auth } from "@/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import Loading from "./Loading";

const Login = () => {
  const [user, userLoading] = useAuthState(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithEmailAndPassword, _userDetail, loading] =
    useSignInWithEmailAndPassword(auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading || userLoading) {
    return <Loading />;
  }

  if (user) {
    router.push("/");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      formData.email,
      formData.password
    );

    if (!user) {
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border-2 border-green-900 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
            required
            placeholder="rueben@exaple.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
            required
            placeholder="Your password here"
          />
        </div>

        <button type="submit" className="w-full primary-button mb-4">
          Login
        </button>
        <Link href="/register" className="hover:underline">
          New here? Register an account
        </Link>
      </form>
    </div>
  );
};

export default Login;
