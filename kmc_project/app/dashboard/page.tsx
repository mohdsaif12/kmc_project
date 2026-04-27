"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ActivityRecord {
  id: string;
  type: string;
  title: string;
  date: string;
  category: string;
  created_at: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalActivities: 0,
    totalParticipants: 0,
    recentSubmissionsCount: 0,
  });
  const [recentActivities, setRecentActivities] = useState<ActivityRecord[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: organized } = await supabase.from('activities_organized').select('*');
        const { data: attended } = await supabase.from('activities_attended').select('*');
        const { data: support } = await supabase.from('student_support_activities').select('*');

        const orgList = organized || [];
        const attList = attended || [];
        const supList = support || [];

        // Calculate metrics
        const totalActivities = orgList.length + attList.length + supList.length;
        
        let totalParticipants = 0;
        orgList.forEach(item => totalParticipants += (item.participants_count || 0));
        supList.forEach(item => totalParticipants += (item.students_engaged || 0));

        // Let's say recent submissions are those created in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const allRecords = [
          ...orgList.map(item => ({
            id: item.id,
            type: 'ORGANIZED',
            title: item.program_title,
            date: item.start_date || item.created_at,
            category: 'Workshop',
            created_at: item.created_at
          })),
          ...attList.map(item => ({
            id: item.id,
            type: 'ATTENDED',
            title: item.program_title,
            date: item.start_date || item.created_at,
            category: 'Conference',
            created_at: item.created_at
          })),
          ...supList.map(item => ({
            id: item.id,
            type: 'SUPPORT',
            title: item.activity_name,
            date: item.created_at,
            category: 'Support',
            created_at: item.created_at
          }))
        ];

        const recentCount = allRecords.filter(r => new Date(r.created_at) > thirtyDaysAgo).length;

        // Sort by created_at desc to get most recent
        allRecords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setMetrics({
          totalActivities,
          totalParticipants,
          recentSubmissionsCount: recentCount
        });

        setRecentActivities(allRecords.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-margin max-w-full">
      {/* Welcome Header */}
      <div className="mb-lg flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-end gap-4 sm:gap-0">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface">Auditor Dashboard</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
            Welcome back. Here is the real-time overview of academic audits.
          </p>
        </div>
        {loading && <div className="text-primary font-bold animate-pulse">Syncing...</div>}
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
        <div className="bg-white border border-gray-200 p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-container"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-gray-500 uppercase tracking-widest">Total Activities</span>
            <span className="material-symbols-outlined text-secondary">analytics</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-headline-md font-headline-md text-on-surface">
              {loading ? "-" : metrics.totalActivities}
            </span>
          </div>
          <p className="text-body-md font-body-md text-gray-400 mt-1">Total recorded items</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-container"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-gray-500 uppercase tracking-widest">Total Participants</span>
            <span className="material-symbols-outlined text-secondary">groups</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-headline-md font-headline-md text-on-surface">
              {loading ? "-" : metrics.totalParticipants.toLocaleString()}
            </span>
          </div>
          <p className="text-body-md font-body-md text-gray-400 mt-1">Across all active programs</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-container"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-gray-500 uppercase tracking-widest">Recent Submissions</span>
            <span className="material-symbols-outlined text-secondary">description</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-headline-md font-headline-md text-on-surface">
              {loading ? "-" : metrics.recentSubmissionsCount}
            </span>
          </div>
          <p className="text-body-md font-body-md text-gray-400 mt-1">Added in the last 30 days</p>
        </div>
      </div>

      {/* Content Bento Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Recent Activities Table */}
        <div className="xl:col-span-2 bg-white border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-title-sm font-title-sm text-on-surface">Recent Activities</h3>
            <a href="/records" className="text-primary text-xs font-semibold hover:underline">View All Activities</a>
          </div>
          <div className="overflow-x-auto">
            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-gray-100">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-on-surface text-sm line-clamp-2 pr-2">{activity.title || "Untitled Activity"}</h4>
                    <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      activity.type === 'ORGANIZED' ? 'bg-red-50 text-red-800' :
                      activity.type === 'ATTENDED' ? 'bg-blue-50 text-blue-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {activity.date ? new Date(activity.date).toLocaleDateString() : "N/A"}
                  </div>
                </div>
              ))}
              {!loading && recentActivities.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">No recent activities found.</div>
              )}
            </div>

            {/* Desktop Table View */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-3 text-label-caps font-label-caps text-gray-500 uppercase tracking-wider">Program Title</th>
                  <th className="px-6 py-3 text-label-caps font-label-caps text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-label-caps font-label-caps text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.map((activity, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-table-data font-table-data font-semibold text-on-surface">{activity.title || "Untitled Activity"}</td>
                    <td className="px-6 py-4 text-table-data font-table-data text-gray-500">
                      {activity.date ? new Date(activity.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        activity.type === 'ORGANIZED' ? 'bg-red-50 text-red-800' :
                        activity.type === 'ATTENDED' ? 'bg-blue-50 text-blue-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {activity.category}
                      </span>
                    </td>
                  </tr>
                ))}
                {!loading && recentActivities.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">No recent activities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Progress & Quick Action Card */}
        <div className="space-y-gutter">
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-title-sm font-title-sm text-on-surface mb-6">Audit Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-semibold text-gray-500 font-label-caps">DOCUMENTATION</span>
                  <span className="text-xs font-bold text-primary">92%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[92%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-semibold text-gray-500 font-label-caps">VERIFICATION</span>
                  <span className="text-xs font-bold text-primary">74%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[74%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-semibold text-gray-500 font-label-caps">COMPLIANCE</span>
                  <span className="text-xs font-bold text-primary">85%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%]"></div>
                </div>
              </div>
            </div>
            <a href="/activities" className="w-full mt-8 bg-primary text-on-primary py-3 px-4 font-bold rounded shadow-sm hover:opacity-90 transition-all flex justify-center items-center">
              <span className="material-symbols-outlined mr-2 text-sm">add</span>
              New Submission
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
