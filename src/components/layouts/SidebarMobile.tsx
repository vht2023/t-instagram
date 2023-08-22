"use client";

import { signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineExplore, MdOndemandVideo } from "react-icons/md";
import { LiaUserAltSolid } from "react-icons/lia";

const SidebarMobile = ({ currentUser }: { currentUser: any }) => {
    return (
        <div className="w-full h-full sidebar">
            <div className="h-full w-full flex justify-evenly items-center">
                <Link href="/" className="cursor-pointer menu-item">
                    <AiFillHome className="text-2xl" />
                </Link>
                <div className="cursor-pointer menu-item">
                    <MdOutlineExplore className="text-2xl" />
                </div>
                <div className="cursor-pointer menu-item">
                    <MdOndemandVideo className="text-2xl" />
                </div>
                <div className="cursor-pointer menu-item">
                    <CgAddR className="text-2xl" />
                </div>
                <div className="cursor-pointer menu-item">
                    <BiMessageDetail className="text-2xl" />
                </div>
                <Link
                    href={`/user/$${currentUser ? currentUser.id : "me"}`}
                    className="relative cursor-pointer rounded-full w-[24px] h-[24px]"
                >
                    {currentUser?.image ? (
                        <Image
                            src={currentUser?.image ?? ""}
                            alt="logo"
                            className="rounded-full"
                            objectFit="cover"
                            fill
                        />
                    ) : (
                        <LiaUserAltSolid className="text-[26px]" />
                    )}
                </Link>
                <div className="cursor-pointer menu-item">
                    <RiLogoutCircleRLine
                        className="text-2xl"
                        onClick={() => {
                            signOut();
                            localStorage.setItem(
                                "currentUser",
                                JSON.stringify(null)
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SidebarMobile;
