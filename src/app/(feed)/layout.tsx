"use client";

import HeaderMobile from "@/components/layouts/HeaderMobile";
import RightSection from "@/components/layouts/RightSection";
import Sidebar from "@/components/layouts/Sidebar";
import SidebarMobile from "@/components/layouts/SidebarMobile";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isProfilePage = pathname.split("/").includes("user");
    const { data: currentUser } = useCurrentUser();
    console.log(currentUser);
    
    return (
        <div className="flex w-full h-screen relative">
            <div className="h-screen border-r shadow-sm tablet:block hidden">
                <Sidebar currentUser={currentUser} />
            </div>
            <div className="border-t shadow-sm tablet:hidden block tablet:relative fixed w-full h-14 bottom-0 left-0 bg-white z-[1000]">
                <SidebarMobile currentUser={currentUser} />
            </div>
            <div className="border-b shadow-sm tablet:hidden block tablet:relative fixed w-full h-14 top-0 left-0 bg-white z-[1000]">
                <HeaderMobile />
            </div>
            <div className="h-auto flex-1">{children}</div>
            {!isProfilePage && (
                <div className="h-screen w-80 desktop:block hidden">
                    <RightSection currentUser={currentUser} />
                </div>
            )}
        </div>
    );
};

export default Layout;
