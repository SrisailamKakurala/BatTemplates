import { db } from "@/firebase/firebase.config";
import { collection, addDoc, query, Timestamp, where, getDocs, deleteDoc, orderBy } from "firebase/firestore";
import { fetchUserRoles } from "@/firebase/services/adminServices/userService.service";

const LOGS_COLLECTION = "logs";

export const addLogToFirestore = async ({
  action,
  userId,
  userEmail,
  details,
}: {
  action: string;
  userId: string;
  userEmail?: string;
  details: string;
}) => {
  try {
    // First, delete old logs
    await deleteOldLogs();

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

    // Add log to Firestore
    await addDoc(collection(db, LOGS_COLLECTION), logData);
    console.log("Log added successfully:", logData);
  } catch (error) {
    console.error("Error adding log:", error);
  }
};

const deleteOldLogs = async () => {
  try {
    // Calculate timestamp for 1 month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneMonthAgoTimestamp = Timestamp.fromDate(oneMonthAgo);

    // Create query for old logs
    const oldLogsQuery = query(
      collection(db, LOGS_COLLECTION),
      where("timestamp", "<=", oneMonthAgoTimestamp)
    );

    // Get old logs
    const oldLogs = await getDocs(oldLogsQuery);

    // Delete each old log
    const deletionPromises = oldLogs.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletionPromises);

    if (oldLogs.size > 0) {
      console.log(`Deleted ${oldLogs.size} logs older than one month`);
    }
  } catch (error) {
    console.error("Error deleting old logs:", error);
  }
};

// 🔹 Fetch logs from Firestore
export const fetchLogsFromFirestore = async () => {
  try {
    // Create a query to fetch logs and order by timestamp (ascending by default)
    const logsQuery = query(collection(db, LOGS_COLLECTION), orderBy("timestamp", "desc")); // Order by timestamp in descending order

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
