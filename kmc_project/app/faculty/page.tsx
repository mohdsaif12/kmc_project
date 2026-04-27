"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ActivityRecord {
  id: string;
  type: string;
  title: string;
  date: string;
  faculty: string;
  category: string;
  created_at: string;
}

export default function FacultyProfilePage() {
  const [loading, setLoading] = useState(true);
  const [facultyName, setFacultyName] = useState("Faculty Member");
  const [records, setRecords] = useState<ActivityRecord[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: organized } = await supabase.from('activities_organized').select('*');
        const { data: attended } = await supabase.from('activities_attended').select('*');
        const { data: support } = await supabase.from('student_support_activities').select('*');

        const orgList = organized || [];
        const attList = attended || [];
        const supList = support || [];

        // Try to find a real faculty name from the DB to make the demo realistic
        let realName = "Dr. Eleanor Vance"; // Fallback
        if (orgList.length > 0 && orgList[0].convener_name) realName = orgList[0].convener_name;
        else if (attList.length > 0 && attList[0].teacher_name) realName = attList[0].teacher_name;
        else if (supList.length > 0 && supList[0].coordinator_name) realName = supList[0].coordinator_name;

        setFacultyName(realName);

        const allRecords = [
          ...orgList.filter(i => i.convener_name === realName).map(item => ({
            id: item.id,
            type: 'ORGANIZED',
            title: item.program_title,
            date: item.start_date || item.created_at,
            faculty: item.convener_name,
            category: 'Seminar Organized',
            created_at: item.created_at
          })),
          ...attList.filter(i => i.teacher_name === realName).map(item => ({
            id: item.id,
            type: 'ATTENDED',
            title: item.program_title,
            date: item.start_date || item.created_at,
            faculty: item.teacher_name,
            category: 'Conference Attended',
            created_at: item.created_at
          })),
          ...supList.filter(i => i.coordinator_name === realName).map(item => ({
            id: item.id,
            type: 'SUPPORT',
            title: item.activity_name,
            date: item.created_at,
            faculty: item.coordinator_name,
            category: 'Student Support',
            created_at: item.created_at
          }))
        ];

        allRecords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setRecords(allRecords);
      } catch (error) {
        console.error("Error fetching faculty records:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-10 pb-16 pt-8">
      {/* Profile Header Section */}
      <div className="mb-8">
        <div className="academic-card p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
          <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-surface-container-high shrink-0">
            <img 
              alt="Faculty Portrait" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsU_65JIVmrtrWaPhkPLExudN7IaAVH_UcIeA1uGteuZ83Fqm44vTI7k5k3hiUknihm8tNR2VLtq5Wf-0b7-QbnLsFfjcfCP8yckfvKkDLGXRVr1Qxphu3SMRvAc02x6jaW_AnihVQzhZeQ4ZfeSUgZIWZzIJrbEMUwIczleA_HvIEY_xaiTwmQD3a-uKJsD0fu5_UYTgxOixKfTPsmxaH68MPXhWEQg6B3NG_XaMvwfpsSkUf8EChi1SjA7Onj7MIYl_pOE6O"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="font-display-lg text-display-lg text-primary-container mb-1">
                  {loading ? "Loading..." : facultyName}
                </h1>
                <p className="font-title-sm text-title-sm text-secondary-fixed-dim mb-4">Faculty • Khwaja Moinuddin Chishti Language University</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="font-body-md text-body-md">faculty@kmclu.ac.in</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span className="font-body-md text-body-md">Academic Block</span>
                  </div>
                </div>
              </div>
              <button className="bg-primary text-white px-5 py-2 rounded-lg flex items-center gap-2 font-label-caps hover:opacity-90 transition-all shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-gutter">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="academic-card p-5 rounded-lg gold-accent shadow-sm">
            <span className="font-label-caps text-label-caps text-gray-500 block mb-2 uppercase">TOTAL ACTIVITIES</span>
            <span className="font-display-lg text-display-lg text-primary-container">{loading ? "-" : records.length}</span>
          </div>
          <div className="academic-card p-5 rounded-lg gold-accent shadow-sm">
            <span className="font-label-caps text-label-caps text-gray-500 block mb-2 uppercase">ORGANIZED</span>
            <span className="font-display-lg text-display-lg text-primary-container">{loading ? "-" : records.filter(r => r.type === "ORGANIZED").length}</span>
          </div>
          <div className="academic-card p-5 rounded-lg gold-accent shadow-sm">
            <span className="font-label-caps text-label-caps text-gray-500 block mb-2 uppercase">ATTENDED</span>
            <span className="font-display-lg text-display-lg text-primary-container">{loading ? "-" : records.filter(r => r.type === "ATTENDED").length}</span>
          </div>
          <div className="academic-card p-5 rounded-lg gold-accent shadow-sm">
            <span className="font-label-caps text-label-caps text-gray-500 block mb-2 uppercase">STUDENTS SUPPORTED</span>
            <span className="font-display-lg text-display-lg text-primary-container">{loading ? "-" : records.filter(r => r.type === "SUPPORT").length}</span>
          </div>
        </div>

        {/* Audit Activity Log */}
        <div className="academic-card rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 bg-surface-container border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-tertiary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              Recent Audit Activity
            </h3>
            <div className="flex gap-2">
              <button className="bg-white border border-outline-variant px-3 py-1.5 rounded text-[12px] font-label-caps flex items-center gap-1 hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                FILTER
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 font-label-caps text-label-caps text-gray-500">DATE</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-gray-500">ACTIVITY TYPE</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-gray-500">PROGRAM TITLE</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-gray-500">RECORD ID</th>
                </tr>
              </thead>
              <tbody className="font-table-data text-table-data">
                {records.map((record, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">
                      {record.date ? new Date(record.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">{record.category}</td>
                    <td className="px-6 py-4 text-gray-600">{record.title}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">{record.id.substring(0, 8)}</td>
                  </tr>
                ))}
                {!loading && records.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No activities found for this faculty member.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
