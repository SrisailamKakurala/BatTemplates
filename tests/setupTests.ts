import { expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock `window.fetch`
global.fetch = vi.fn(() =>
  Promise.resolve(new Response(JSON.stringify({}), { status: 200, statusText: 'OK' }))
);


// Mock `console.error` to prevent test logs from spamming
vi.spyOn(console, 'error').mockImplementation(() => {});
