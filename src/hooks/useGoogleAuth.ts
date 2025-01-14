// useGoogleAuth.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";

const useGoogleAuth = () => {
  const { signIn } = useAuthStore();
  const { closeModal } = useModalStore();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        id: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
      };

      const accessToken = await user.getIdToken();
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; samesite=strict`;

      signIn({ ...userData });
      console.log("Google Sign-In successful: ", userData);
      closeModal(); // Close the modal after successful sign-in
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  return { handleGoogleSignIn };
};

export default useGoogleAuth;