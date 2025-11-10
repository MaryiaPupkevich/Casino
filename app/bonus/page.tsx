"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";


export default function BonusPage() {
    const router = useRouter();
  return (
     <>
     <Header />
    <main className="page bonus-page">
       <div className="container">
      <h1>Bonus Page</h1>
      <p>Here you will find information about casino bonuses</p>
        <button onClick = { () => router.push("/")} className="back-btn">
        Return to the main page
      </button>
      </div>

    </main>
      </>
  );
}
