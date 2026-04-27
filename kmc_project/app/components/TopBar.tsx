"use client";

import { usePathname } from "next/navigation";

export default function TopBar({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  
  let title = "Academic Audit";
  if (pathname === "/dashboard") title = "Dashboard Overview";
  if (pathname === "/records") title = "All Records Master View";
  if (pathname === "/faculty") title = "Faculty Profile";
  if (pathname === "/activities") title = "Activity Entry";

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-gray-200 z-30 flex justify-between items-center px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-manrope text-sm font-medium tracking-tight text-gray-500 hidden sm:inline">Records</span>
        <span className="material-symbols-outlined text-sm text-gray-400 hidden sm:inline">chevron_right</span>
        <span className="font-manrope text-sm md:text-base font-bold text-primary truncate max-w-[200px] sm:max-w-none">{title}</span>
      </div>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          <input 
            className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Search records..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="text-gray-500 hover:text-primary transition-colors duration-200 relative p-1 md:p-0">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 md:top-0 right-1 md:right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="text-gray-500 hover:text-primary transition-colors duration-200 hidden sm:block p-1 md:p-0">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-primary uppercase">Administrator</p>
              <p className="text-[10px] text-gray-500">Admin-1042</p>
            </div>
            <img 
              alt="Administrator Profile" 
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCENjEsoiwBSmR6lM3C-DnpU6QxYyr62UwoSHimFJd5UFK_IutBPayEyI18_DTTkVgC2CnNdOC8tRyMISm0gvHrbsHBUV34qchalluetCikdqlje_tvgcnhhwymCrH7kaqY393-nJFQJsof3VOcbvEsji_iOUexgfoj09ph4kyYCCjALkM1QfmdMLIiIv2clMxlnXU89VH_5V23NM0U5ICWeIVC-exmZuJQ5zFlutbxi_NREGlTvkGGnCKACeZqBalRPM5RzcoF"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
