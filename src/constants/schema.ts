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
  isApproved: boolean;
  downloads: number;
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