// Mock Firebase services 

import { vi } from 'vitest';

export const mockFirebaseAuth = {
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
  
  vi.mock('@/firebase/firebase.config', () => ({
    auth: mockFirebaseAuth,
  }));
  