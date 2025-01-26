export interface Template {
    id?: string; // Make id optional
    title: string;
    description: string;
    techStack: string;
    tags: string;
    category: string;
    githubLink: string;
    likes: number;
    author: string;
    authorEmail: string;
    isApproved: boolean;
    createdAt: number;
    reviewedAt: number | null;
  }