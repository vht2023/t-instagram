import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-8 desktop:px-60 py-10 w-full h-full">{children}</div>;
};

export default Layout;
