// src/app/dashboard/layout.tsx
// 'use client';
// import Sidebar from '@/components/dashboard/Sidebar';
// import { useAuth } from '@/hooks/useAuth';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();

//   return (
//     <div className="flex h-screen bg-[#0B0E14] overflow-hidden">
//       {/* Sidebar fixed on the left */}
//       <aside className="w-64 shrink-0 border-r border-white/5 hidden md:block">
//         <Sidebar user={user} />
//       </aside>

//       {/* Main content on the right */}
//       <main className="flex-1 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }







'use client';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0b2e 100%)', 
      overflow: 'hidden' 
    }}>
      
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside 
        style={{ 
          width: '280px', 
          flexShrink: 0, 
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)'
        }} 
        className="hidden md:block"
      >
        <Sidebar user={user} />
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}



