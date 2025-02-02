export interface userTemplateProps {
  id: string;
  title: string;
  category: string;
  createdAt: number;
  createdBy: string;
  authorId: string;
  description: string;
  githubLink: string;
  isApproved: boolean;
  type: string;
  techStack: string;
}

export interface userFodlerProps {
  id: string;
  type: string;
  name: string;
  description: string;
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