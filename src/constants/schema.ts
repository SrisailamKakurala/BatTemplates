export interface Template {
  id: string;
  title: string;
  description: string;
  techStack: string;
  tags: string;
  category: string;
  githubLink: string;
  likes: string[];
  author: string;
  authorId: string;
  authorEmail: string;
  isApproved: boolean;
  createdAt: number;
  reviewedAt: number | null;
}

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