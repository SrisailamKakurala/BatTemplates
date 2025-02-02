import { db } from "@/firebase/firebase.config";
import { collection, addDoc, getDocs, query, Timestamp } from "firebase/firestore";
import { fetchUserRoles } from "@/firebase/services/adminServices/userService.service";

const LOGS_COLLECTION = "logs"; // Firestore collection name for logs

// 🔹 Add a log entry to Firestore
export const addLogToFirestore = async ({
  action,
  userId,
  userEmail,
  details,
}: {
  action: string;
  userId: string;
  userEmail: string;
  details: string;
}) => {
  try {
    // Fetch user roles using userId
    const userRoles = await fetchUserRoles(userId);

    // Create log entry with timestamp
    const logData = {
      action,
      userId,
      userEmail,
      details,
      userRoles,
      timestamp: Timestamp.now(),
    };

    // console.log("Log Data:", logData);

    // Add log to Firestore
    await addDoc(collection(db, LOGS_COLLECTION), logData);
    console.log("Log added successfully:", logData);
  } catch (error) {
    console.error("Error adding log:", error);
  }
};

// 🔹 Fetch logs from Firestore
export const fetchLogsFromFirestore = async () => {
  try {
    const logsQuery = query(collection(db, LOGS_COLLECTION));
    const querySnapshot = await getDocs(logsQuery);

    const logs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};
