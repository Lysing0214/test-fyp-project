"use client";
import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input className="border p-2 w-full mt-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 mt-2 w-full" onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
