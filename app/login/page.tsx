"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function LoginPage() {
     const router = useRouter();
  return (
    <><Header/>
    <main className="page login-page">
        <div className="container">
      <h1>Login Page</h1>
      <p>A casino login form will appear here later</p>
         <button onClick={() => router.push("/")} className="back-btn">
        Return to the main page
      </button>
      </div>
    </main>
    </>
  );
}
