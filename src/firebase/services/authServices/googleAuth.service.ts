// googleAuth.service.ts
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";
import { updateDailyActivity } from "@/firebase/services/analytics/dailyActivity.service";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await updateDailyActivity();

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

