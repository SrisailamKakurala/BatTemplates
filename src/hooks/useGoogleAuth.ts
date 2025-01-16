import { signInWithGoogle } from "@/firebase/services/authServices/googleAuth.service";
import { createUserInFirestore, getUserFromFirestore } from "@/firebase/services/userServices/user.service";
import { auth } from "@/firebase/firebase.config";
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";
import useUserStore, { User } from "@/store/userStore"; // Import the user store and type
import { useToast } from "@/hooks/ui/useToast"; // Import the useToast hook

const useGoogleAuth = () => {
  const { signIn } = useAuthStore();
  const { closeModal } = useModalStore();
  const { setUser } = useUserStore(); // Destructure the setUser method
  const { addToast } = useToast(); // Destructure addToast to show toasts

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google and get basic user info
      const userData = await signInWithGoogle();
      const { id, name, email, photoURL } = userData;

      // Creating a new user in Firestore if not exists
      const user: User = {
        id,
        name,
        email,
        photoURL,
        roles: ["user"],
        location: "🌍 planet earth", // Default empty
        personalLinks: [], // Default empty
        noOfContributions: 0, // Default zero
        contributions: [], // Default empty array
        followersCount: 0, // Default zero
        followingCount: 0, // Default zero
        bookmarks: [], // Default empty array
      };

      await createUserInFirestore(user);

      // Fetching the full user data (including dynamic fields)
      const fullUserData = await getUserFromFirestore(id);

      if (fullUserData) {
        // Ensure the fullUserData is typed as User
        const typedUser = fullUserData as User;

        // Set user in the store
        setUser(typedUser); // Update the user state in the store

        // Sign-in action
        signIn({ ...typedUser });
        console.log("Google Sign-In successful: ", typedUser);

        // Show success toast
        addToast("Google Sign-In successful!", "success");
      }

      // Store access token in cookies
      const accessToken = await auth.currentUser?.getIdToken();
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; samesite=strict`;

      // Close the modal after successful sign-in
      closeModal();
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      
      // Show error toast
      addToast("Error during Google Sign-In. Please try again.", "error");
    }
  };

  return { handleGoogleSignIn };
};

export default useGoogleAuth;
