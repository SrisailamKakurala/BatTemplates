// googleAuth.service.ts
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, signOut } from "@/firebase/firebase.config";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      id: user.uid,
      name: user.displayName || "No Name",
      email: user.email || "",
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified || false,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out Error:", error);
    throw error;
  }
};
