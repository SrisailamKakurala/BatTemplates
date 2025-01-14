import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import useAuthStore from "@/store/authStore";

const useEmailAuth = () => {
  const { signIn } = useAuthStore();

  const registerWithEmail = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userData = {
        id: user.uid,
        name,
        email: user.email || '',
        photoURL: '',
        emailVerified: user.emailVerified,
      };

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

      const userData = {
        id: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
      };

      signIn({ ...userData });
      console.log("Login successful: ", userData);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return { registerWithEmail, loginWithEmail };
};

export default useEmailAuth;
