"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function ApplicationPage() {
    const router = useRouter();
  return (
    <><Header/>
    <main className="page application-page">
    <div className="container">
      <h1>App Page</h1>
      <p>Here you will find information about the casino mobile app</p>
      <button onClick = { () => router.push("/")} className="back-btn">
       Return to the main page
      </button>
      </div>
    </main>
    </>
  );
}
