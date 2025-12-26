'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Clock, Plus, Zap, AlertCircle 
} from 'lucide-react';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar dates calculate karne ki logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Mock Events
  const events = [
    { day: 12, title: "Database Sync", type: "critical" },
    { day: 20, title: "UI Review", type: "normal" },
    { day: 24, title: "Final Deployment", type: "urgent" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] p-6 lg:p-12 text-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Mission Schedule</h1>
            <p className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase mt-3 italic">Temporal Objective Tracking</p>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2">
            <Plus size={14} /> New Entry
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: CALENDAR GRID */}
          <div className="lg:col-span-8 bg-[#111114] border border-white/5 rounded-[40px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                {monthNames[currentDate.getMonth()]} <span className="text-purple-500">{currentDate.getFullYear()}</span>
              </h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-slate-500 hover:text-white transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-slate-500 hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* DAYS NAME */}
            <div className="grid grid-cols-7 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-[9px] font-black text-slate-600 uppercase text-center tracking-widest">{d}</div>
              ))}
            </div>

            {/* DATES GRID */}
            <div className="grid grid-cols-7 gap-2">
              {blanks.map(b => <div key={`b-${b}`} className="aspect-square"></div>)}
              {days.map(d => {
                const hasEvent = events.find(e => e.day === d);
                return (
                  <div key={d} className={`aspect-square border border-white/[0.03] rounded-2xl flex flex-col items-center justify-center relative group cursor-pointer transition-all hover:bg-purple-600/10 hover:border-purple-500/30 ${d === 26 ? 'bg-purple-600/10 border-purple-500/50' : 'bg-black/20'}`}>
                    <span className={`text-sm font-bold ${d === 26 ? 'text-purple-400' : 'text-slate-400'}`}>{d}</span>
                    {hasEvent && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${hasEvent.type === 'urgent' ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-purple-500 shadow-[0_0_8px_purple]'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: UPCOMING BRIEFING */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111114] border border-white/5 rounded-[32px] p-6">
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                <Clock size={16} className="text-purple-500" /> Upcoming Intel
              </h3>
              <div className="space-y-4">
                {events.map((event, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-2xl group hover:border-purple-500/40 transition-all">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Dec {event.day}, 2025</p>
                    <h4 className="text-sm font-bold text-white mt-1 group-hover:text-purple-400 transition-colors italic">{event.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-600/5 border border-purple-500/10 rounded-[32px] p-8 relative overflow-hidden group">
              <Zap className="absolute -right-4 -bottom-4 text-purple-500/10 rotate-12 group-hover:scale-110 transition-transform" size={120} />
              <div className="relative z-10">
                <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.3em]">Operational Tip</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed italic">"Consistency is the fuel for mission success. Archive completed goals to maintain focus."</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}