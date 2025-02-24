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
export type DateAnalytics = Record<string, number>; // { "2025-02-21": 10, "2025-02-20": 15 }

// Role distribution type
export type RoleDistribution = Record<string, number>; // { "admin": 2, "user": 500 }

// OS distribution type (used in structures analytics)
export type OSDistribution = Record<string, number>; // { "Windows": 100, "Linux": 80 }

// Top contributor type
export interface TopContributor {
  id: string;
  contributions: number;
}

// Most liked templates / most downloaded structures
export interface MostPopular {
  id: string;
  count: number;
}

// User analytics data
export interface UsersAnalytics {
  totalUsers: number;
  newUsersPerDay: DateAnalytics;
  topContributors: TopContributor[];
  rolesDistribution: RoleDistribution;
}

// Template analytics data
export interface TemplatesAnalytics {
  totalTemplates: number;
  approvedTemplates: number;
  pendingTemplates: number;
  mostPopular: MostPopular;
  mostLikedTemplates: MostPopular[];
}

// Structure analytics data
export interface StructuresAnalytics {
  totalStructures: number;
  mostDownloaded: MostPopular;
  totalDownloads: number;
  osDistribution: OSDistribution;
}

// Global analytics data
export interface GlobalAnalytics {
  totalUsers: number;
  totalTemplates: number;
  totalStructures: number;
  totalViews: number;
  totalDownloads: number;
  dailyActivity: DateAnalytics;
}

// Complete analytics collection type
export interface AnalyticsCollection {
  users: UsersAnalytics | null;
  templates: TemplatesAnalytics | null;
  structures: StructuresAnalytics | null;
  global: GlobalAnalytics | null | undefined;
}
