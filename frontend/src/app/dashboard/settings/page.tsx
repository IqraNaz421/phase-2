// 'use client';

// import React, { useState } from 'react';
// import { 
//   User, Bell, Lock, ShieldCheck, 
//   Save, Mail, Zap, Camera, RefreshCw
// } from 'lucide-react';

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isSaving, setIsSaving] = useState(false);

//   const handleSave = () => {
//     setIsSaving(true);
//     setTimeout(() => setIsSaving(false), 1500);
//   };

//   const tabs = [
//     { id: 'profile', icon: <User size={18} />, label: 'OPERATOR PROFILE' },
//     { id: 'security', icon: <Lock size={18} />, label: 'SECURITY PROTOCOLS' },
//     { id: 'notifications', icon: <Bell size={18} />, label: 'ALERT SYSTEM' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#09090b] p-10 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* HEADER SECTION */}
//         <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
//           <div>
//             <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Settings</h1>
//             <div className="flex items-center gap-3 mt-4">
//               <span className="h-px w-8 bg-purple-600"></span>
//               <p className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase italic">System Configuration & Identity</p>
//             </div>
//           </div>
//           <button 
//             onClick={handleSave}
//             className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95"
//           >
//             {isSaving ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
//             {isSaving ? "Syncing..." : "Commit Changes"}
//           </button>
//         </header>

//         <div className="grid grid-cols-12 gap-12">
          
//           {/* LEFT: NAVIGATION TABS */}
//           <div className="col-span-4 space-y-3">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest transition-all border ${
//                   activeTab === tab.id 
//                     ? 'bg-purple-600/10 border-purple-500/40 text-purple-400 shadow-xl shadow-purple-900/10' 
//                     : 'bg-[#111114]/50 border-white/[0.03] text-slate-500 hover:text-slate-200 hover:bg-[#16161a]'
//                 }`}
//               >
//                 <span className={activeTab === tab.id ? 'text-purple-400' : 'text-slate-600'}>{tab.icon}</span>
//                 {tab.label}
//               </button>
//             ))}

//             {/* QUICK STAT CARD */}
//             <div className="mt-10 p-6 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/10">
//               <Zap className="text-purple-500 mb-3" size={20} />
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">System Status</p>
//               <p className="text-xl font-black text-white mt-1 italic">ENCRYPTED</p>
//             </div>
//           </div>

//           {/* RIGHT: CONTENT PANEL */}
//           <div className="col-span-8 bg-[#111114] border border-white/5 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
//             {/* Background Glow */}
//             <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

//             {activeTab === 'profile' && (
//               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                
//                 {/* Profile Picture Section */}
//                 <div className="flex items-center gap-8 mb-10">
//                   <div className="relative group">
//                     <div className="w-24 h-24 rounded-full bg-[#09090b] border-2 border-purple-500/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-purple-500">
//                       <User size={40} className="text-slate-700 group-hover:text-purple-400 transition-colors" />
//                     </div>
//                     <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-2 border-[#111114] text-white hover:bg-purple-500 transition-all">
//                       <Camera size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-black text-white tracking-tight italic uppercase">Operator Identity</h4>
//                     <p className="text-[11px] text-slate-500 font-medium mt-1">Update your personal clearance details.</p>
//                   </div>
//                 </div>

//                 {/* FORM FIELDS - Aligned and Balanced */}
//                 <div className="grid grid-cols-2 gap-8">
//                   <div className="space-y-3">
//                     <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Call Sign (Full Name)</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Alexander Knight" 
//                       className="w-full bg-[#080809] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-800"
//                     />
//                   </div>
//                   <div className="space-y-3">
//                     <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Rank (Occupation)</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Senior Architect" 
//                       className="w-full bg-[#080809] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Secure Channel (Email)</label>
//                   <div className="relative">
//                     <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
//                     <input 
//                       type="email" 
//                       placeholder="operator@mission-control.io" 
//                       className="w-full bg-[#080809] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] ml-1">Mission Objective (Bio)</label>
//                   <textarea 
//                     rows={3} 
//                     placeholder="Briefly describe your operational focus..." 
//                     className="w-full bg-[#080809] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-slate-800"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Other tabs can be added here with same structure */}
//             {activeTab !== 'profile' && (
//               <div className="h-64 flex flex-col items-center justify-center text-center opacity-20 italic">
//                 <ShieldCheck size={48} className="mb-4 text-purple-500" />
//                 <p className="text-sm font-bold tracking-widest uppercase">Protocol Under Development</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













'use client';

import React, { useState } from 'react';
import { 
  User, Lock, Bell, Save, Mail, Camera, RefreshCw, 
  Fingerprint, CircleUser, ShieldAlert 
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] p-4 md:p-10 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Command Center</h1>
            <p className="text-[10px] text-purple-500 font-black tracking-[0.3em] uppercase mt-2">System Identity & Security</p>
          </div>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-3"
          >
            {isSaving ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
            {isSaving ? "SYNCING..." : "SAVE CHANGES"}
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: TAB NAVIGATION */}
          <div className="w-full lg:w-[280px] space-y-3">
            {[
              { id: 'profile', label: 'OPERATOR PROFILE', icon: <User size={18}/> },
              { id: 'security', label: 'SECURITY PROTOCOLS', icon: <Lock size={18}/> },
              { id: 'notifications', label: 'ALERT SYSTEM', icon: <Bell size={18}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-purple-600/10 border-purple-500/40 text-purple-400 shadow-lg' 
                    : 'bg-[#111114] border-white/5 text-slate-500 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT: MAIN CONTENT AREA */}
          <div className="flex-1 bg-[#111114] border border-white/5 rounded-[32px] p-6 md:p-10 shadow-2xl overflow-hidden">
            
            {/* PROFILE CONTENT */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* Profile Banner */}
                <div className="flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                      <CircleUser size={45} className="text-purple-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-purple-600 p-2 rounded-lg border-2 border-[#111114]">
                      <Camera size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white italic uppercase leading-none text-purple-400">OPERATOR ID: 0921</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Clearance Level 5</p>
                  </div>
                </div>

                {/* INPUT FIELDS - Overlap Fixed Here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Call Sign (Full Name)</label>
                    <input type="text" defaultValue="Iqra" className="w-full bg-[#080809] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Operational Rank</label>
                    <input type="text" placeholder="Lead Architect" className="w-full bg-[#080809] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Secure Channel (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                    <input type="email" defaultValue="iqra@mission-control.io" className="w-full bg-[#080809] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Mission Intelligence (Bio)</label>
                  <textarea rows={4} defaultValue="Establishing task management excellence..." className="w-full bg-[#080809] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none font-mono" />
                </div>
              </div>
            )}

            {/* SECURITY CONTENT (Not Blank Anymore) */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl flex gap-4">
                  <ShieldAlert className="text-amber-500 shrink-0" size={20} />
                  <p className="text-[11px] text-slate-400 italic font-medium">Attention: Your current authorization code is 60 days old. For maximum security, rotate your access keys.</p>
                </div>
                <div className="flex flex-col gap-6 max-w-md">
                   <div className="flex flex-col gap-3">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Current Access Code</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-[#080809] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50" />
                   </div>
                   <div className="flex flex-col gap-3">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">New Secure Key</label>
                      <input type="password" placeholder="Minimum 12 characters" className="w-full bg-[#080809] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50" />
                   </div>
                   <button className="text-purple-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all text-left underline underline-offset-4">Enable Biometric Login</button>
                </div>
              </div>
            )}

            {/* ALERT SYSTEM (Not Blank Anymore) */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {[
                  { title: "Critical Transmissions", desc: "Notify me on mission failures and priority tasks." },
                  { title: "Network Updates", desc: "Receive alerts for team collaborations." },
                  { title: "Daily Debrief", desc: "A summary of completed objectives every 24h." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-bold text-white uppercase italic tracking-tighter">{item.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">{item.desc}</p>
                    </div>
                    <div className="w-12 h-6 bg-purple-600/30 rounded-full relative cursor-pointer border border-purple-500/50">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}