// middleware/authMiddleware.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../store/authStore";
import useUtilsStore from "../store/utilsStore";

// Utility to read cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Middleware to check access token and update auth state
const authMiddleware = async () => {
  const auth = getAuth();
  const accessToken = getCookie("accessToken");

  const setLoading = useUtilsStore.getState().setLoading;

  setLoading(true); // Start loading

  if (accessToken) {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const user = {
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email!,
          photoURL: currentUser.photoURL,
          emailVerified: currentUser.emailVerified,
        };

        // Update Zustand store
        useAuthStore.getState().signIn(user);
        console.log("User authenticated via accessToken cookie");
        setLoading(false); // Stop loading
        return;
      }
    } catch (error) {
      console.error("Token verification failed or user not logged in:", error);
    }
  }

  console.log("Refreshing Firebase authentication...");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email!,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      // Update Zustand store
      useAuthStore.getState().signIn(userData);
      console.log("User authenticated via Firebase");
    } else {
      useAuthStore.getState().signOut();
      console.log("User not authenticated");
    }
    setLoading(false); // Stop loading
  });
};

export default authMiddleware;
