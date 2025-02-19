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
  os: string;
  title: string;
  category: string;
  createdAt: number;
  authorId: string;
  authorEmail: string;
  description: string;
  downloadLink: string;
  isApproved: boolean;
  techStack: string;
  downloads: number;
  likes: string[];
  howToUse: string;
  structure: string;
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