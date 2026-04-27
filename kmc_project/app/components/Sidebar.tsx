"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Quick Entry", href: "/activities", icon: "bolt" },
    { name: "All Records", href: "/records", icon: "format_list_bulleted" },
    { name: "Faculty Profile", href: "/faculty", icon: "badge" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col py-6 space-y-1 bg-[#F4F4F3] border-r border-gray-200 z-50">
      <div className="px-6 mb-8 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white">account_balance</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-primary leading-tight">Audit Central</h2>
            <p className="text-[11px] font-label-caps text-gray-500 uppercase tracking-widest">University Admin</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
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

      <div className="px-4 mb-6">
        <button className="w-full bg-primary text-white py-2.5 rounded font-manrope text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Start New Audit
        </button>
      </div>

      <div className="px-2 pt-4 border-t border-gray-200 mt-auto">
        <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-3 hover:bg-gray-200/50 transition-colors font-manrope text-[13px] font-medium">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
