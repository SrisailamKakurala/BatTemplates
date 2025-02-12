import React from "react"


interface FoldersFormProps {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
    title: string;
    description: string;
    techStack: string;
    tags: string;
    category: string;
    githubLink: string;
}

const StructuresForm: React.FC<FoldersFormProps> = ({ setFormVisible }) => {
  return (
    <div>StructuresForm</div>
  )
}

export default StructuresForm