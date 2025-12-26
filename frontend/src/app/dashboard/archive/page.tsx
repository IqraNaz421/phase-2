'use client';
import React, { useState, useEffect } from 'react';
import { Archive, Trash2, CheckCircle2, Calendar } from 'lucide-react';

export default function ArchivePage() {
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Page khulne par data load karo
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('missionArchive') || '[]');
    setArchivedTasks(data);
  }, []);

  // Archive se hamesha ke liye delete karna
  const deletePermanent = (id: number) => {
    const updated = archivedTasks.filter((t: any) => t.id !== id);
    setArchivedTasks(updated);
    localStorage.setItem('missionArchive', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#09090b] p-10 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-white/5 pb-8">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mission Archive</h1>
          <p className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase mt-2 italic">Vault of Completed Tasks</p>
        </header>

        <div className="grid gap-4">
          {archivedTasks.length > 0 ? (
            archivedTasks.map((task: any, index: number) => (
              <div key={index} className="bg-[#111114] border border-white/5 p-6 rounded-[24px] flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white uppercase italic">{task.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                       <Calendar size={12} /> {task.date}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => deletePermanent(task.id)}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 opacity-30 italic uppercase tracking-widest text-xs font-black">
              No Data in the Vault. Complete a mission first!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}