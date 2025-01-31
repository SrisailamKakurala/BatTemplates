import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createUserInFirestore, getUserFromFirestore } from "@/firebase/services/userServices/user.service";
import { auth } from "@/firebase/firebase.config";
import useAuthStore from "@/store/authStore";
import { User } from "@/store/userStore";
import { useToast } from "@/hooks/ui/useToast"; // Import useToast hook

const useEmailAuth = () => {
  const { signIn } = useAuthStore();
  const { addToast } = useToast(); // Hook to add toast notifications

  const registerWithEmail = async (name: string, email: string, password: string): Promise<void> => {
    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Create user data object for Firestore
      const userData: User = {
        id: user.uid,
        name,
        email: user.email || '',
        photoURL: user.photoURL || '',
        roles: ["user"],
        location: "🌍 planet earth", // Default location
        personalLinks: [], // Default personal links
        noOfContributions: 0, // Default number of contributions
        contributions: [], // Default empty contributions
        bookmarks: [], // Default empty bookmarks
      };

      // Store user in Firestore
      await createUserInFirestore(userData);

      // Sign the user in after successful registration
      signIn({ ...userData });
      
      // Show success toast
      addToast("Registration successful", "success");

      console.log("Registration successful: ", userData);
    } catch (error) {
      console.error("Registration Error: ", error);
      addToast("Registration failed. Please try again.", "error");
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      // Sign in with email and password
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Fetch the full user data from Firestore
      const userData = await getUserFromFirestore(user.uid);

      if (userData) {
        const typedUser = userData as User;
        
        // Sign the user in with Firestore data
        signIn({ ...typedUser });
        
        // Show success toast
        addToast("Login successful", "success");
        console.log("Login successful: ", typedUser);
      } else {
        // If no user data found, create a new user record
        const userData: User = {
          id: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          roles: ["user"],
          location: "🌍 planet earth",
          personalLinks: [],
          noOfContributions: 0,
          contributions: [],
          bookmarks: [],
        };
        
        // Create user record in Firestore
        await createUserInFirestore(userData);
        
        // Sign the user in with the newly created data
        signIn({ ...userData });
        
        // Show success toast
        addToast("Login successful with new user", "success");
        console.log("Login successful with newly created user: ", userData);
      }
    } catch (error) {
      console.error("Login Error: ", error);
      addToast("Invalid Credentials", "error");
    }
  };

  return { registerWithEmail, loginWithEmail };
};

export default useEmailAuth;
