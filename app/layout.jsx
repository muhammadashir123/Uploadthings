
import Navbar from "../components/Navbar";
import "./globals.css";
// import { Navbar } from "@/components/Navbar";
// import Navbar from "@components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressContentEditableWarning={true}>
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
          <div className="mt-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
