"use client";

import { ReactNode, useEffect } from "react";
import Lottie from "lottie-react";
import homeAnimation from "../../../public/assets/animations/auth-page-animation.json";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen w-screen bg-gray-100/5">
            <div className="h-screen w-screen flex justify-center items-center px-10 gap-10">
                <div className="hidden w-2/5 lg:flex justify-end">
                    <Lottie animationData={homeAnimation} loop={true} />
                </div>
                <div className="lg:float-left">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
