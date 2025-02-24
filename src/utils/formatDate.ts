const formatDate = (seconds: number) => {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const formatDailyActivity = (timestamp: number) => {
  return new Date(timestamp).toISOString().split("T")[0]; // "YYYY-MM-DD"
};


export default formatDate;