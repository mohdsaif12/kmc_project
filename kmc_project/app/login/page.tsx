"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo Logic: Redirect to activities regardless of credentials
    router.push("/activities");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B23B25]/5 rounded-full blur-2xl"></div>
        
        <div className="text-center space-y-4 relative z-10">
          <div className="w-20 h-20 bg-[#B23B25] rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#B23B25]/20">
            U
          </div>
          <h2 className="text-3xl font-extrabold text-[#800000]">Faculty Login</h2>
          <p className="text-gray-500">Access the Academic Audit System</p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#B23B25] focus:border-transparent outline-none transition-all hover:border-gray-300"
                placeholder="teacher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#B23B25] focus:border-transparent outline-none transition-all hover:border-gray-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-[#B23B25] border-gray-300 rounded" />
              <label className="ml-2 text-gray-600">Remember me</label>
            </div>
            <a href="#" className="font-bold text-[#B23B25] hover:text-[#800000]">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B23B25] text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-[#B23B25]/20 hover:bg-[#800000] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="text-center pt-4 relative z-10">
          <p className="text-gray-500 text-sm">
            New Faculty Member? <a href="#" className="font-bold text-[#B23B25] hover:underline">Request Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
