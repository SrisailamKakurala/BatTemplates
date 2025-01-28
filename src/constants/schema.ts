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
    authorEmail: string;
    isApproved: boolean;
    createdAt: number;
    reviewedAt: number | null;
  }