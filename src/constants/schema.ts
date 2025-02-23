export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string | null;
  roles: string[];
  location: string;
  personalLinks: string[];
  noOfContributions: number;
  contributions: Array<{ id: string; type: "template" | "folder"; name: string }>;
  bookmarks: Array<{ id: string; type: "folder" | "template" }>;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  techStack: string;
  tags: string;
  category: string;
  githubLink: string;
  likes: string[];
  type: string;
  author: string;
  authorId: string;
  authorEmail: string;
  isApproved: boolean;
  createdAt: number;
  reviewedAt: number | null;
  views: number;
}

export interface Folder {
  id: string;
  title: string;
  description: string;
  category: string;
  os: string;
  techStack: string;
  howToUse: string;
  createdAt: number;
  authorId: string;
  authorEmail: string;
  downloadLink: string;
  downloads: number;
  images: string[];
  isApproved: boolean;
  likes: string[];
  type: string;
  discussions: DiscussionMessage[];
}

export interface DiscussionMessage {
  message: string;
  authorId: string;
  authorEmail?: string;
  timestamp: number;
  replies?: DiscussionMessage[];
  likes?: number;
}


// General type for date-based analytics (e.g., users per day, downloads per day)
type DateAnalytics = Record<string, number>; // { "2025-02-21": 10, "2025-02-20": 15 }

// Role distribution type
type RoleDistribution = Record<string, number>; // { "admin": 2, "user": 500 }

// OS distribution type (used in structures analytics)
type OSDistribution = Record<string, number>; // { "Windows": 100, "Linux": 80 }

// Top contributor type
interface TopContributor {
  id: string;
  contributions: number;
}

// Most liked templates / most downloaded structures
interface MostPopular {
  id: string;
  count: number;
}

export interface UsersAnalytics {
  totalUsers: number; // Total registered users
  activeUsers: number; // Active users in the last 24 hours
  newUsersPerDay: DateAnalytics; // Users joined per day
  topContributors: TopContributor[]; // List of top contributors
  deletedUsers: number; // Total users deleted
  rolesDistribution: RoleDistribution; // Role counts
}

export interface TemplatesAnalytics {
  totalTemplates: number; // Total number of templates
  approvedTemplates: number; // Templates approved by admin
  pendingTemplates: number; // Templates awaiting review
  mostPopular: MostPopular; // Most liked template
  mostLikedTemplates: MostPopular[]; // List of top liked templates
}

export interface StructuresAnalytics {
  totalStructures: number; // Total structures uploaded
  mostDownloaded: MostPopular; // Most downloaded structure
  downloadsPerDay: DateAnalytics; // Downloads per day
  osDistribution: OSDistribution; // OS usage distribution
}

export interface GlobalAnalytics {
  totalUsers: number; // Overall user count
  totalTemplates: number; // Overall template count
  totalStructures: number; // Overall structure count
  totalViews: number; //overll views for templates
  totalDownloads: number; // Total downloads of structures
  dailyActivity: DateAnalytics; // Total platform activity per day
}

export interface AnalyticsCollection {
  users: UsersAnalytics;
  templates: TemplatesAnalytics;
  structures: StructuresAnalytics;
  global: GlobalAnalytics;
}
