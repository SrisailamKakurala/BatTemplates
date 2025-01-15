// utils/localStorageUtil.ts
export const getAuthStorage = (): any => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("auth-storage");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };
  