"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Quick Entry", href: "/activities", icon: "bolt" },
    { name: "All Records", href: "/records", icon: "format_list_bulleted" },
    { name: "Faculty Profile", href: "/faculty", icon: "badge" },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen w-64 flex flex-col py-6 space-y-1 bg-[#F4F4F3] border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="px-6 mb-8 mt-2 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0">
            <img src="/kmclu-logo.jpg" alt="KMCLU Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-black text-primary leading-tight">Audit Central</h2>
            <p className="text-[11px] font-label-caps text-gray-500 uppercase tracking-widest">University Admin</p>
          </div>
        </div>
        <button 
          className="md:hidden text-gray-400 hover:text-primary transition-colors focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 font-manrope text-[13px] font-medium group ${
                isActive
                  ? "bg-white text-primary border-r-2 border-primary font-bold shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mb-6 mt-4">
        <button className="w-full bg-primary text-white py-2.5 rounded font-manrope text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Start New Audit
        </button>
      </div>

      <div className="px-2 pt-4 border-t border-gray-200 mt-auto shrink-0">
        <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-3 hover:bg-gray-200/50 transition-colors font-manrope text-[13px] font-medium">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
