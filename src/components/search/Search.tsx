import React, { useState, useEffect } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  placeholder?: string;
  page: "folders" | "templates" | "contributors";
  data: any[];
  onFilter: (filteredData: any[]) => void;
}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, page, data, onFilter, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      // Perform the filtering when searchTerm or data changes
      const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      onFilter(filteredData);
    }, [searchTerm, data]);

    return (
      <div className="w-full">
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Set search term on input change
          className="flex h-10 w-full rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-1 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-primary">This field has an error.</p>
        )}
      </div>
    );
  }
);

export default Search;
