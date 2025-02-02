// middleware/authMiddleware.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "@/store/authStore";
import useUtilsStore from "@/store/utilsStore";
import { getUserFromFirestore } from "@/firebase/services/userServices/user.service";

// Utility to read cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Function to save auth data to localStorage
const saveAuthToLocalStorage = (authData: any) => {
  try {
    localStorage.setItem("auth-storage", JSON.stringify(authData));
  } catch (error) {
    console.error("Error saving auth data to localStorage:", error);
  }
};

// Function to get auth data from localStorage
const getAuthFromLocalStorage = (): any | null => {
  try {
    const authData = localStorage.getItem("auth-storage");
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error("Error reading auth data from localStorage:", error);
    return null;
  }
};

// Middleware to check authentication state
const authMiddleware = async () => {
  const auth = getAuth();
  const accessToken = getCookie("accessToken");

  const setLoading = useUtilsStore.getState().setLoading;
  setLoading(true); // Start loading

  let authFromStorage = getAuthFromLocalStorage();

  if (authFromStorage && authFromStorage.state?.isAuthenticated) {
    // Load user data from localStorage into Zustand
    useAuthStore.getState().signIn(authFromStorage.state.user);
    console.log("User data loaded from localStorage");
    setLoading(false);
    return;
  }

  if (accessToken) {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const user = {
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email!,
          photoURL: currentUser.photoURL,
        };

        // Fetch additional user data from Firestore
        const userData = await getUserFromFirestore(currentUser.uid);

        if (userData) {
          const authData = {
            state: {
              isAuthenticated: true,
              user: { ...user, ...userData },
            },
            version: 0,
          };

          saveAuthToLocalStorage(authData);
          useAuthStore.getState().signIn(authData.state.user);

          console.log("User authenticated via accessToken cookie");
        } else {
          console.log("User data not found");
        }

        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Token verification failed or user not logged in:", error);
    }
  }

  console.log("Refreshing Firebase authentication...");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email!,
        photoURL: user.photoURL,
      };

      // Fetch additional user data from Firestore
      const additionalData = await getUserFromFirestore(user.uid);

      if (additionalData) {
        const authData = {
          state: {
            isAuthenticated: true,
            user: { ...userData, ...additionalData },
          },
          version: 0,
        };

        saveAuthToLocalStorage(authData);
        useAuthStore.getState().signIn(authData.state.user);

        console.log("User authenticated via Firebase");
      } else {
        console.log("User data not found");
      }
    } else {
      useAuthStore.getState().signOut();
      console.log("User not authenticated");
    }
    setLoading(false);
  });
};

export default authMiddleware;
