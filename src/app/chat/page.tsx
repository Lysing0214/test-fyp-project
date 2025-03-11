"use client";
import { useState, useEffect } from "react";
import { database, ref, push, onValue, auth, onAuthStateChanged, signOut } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; user: string; userId: string; timestamp: number }[]>([]);
  const [user, setUser] = useState<User | null>(null);
  // const [messages, setMessages] = useState<any[]>([]);
  // const [user, setUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const chatRef = ref(database, "chat_messages");

  // useEffect(() => {
  //   onValue(chatRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       setMessages(Object.values(snapshot.val()));
  //     } else {
  //       setMessages([]);
  //     }
  //   });

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) router.push("/login"); // Redirect if not logged in
  //     else setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setUser(user);
    });
  
    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        setMessages(Object.values(snapshot.val()));
      } else {
        setMessages([]);
      }
    });
  }, [chatRef]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    await push(chatRef, {
      text: newMessage,
      timestamp: Date.now(),
      user: user.email,
      userId: user.uid,
    });
    setNewMessage("");
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Chat</h1>
      <p className="text-sm">Logged in as: {user?.email}</p>
      <button className="bg-red-500 text-white p-2 mt-2" onClick={handleLogout}>Logout</button>
      <div className="mt-4">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}: </strong>
            {msg.text}
          </p>
        ))}
      </div>
      <input className="border p-2 w-full mt-4" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={sendMessage}>Send</button>
    </div>
  );
}
