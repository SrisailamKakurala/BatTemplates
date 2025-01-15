// middleware/authMiddleware.ts
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthStore from "@/store/authStore";
import useUtilsStore from "@/store/utilsStore";
import { getUserFromFirestore } from "@/firebase/services/userServices/user.service"; // Use the correct import

// Utility to read cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Function to save user data to localStorage
const saveUserToLocalStorage = (userData: any) => {
  try {
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data to localStorage:", error);
  }
};

// Function to get user data from localStorage
const getUserFromLocalStorage = (): any | null => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error reading user data from localStorage:", error);
    return null;
  }
};

// Middleware to check access token and update auth state
const authMiddleware = async () => {
  const auth = getAuth();
  const accessToken = getCookie("accessToken");

  const setLoading = useUtilsStore.getState().setLoading;
  setLoading(true); // Start loading

  let userFromStorage = getUserFromLocalStorage();

  if (userFromStorage) {
    // User data exists in localStorage, update Zustand store with that data
    useAuthStore.getState().signIn(userFromStorage);
    console.log("User data loaded from localStorage");
    setLoading(false); // Stop loading
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
          // Combine user data and save to localStorage
          const fullUserData = { ...user, ...userData };
          saveUserToLocalStorage(fullUserData); // Save to localStorage

          // Update Zustand store with user data
          useAuthStore.getState().signIn(fullUserData);

          console.log("User authenticated via accessToken cookie");
        } else {
          console.log("User data not found");
        }

        setLoading(false); // Stop loading
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
        const fullUserData = { ...userData, ...additionalData };

        // Save to localStorage for persistence
        saveUserToLocalStorage(fullUserData);

        // Update Zustand store with user data
        useAuthStore.getState().signIn(fullUserData);

        console.log("User authenticated via Firebase");
      } else {
        console.log("User data not found");
      }
    } else {
      useAuthStore.getState().signOut();
      console.log("User not authenticated");
    }
    setLoading(false); // Stop loading
  });
};

export default authMiddleware;
