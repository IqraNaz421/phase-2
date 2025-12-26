// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import Link from 'next/link';

// export default function SignUpPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
  
//   // FIX: isLoading ki jagah isActionLoading use karna hai
//   const { signup, isActionLoading } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Hook se signup function call ho raha hai
//       await signup(name, email, password);
      
//       router.push('/dashboard');
//       router.refresh();
//     } catch (err: any) {
//       setError(err.message || 'Failed to sign up');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
//       <div className="text-center">
//         <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//       </div>

//       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}

//         <div className="rounded-md shadow-sm space-y-3">
//           <div>
//             <input
//               type="text"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Full Name"
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Email address"
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Password"
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={isActionLoading}
//             className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//               isActionLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//           >
//             {isActionLoading ? 'Creating account...' : 'Sign up'}
//           </button>
//         </div>
//       </form>

//       <div className="text-center mt-4">
//         <p className="text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }














'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup, isActionLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signup(name, email, password);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0b2e 50%, #0f0a1e 100%)', 
      padding: '20px', 
      boxSizing: 'border-box', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Subtle Purple Neon Glow */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)', 
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '400px', 
        background: 'white', 
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', 
        padding: '40px', 
        boxSizing: 'border-box',
        zIndex: 1
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#000', margin: '0 0 10px 0' }}>Sign Up</h2>
          <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #9333ea, #a855f7)', margin: '0 auto', borderRadius: '2px' }}></div>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '20px', lineHeight: '1.6' }}>
            Create your account <br/> to get started
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', fontSize: '12px', fontWeight: '600', padding: '12px', borderRadius: '12px', border: '2px solid #fecaca', textAlign: 'center', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Full Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#374151', marginBottom: '8px' }}>
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            style={{ 
              width: '100%', 
              height: '50px', 
              padding: '0 16px', 
              backgroundColor: '#ffffff',
              border: '2px solid #d1d5db',
              borderRadius: '12px', 
              outline: 'none', 
              color: '#000000',
              fontSize: '14px', 
              fontWeight: '500',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
              WebkitTextFillColor: '#000000',
              opacity: 1
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9333ea';
              e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#374151', marginBottom: '8px' }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ 
              width: '100%', 
              height: '50px', 
              padding: '0 16px', 
              backgroundColor: '#ffffff',
              border: '2px solid #d1d5db',
              borderRadius: '12px', 
              outline: 'none', 
              color: '#000000',
              fontSize: '14px', 
              fontWeight: '500',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
              WebkitTextFillColor: '#000000',
              opacity: 1
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9333ea';
              e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#374151', marginBottom: '8px' }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            style={{ 
              width: '100%', 
              height: '50px', 
              padding: '0 16px', 
              backgroundColor: '#ffffff',
              border: '2px solid #d1d5db',
              borderRadius: '12px', 
              outline: 'none', 
              color: '#000000',
              fontSize: '14px', 
              fontWeight: '500',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
              WebkitTextFillColor: '#000000',
              opacity: 1
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9333ea';
              e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isActionLoading}
          style={{ 
            width: '100%', 
            height: '50px', 
            background: isActionLoading ? '#9ca3af' : 'linear-gradient(to right, #9333ea, #a855f7)', 
            color: 'white', 
            fontWeight: '700', 
            fontSize: '13px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: isActionLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(147, 51, 234, 0.4)',
            transition: 'all 0.2s',
            marginTop: '10px'
          }}
          onMouseOver={(e) => !isActionLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {isActionLoading ? 'Creating account...' : 'Sign Up'}
        </button>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link href="/signin" style={{ color: '#9333ea', fontWeight: '700', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}