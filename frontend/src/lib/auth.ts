import { createAuthClient } from 'better-auth/react';

// Initialize Better Auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8001',  // Exactly http://localhost:8000
  fetchOptions: {
    credentials: 'include', // Include cookies in requests
  }
});

// Export auth client instance
export default authClient;