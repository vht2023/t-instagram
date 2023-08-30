import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-8 mb-10 pt-20 w-full flex justify-center min-w-[350px] h-full">{children}</div>;
};

export default Layout;
