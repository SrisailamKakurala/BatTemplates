export interface userTemplateProps {
  id: string;
  title: string;
  category: string;
  createdAt: number;
  authorId: string;
  authorEmail: string;
  description: string;
  githubLink: string;
  isApproved: boolean;
  type: string;
  tags: string;
  techStack: string;
  likes: string[];
  views: number;
}

export interface userFolderProps {
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
  
export interface TableData {
  id: string;
  name: string;
  email: string;
  roles: string[];
  contributions: any[];
  joinedAt: { seconds: number; nanoseconds: number };
  action: string;
  timeStamp: { seconds: number; nanoseconds: number };
  details: string;
}