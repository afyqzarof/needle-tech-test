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
        <aside className="bg-yellow-400 p-4 h-screen col-span-1 flex flex-col gap-4">
          <h2 className="text-7xl break-words mb-6">Dogs on web</h2>

          <ul className="flex flex-col gap-4">
            <li className="text-4xl cursor-pointer hover:underline">
              <Link href="/">Home</Link>
            </li>
            <li className="text-4xl cursor-pointer hover:underline">
              <Link href="/breeds">Dog breeds</Link>
            </li>
            <li className="text-4xl cursor-pointer hover:underline">
              <Link href="/likes">Likes</Link>
            </li>
          </ul>
        </aside>
        <div className="col-span-5 max-h-screen overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
