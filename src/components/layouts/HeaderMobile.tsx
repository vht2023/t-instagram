"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const HeaderMobile = () => {
    return (
        <div className="h-full w-full flex px-4 items-center">
            <div className="flex-1">
                <Link href="/" className="block w-[120px]">
                    <Image
                        src="/images/t-instagram-logo.png"
                        alt="logo"
                        width={120}
                        height={40}
                        layout="fit"
                    />
                </Link>
            </div>
            <div className="flex justify-evenly items-center gap-4 cursor-text">
                <div className="w-60 h-8 border border-gray-500/50 rounded-md relative">
                    <CiSearch className="text-xl text-gray-500/70 absolute left-1 top-1" />
                    <input
                        type="text"
                        className="w-full h-full border-none rounded-md text-sm pl-8 focus:border-gray-500/50 focus:border focus:shadow-none"
                    />
                </div>
                <FiHeart className="text-2xl" />
            </div>
        </div>
    );
};

export default HeaderMobile;
