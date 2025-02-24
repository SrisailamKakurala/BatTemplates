import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { fetchLogsFromFirestore } from "@/firebase/services/adminServices/logService.service";
import Table from "@/components/tableComponents/Table";


const Logs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchAndSetLogs = async () => {
      try {
        const logsData = await fetchLogsFromFirestore();
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchAndSetLogs();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-4 bg-primaryBg">
      {/* Header */}
      <div className="flex md:justify-start justify-center items-center gap-2 md:text-3xl text-2xl font-extrabold text-primary mb-8">
        <FaHistory />
        <h1 className="leading-none">Activity Logs</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scroll-hide rounded-lg shadow-md">
        <Table data={logs} type="logs" />
      </div>
    </div>
  );
};

export default Logs;
