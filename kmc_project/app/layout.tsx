import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academic Audit Management System",
  description: "Khwaja Moinuddin Chishti Language University, Lucknow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#FFF9E6]" suppressHydrationWarning>
        <header className="w-full">
          <div className="bg-[#B23B25] text-white py-4 px-6 shadow-md border-b-4 border-[#800000]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white">
                  <span className="text-[#B23B25] font-bold text-lg md:text-xl">U</span>
                </div>
                <h1 className="text-sm md:text-xl lg:text-2xl font-bold tracking-tight uppercase leading-tight">
                  Khwaja Moinuddin Chishti <br className="md:hidden" /> Language University, Lucknow
                </h1>
              </a>
              <div className="hidden md:block">
                 <div className="bg-white text-[#B23B25] px-4 py-1 rounded-full font-bold text-sm shadow-inner">
                    NAAC B++
                 </div>
              </div>
            </div>
          </div>
          <div className="bg-white border-b border-gray-200 py-2 px-6 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-center">
              <h2 className="text-[#800000] font-bold text-lg tracking-widest uppercase">
                Academic Audit Management System
              </h2>
            </div>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-white py-6 px-6 border-t border-gray-200 mt-auto">
           <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
             © {new Date().getFullYear()} Khwaja Moinuddin Chishti Language University, Lucknow. All rights reserved.
           </div>
        </footer>
      </body>
    </html>
  );
}
