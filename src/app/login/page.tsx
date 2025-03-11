"use client";
import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input className="border p-2 w-full mt-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white p-2 mt-2 w-full" onClick={handleLogin}>Login</button>
    </div>
  );
}
