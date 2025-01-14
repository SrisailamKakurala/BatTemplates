// useGoogleAuth.ts
import { signInWithGoogle } from "@/firebase/services/googleAuth.service"; // Import the service
import { auth } from "@/firebase/firebase.config";  // Import auth
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";

const useGoogleAuth = () => {
  const { signIn } = useAuthStore();
  const { closeModal } = useModalStore();

  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle(); // Call the service function
      const { id, name, email, photoURL, emailVerified } = userData; // Destructure user data

      const user = {
        id,
        name,
        email,
        photoURL,  // Include the photoURL
        emailVerified,  // Include the emailVerified status
      };

      const accessToken = await auth.currentUser?.getIdToken(); // Get access token
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; samesite=strict`;

      signIn({ ...user });
      console.log("Google Sign-In successful: ", user);
      closeModal(); // Close the modal after successful sign-in
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  return { handleGoogleSignIn };
};

export default useGoogleAuth;
