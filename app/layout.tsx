import "./globals.css";
import { Montserrat } from "next/font/google";



const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Ripper Casino",
  description: "Casino landing page",
  icons: {
  icon: "/favicon-new.ico",
}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={montserrat.className}>
       

  {children}
  
</body>

    </html>
  );
}
