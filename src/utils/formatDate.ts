/**
 * Formats a Unix timestamp (in seconds) to MM/DD/YYYY format
 * 
 * @param seconds - Unix timestamp in seconds
 * @returns Formatted date string in MM/DD/YYYY format using US locale
 * @throws Will not throw but returns 'Invalid Date' string if input is invalid
 * 
 * @example
 * // Returns "02/27/2025"
 * formatDate(1709251955);
 */
const formatDate = (seconds: number): string => {
  // Check if the input is a valid number and not null/undefined
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return 'Invalid Date';
  }

  const date = new Date(seconds * 1000); // Convert seconds to milliseconds

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}; // "MM/DD/YYYY"

/**
 * Formats a timestamp (in milliseconds) to YYYY-MM-DD format
 * 
 * @param timestamp - Timestamp in milliseconds
 * @returns Formatted date string in YYYY-MM-DD format (ISO date part)
 * @throws Will not throw but returns 'Invalid Date' string if input is invalid
 * 
 * @example
 * // Returns "2025-02-27"
 * formatDailyActivity(1709251955000);
 */
export const formatDailyActivity = (timestamp: number): string => {
  // Check if the input is a valid number and not null/undefined
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return 'Invalid Date';
  }

  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

export default formatDate;