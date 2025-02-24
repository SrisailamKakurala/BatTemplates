import { GlobalAnalytics } from "@/constants/schema";
import { formatDailyActivity } from "@/utils/formatDate";
import {FaUsers, FaFolderOpen, FaRecycle, FaDownload, FaEye, FaChartLine} from "react-icons/fa"

const OverviewCard = ({ totalDownloads, totalStructures, totalTemplates, totalUsers, totalViews, dailyActivity }: GlobalAnalytics) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaChartLine className="text-primary text-lg" />
          <h1 className="text-lg">Daily Activity</h1>
          <p className="font-bold text-2xl">
            {dailyActivity?.[formatDailyActivity(Date.now())] ?? "N/A"}
          </p>
        </div>
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaUsers className="text-primary text-lg" />
          <h1 className="text-lg">Total Users</h1>
          <p className="font-bold text-2xl">{totalUsers ?? "N/A"}</p>
        </div>
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaFolderOpen className="text-primary text-lg" />
          <h1 className="text-lg">Total Structures</h1>
          <p className="font-bold text-2xl">{totalStructures ?? "N/A"}</p>
        </div>
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaDownload className="text-primary text-lg" />
          <h1 className="text-lg">Total Downloads</h1>
          <p className="font-bold text-2xl">{totalDownloads ?? "N/A"}</p>
        </div>
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaRecycle className="text-primary text-lg" />
          <h1 className="text-lg">Total Templates</h1>
          <p className="font-bold text-2xl">{totalTemplates ?? "N/A"}</p>
        </div>
        <div className="p-5 border-4 border-primary text-white rounded-lg flex flex-col gap-1 justify-center items-center">
          <FaEye className="text-primary text-lg" />
          <h1 className="text-lg">Total Views</h1>
          <p className="font-bold text-2xl">{totalViews ?? "N/A"}</p>
        </div>
      </div>
    );
};

export default OverviewCard;
