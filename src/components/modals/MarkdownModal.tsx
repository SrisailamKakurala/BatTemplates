import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables tables, strikethrough, etc.
import { FaTimes } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, fileUrl }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl || !isOpen) return;

    setLoading(true);
    setError(null);

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch file.");
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load file content.");
        setLoading(false);
      });
  }, [fileUrl, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg md:w-2/3 w-[98%] shadow-lg relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <FaTimes size={20} />
        </button>

        <h2 className="md:text-2xl text-lg font-bold mb-2 text-primary ">File Preview</h2>

        {/* Content */}
        <div className="max-h-[500px] overflow-y-auto  rounded-md">
          {loading ? (
            <p className="text-yellow-400">Loading content...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-invert"
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).trim()}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-800 text-yellow-300 px-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {`\`\`\`batch\n${content}\n\`\`\``}
            </ReactMarkdown>

          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownModal;
