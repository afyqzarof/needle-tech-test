import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const futura = localFont({
  src: "../fonts/futura.woff",
  variable: "--font-geist-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dog website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={futura.className}>
      <body className="grid grid-cols-6">
        <aside className="bg-yellow-200 p-4 h-screen col-span-1 flex flex-col gap-4">
          <h2 className="text-6xl">Dog website</h2>

          <ul className="flex flex-col gap-2">
            <li className="text-2xl cursor-pointer hover:underline">
              <Link href="/">Home page</Link>
            </li>
            <li className="text-2xl cursor-pointer hover:underline">
              <Link href="/login">Login/Register</Link>
            </li>
          </ul>
        </aside>
        <div className="col-span-5 max-h-screen overflow-scroll p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
