
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LogOut, TrendingUp, Activity, PieChart as PieIcon, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading, signOut } = useAuth(); // Logout function hook se li
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
    efficiency: "0%",
    weeklyStats: []
  });

  const fetchStats = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/stats?user_id=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Dashboard stats fetch error:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchStats();
    }
  }, [user, isLoading]);

  const pieData = [
    { name: 'Completed', value: stats.completed },
    { name: 'Pending', value: stats.pending },
  ];

  const COLORS = ['#9333ea', '#1e293b'];

  if (isLoading) return (
    <div className="h-screen bg-[#09090b] flex items-center justify-center text-purple-500 font-black tracking-[0.5em] animate-pulse">
      SYNCING INTEL...
    </div>
  );

  return (
    <div className="p-6 lg:p-12 bg-[#09090b] min-h-screen text-white">
      
      {/* HEADER WITH LOGOUT */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Mission Insights</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="h-px w-8 bg-purple-600"></span>
            <p className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase">Real-time Performance Metrics</p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={signOut}
          className="group flex items-center gap-3 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 px-6 py-3 rounded-2xl transition-all duration-300"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-red-500 group-hover:text-white">Terminate Session</span>
          <LogOut size={16} className="text-red-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Missions', value: stats.totalTasks, icon: <Activity size={18}/>, color: 'text-blue-400', border: 'border-blue-400/20' },
          { label: 'Successful', value: stats.completed, icon: <Zap size={18}/>, color: 'text-purple-500', border: 'border-purple-500/20' },
          { label: 'Efficiency', value: stats.efficiency, icon: <TrendingUp size={18}/>, color: 'text-emerald-400', border: 'border-emerald-400/20' },
          { label: 'Remaining', value: stats.pending, icon: <AlertCircle size={18} className="rotate-180"/>, color: 'text-amber-400', border: 'border-amber-400/20' },
        ].map((item, i) => (
          <div key={i} className={`bg-[#111114] p-6 rounded-[2rem] border ${item.border} shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
            <div className="relative z-10">
              <div className={`${item.color} mb-4 opacity-50`}>{item.icon}</div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{item.label}</p>
              <p className={`text-3xl font-black tracking-tighter italic ${item.color}`}>{item.value}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] text-white">
               {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* WEEKLY ACTIVITY */}
        <div className="lg:col-span-7 bg-[#111114] p-8 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 italic">Weekly Operational Flow</h2>
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyStats.length > 0 ? stats.weeklyStats : [{name: 'Tasks', tasks: stats.totalTasks}]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}} 
                  contentStyle={{backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '15px', fontSize: '10px'}} 
                />
                <Bar dataKey="tasks" fill="#9333ea" radius={[8, 8, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DISTRIBUTION MAP */}
        <div className="lg:col-span-5 bg-[#111114] p-8 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 italic w-full mb-6">Status Distribution</h2>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black italic">{stats.efficiency}</span>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Efficiency</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.5)]"></div>
              <span className="text-[9px] font-black uppercase text-slate-400">Done</span>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              <span className="text-[9px] font-black uppercase text-slate-400">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple Icon fallback
function AlertCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  )
}






