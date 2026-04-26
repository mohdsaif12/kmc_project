"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState("organized");
  const [loading, setLoading] = useState(false);

  // State for Organized
  const [organizedEntries, setOrganizedEntries] = useState<any[]>([]);
  // State for Attended
  const [attendedEntries, setAttendedEntries] = useState<any[]>([]);
  // State for Student Support
  const [supportEntries, setSupportEntries] = useState<any[]>([]);

  // Fetch all data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: organized } = await supabase.from('activities_organized').select('*').order('created_at', { ascending: false });
    const { data: attended } = await supabase.from('activities_attended').select('*').order('created_at', { ascending: false });
    const { data: support } = await supabase.from('student_support_activities').select('*').order('created_at', { ascending: false });
    
    if (organized) setOrganizedEntries(organized);
    if (attended) setAttendedEntries(attended);
    if (support) setSupportEntries(support);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-[#800000]">Academic Activities</h2>
          <p className="text-gray-500 mt-2 text-lg">Centralized management of all university audit records.</p>
        </div>
        {loading && <div className="text-[#B23B25] font-bold animate-pulse">Syncing with Database...</div>}
      </div>

      {/* Tabs Navigation */}
      <div className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit border border-gray-200 whitespace-nowrap">
          <button 
            onClick={() => setActiveTab("organized")}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${activeTab === 'organized' ? 'bg-[#B23B25] text-white shadow-lg' : 'text-gray-600 hover:bg-white'}`}
          >
            1. Activities Organized
          </button>
          <button 
            onClick={() => setActiveTab("attended")}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${activeTab === 'attended' ? 'bg-[#B23B25] text-white shadow-lg' : 'text-gray-600 hover:bg-white'}`}
          >
            2. Activities Attended
          </button>
          <button 
            onClick={() => setActiveTab("support")}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold text-xs md:text-sm transition-all ${activeTab === 'support' ? 'bg-[#B23B25] text-white shadow-lg' : 'text-gray-600 hover:bg-white'}`}
          >
            3. Student Support
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="space-y-12">
        {activeTab === "organized" && (
          <OrganizedModule entries={organizedEntries} onRefresh={fetchData} />
        )}
        {activeTab === "attended" && (
          <AttendedModule entries={attendedEntries} onRefresh={fetchData} />
        )}
        {activeTab === "support" && (
          <SupportModule entries={supportEntries} onRefresh={fetchData} />
        )}
      </div>
    </div>
  );
}

// --- MODULE 1: ORGANIZED ---
function OrganizedModule({ entries, onRefresh }: any) {
  const [form, setForm] = useState({ convener: "", title: "", agency: "", startDate: "", endDate: "", participants: "", theme: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('activities_organized').insert([{
      convener_name: form.convener,
      program_title: form.title,
      sponsoring_agency: form.agency,
      start_date: form.startDate,
      end_date: form.endDate,
      participants_count: parseInt(form.participants),
      theme: form.theme
    }]);

    if (!error) {
      setForm({ convener: "", title: "", agency: "", startDate: "", endDate: "", participants: "", theme: "" });
      onRefresh();
      alert("Successfully saved to database!");
    } else {
      alert("Error saving: " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#B23B25] px-8 py-5 flex justify-between items-center">
          <h3 className="text-white font-bold text-xl">New Organized Activity</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Convener / Coordinator" value={form.convener} onChange={(v) => setForm({...form, convener: v})} />
          <FormField label="Programme Title" value={form.title} onChange={(v) => setForm({...form, title: v})} />
          <FormField label="Sponsoring Agency & Funds" value={form.agency} onChange={(v) => setForm({...form, agency: v})} />
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Start Date" type="date" value={form.startDate} onChange={(v) => setForm({...form, startDate: v})} />
             <FormField label="End Date" type="date" value={form.endDate} onChange={(v) => setForm({...form, endDate: v})} />
          </div>
          <FormField label="Participants" type="number" value={form.participants} onChange={(v) => setForm({...form, participants: v})} />
          <FormField label="Themes (SDG / AI)" value={form.theme} onChange={(v) => setForm({...form, theme: v})} />
          <SubmitButton saving={saving} />
        </form>
      </div>

      <Table 
        headers={["Title", "Convener", "Agency", "Start Date", "End Date", "Participants", "Themes"]}
        data={entries.map((e: any) => [e.program_title, e.convener_name, e.sponsoring_agency, e.start_date, e.end_date, e.participants_count, e.theme])}
      />
    </div>
  );
}

// --- MODULE 2: ATTENDED ---
function AttendedModule({ entries, onRefresh }: any) {
  const [form, setForm] = useState({ teacher: "", title: "", institution: "", startDate: "", endDate: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('activities_attended').insert([{
      teacher_name: form.teacher,
      program_title: form.title,
      organizing_institution: form.institution,
      start_date: form.startDate,
      end_date: form.endDate
    }]);

    if (!error) {
      setForm({ teacher: "", title: "", institution: "", startDate: "", endDate: "" });
      onRefresh();
      alert("Successfully saved to database!");
    } else {
      alert("Error saving: " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#B23B25] px-8 py-5 flex justify-between items-center">
          <h3 className="text-white font-bold text-xl">New Attended Activity</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Name of Teacher" value={form.teacher} onChange={(v) => setForm({...form, teacher: v})} />
          <FormField label="Title of Programme" value={form.title} onChange={(v) => setForm({...form, title: v})} />
          <FormField label="Organizing Institution" value={form.institution} onChange={(v) => setForm({...form, institution: v})} />
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Start Date" type="date" value={form.startDate} onChange={(v) => setForm({...form, startDate: v})} />
             <FormField label="End Date" type="date" value={form.endDate} onChange={(v) => setForm({...form, endDate: v})} />
          </div>
          <SubmitButton saving={saving} />
        </form>
      </div>

      <Table 
        headers={["Programme Title", "Teacher Name", "Institution", "Start Date", "End Date"]}
        data={entries.map((e: any) => [e.program_title, e.teacher_name, e.organizing_institution, e.start_date, e.end_date])}
      />
    </div>
  );
}

// --- MODULE 3: STUDENT SUPPORT ---
function SupportModule({ entries, onRefresh }: any) {
  const [form, setForm] = useState({ activity: "", purpose: "", coordinator: "", funds: "", students: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('student_support_activities').insert([{
      activity_name: form.activity,
      purpose: form.purpose,
      coordinator_name: form.coordinator,
      funds_utilized: form.funds,
      students_engaged: parseInt(form.students)
    }]);

    if (!error) {
      setForm({ activity: "", purpose: "", coordinator: "", funds: "", students: "" });
      onRefresh();
      alert("Successfully saved to database!");
    } else {
      alert("Error saving: " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#B23B25] px-8 py-5 flex justify-between items-center">
          <h3 className="text-white font-bold text-xl">New Student Support Activity</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Name of Activity" value={form.activity} onChange={(v) => setForm({...form, activity: v})} />
          <FormField label="Purpose" value={form.purpose} onChange={(v) => setForm({...form, purpose: v})} />
          <FormField label="Programme Coordinator" value={form.coordinator} onChange={(v) => setForm({...form, coordinator: v})} />
          <FormField label="Funds Utilized" value={form.funds} onChange={(v) => setForm({...form, funds: v})} />
          <FormField label="Students Engaged" type="number" value={form.students} onChange={(v) => setForm({...form, students: v})} />
          <SubmitButton saving={saving} />
        </form>
      </div>

      <Table 
        headers={["Activity Name", "Purpose", "Coordinator", "Funds", "Students"]}
        data={entries.map((e: any) => [e.activity_name, e.purpose, e.coordinator_name, e.funds_utilized, e.students_engaged])}
      />
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function FormField({ label, type = "text", value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <input 
        required
        type={type}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#B23B25] focus:border-transparent outline-none transition-all shadow-sm hover:border-gray-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SubmitButton({ saving }: { saving: boolean }) {
  return (
    <div className="md:col-span-2 pt-4">
      <button 
        disabled={saving}
        type="submit"
        className={`w-full ${saving ? 'bg-gray-400' : 'bg-[#B23B25] hover:bg-[#800000]'} text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-[#B23B25]/20 transition-all transform hover:-translate-y-1 active:scale-95`}
      >
        {saving ? 'Saving...' : 'Add Record to Dashboard'}
      </button>
    </div>
  );
}

function Table({ headers, data }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h: string) => (
                <th key={h} className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-[#FFF9E6]/30 transition-colors">
                {row.map((cell: any, j: number) => (
                  <td key={j} className={`px-8 py-6 text-sm ${j === 0 ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                    {cell === null ? '-' : cell.toString()}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                  No records found. Fill the form above to add your first entry.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
