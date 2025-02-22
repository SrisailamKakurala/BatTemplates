// @/utils/localStorageUtil.ts
// Retrieve user data from auth-storage
export const getUser = () => {
  const authStorage = localStorage.getItem("auth-storage");
  return authStorage ? JSON.parse(authStorage)?.state?.user : null;
};