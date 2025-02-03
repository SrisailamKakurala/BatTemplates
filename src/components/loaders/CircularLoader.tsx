import React from "react";

const CircularLoader: React.FC = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default CircularLoader;
