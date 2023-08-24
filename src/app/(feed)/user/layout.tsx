import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-8 py-10 w-full flex justify-center h-full">{children}</div>;
};

export default Layout;
