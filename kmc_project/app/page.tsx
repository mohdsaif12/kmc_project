export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-[#FFF9E6] border border-[#B23B25]/20 rounded-full text-[#B23B25] font-semibold text-sm uppercase tracking-wider">
              Centralized Academic Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#800000] leading-tight">
              Digitizing our <br />
              <span className="text-[#B23B25]">Academic Audit</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Eliminate Word files and manual tracking. A structured system for teachers to log organized activities, 
              attended programs, and student support initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="/login" className="bg-[#B23B25] hover:bg-[#800000] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#B23B25]/20 transition-all transform hover:-translate-y-1 text-center">
                Get Started
              </a>
              <button className="border-2 border-gray-200 text-gray-700 hover:border-[#B23B25] hover:text-[#B23B25] px-10 py-4 rounded-xl font-bold text-lg transition-all">
                About System
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="bg-[#FFF9E6]/50 p-8 rounded-3xl border-2 border-dashed border-[#B23B25]/20 relative overflow-hidden">
               <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform cursor-default">
                    <div className="w-12 h-12 bg-[#B23B25] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
                    <div>
                      <p className="font-bold text-gray-800">Activities Organized</p>
                      <p className="text-sm text-gray-500 text-nowrap">Seminars, FDPs, Conferences</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform cursor-default">
                    <div className="w-12 h-12 bg-[#B23B25] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
                    <div>
                      <p className="font-bold text-gray-800">Activities Attended</p>
                      <p className="text-sm text-gray-500 text-nowrap">Teacher training & programs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform cursor-default">
                    <div className="w-12 h-12 bg-[#B23B25] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
                    <div>
                      <p className="font-bold text-gray-800">Student Support</p>
                      <p className="text-sm text-gray-500 text-nowrap">Mentorship & engagement</p>
                    </div>
                  </div>
               </div>
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B23B25]/5 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#B23B25]/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#B23B25] hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#FFF9E6] rounded-full flex items-center justify-center text-[#B23B25] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#800000] mb-4">Centralized Storage</h3>
          <p className="text-gray-600 leading-relaxed">All academic data stored in a single, secure database. No more searching through emails or local folders.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#B23B25] hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#FFF9E6] rounded-full flex items-center justify-center text-[#B23B25] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#800000] mb-4">Fast Data Entry</h3>
          <p className="text-gray-600 leading-relaxed">Intuitive forms designed for quick data entry. Save time with dropdowns and automated date pickers.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#B23B25] hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-[#FFF9E6] rounded-full flex items-center justify-center text-[#B23B25] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#800000] mb-4">Instant Export</h3>
          <p className="text-gray-600 leading-relaxed">Generate academic reports in CSV format instantly. Perfect for annual audits and NAAC submissions.</p>
        </div>
      </div>
    </div>
  );
}
