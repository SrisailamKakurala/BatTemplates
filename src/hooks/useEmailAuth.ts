import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createUserInFirestore, getUserFromFirestore } from "@/firebase/services/userServices/user.service";
import { auth } from "@/firebase/firebase.config";
import useAuthStore from "@/store/authStore";
import { User } from "@/store/userStore"; // Import the User type

const useEmailAuth = () => {
  const { signIn } = useAuthStore();

  const registerWithEmail = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userData: User = {
        id: user.uid,
        name,
        email: user.email || '',
        photoURL: user.photoURL || '', // Default empty string if not available
        roles: ["user"], // Default roles for new users
        location: "", // Default empty string
        personalLinks: [], // Default empty array
        noOfContributions: 0, // Default zero
        contributions: [], // Default empty array
        followersCount: 0, // Default zero
        followingCount: 0, // Default zero
        bookmarks: [], // Default empty array
      };

      await createUserInFirestore(userData);

      signIn({ ...userData });
      console.log("Registration successful: ", userData);
    } catch (error) {
      console.error("Registration Error: ", error);
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Fetch the full user data from Firestore
      const userData = await getUserFromFirestore(user.uid);

      if (userData) {
        const typedUser = userData as User;
        signIn({ ...typedUser });
        console.log("Login successful: ", typedUser);
      } else {
        // If no user data found in Firestore, create it with defaults
        const userData: User = {
          id: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          roles: ["user"],
          location: "",
          personalLinks: [],
          noOfContributions: 0,
          contributions: [],
          followersCount: 0,
          followingCount: 0,
          bookmarks: [],
        };
        await createUserInFirestore(userData);

        signIn({ ...userData });
        console.log("Login successful with newly created user: ", userData);
      }
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return { registerWithEmail, loginWithEmail };
};

export default useEmailAuth;
