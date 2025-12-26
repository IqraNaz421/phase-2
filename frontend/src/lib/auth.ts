import { createAuthClient } from 'better-auth/react';

// Initialize Better Auth client
export const authClient = createAuthClient({
  // baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'https://iqoonaz4321-taskneon-app.hf.space',  // Exactly http://localhost:8000
  baseURL: 'https://iqoonaz4321-taskneon-app.hf.space',
  fetchOptions: {
    credentials: 'include', // Include cookies in requests
  }
});

// Export auth client instance
export default authClient;