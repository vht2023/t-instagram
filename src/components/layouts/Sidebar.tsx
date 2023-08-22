"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { CgAddR } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSearchAlt, BiMessageDetail } from "react-icons/bi";
import { MdOutlineExplore, MdOndemandVideo } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import CreatePostModal from "../modals/CreatePostModal";
import { LiaUserAltSolid } from "react-icons/lia";

const Sidebar = ({ currentUser }: { currentUser: any }) => {
    const pathname = usePathname();
    const [openCreatePostModal, setOpenCreatePostModal] =
        useState<boolean>(false);

    return (
        <>
            <div className="h-full w-[100px] desktop:w-72 desktop:min-w-72 p-6 sidebar">
                <div className="h-full w-full flex flex-col gap-4">
                    <Link href="/" className="w-full my-4 text-center">
                        <Image
                            src="/images/t-instagram-logo.png"
                            alt="logo"
                            width={160}
                            height={40}
                            className="hidden desktop:block my-4"
                            layout="fit"
                        />
                        <span className="desktop:hidden text-3xl text-red-500 font-bold">
                            T
                        </span>
                    </Link>
                    <div className="hidden-scrollbar flex flex-col gap-7 desktop:mt-10 mt-6 h-full overflow-y-auto">
                        <Link
                            href="/"
                            className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item"
                        >
                            <AiFillHome className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base",
                                    {
                                        ["font-bold"]: pathname === "/",
                                        ["font-normal"]: pathname !== "/",
                                    }
                                )}
                            >
                                Home
                            </span>
                        </Link>
                        <Link
                            href="/search"
                            className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item"
                        >
                            <BiSearchAlt className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base",
                                    {
                                        ["font-bold"]: pathname === "/search",
                                        ["font-medium"]: pathname !== "/search",
                                    }
                                )}
                            >
                                Search
                            </span>
                        </Link>
                        <div className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item">
                            <MdOutlineExplore className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Explore
                            </span>
                        </div>
                        <div className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item">
                            <MdOndemandVideo className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Reels
                            </span>
                        </div>
                        <div className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item">
                            <BiMessageDetail className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Messages
                            </span>
                        </div>
                        <div className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item">
                            <FiHeart className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Notifications
                            </span>
                        </div>
                        <div
                            onClick={() => setOpenCreatePostModal(true)}
                            className="cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item"
                        >
                            <CgAddR className="desktop:text-3xl text-xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Create
                            </span>
                        </div>
                        <Link
                            href={`/user/${
                                currentUser ? currentUser.id : "me"
                            }`}
                            className="cursor-pointer w-full flex desktop:justify-between justify-center items-center  menu-item"
                        >
                            <div className="flex gap-4 items-center">
                                {currentUser?.image ? (
                                    <div className="relative rounded-full desktop:w-[30px] desktop:h-[30px] w-[20px] h-[20px]">
                                        <Image
                                            src={currentUser?.image ?? ""}
                                            alt="logo"
                                            className="rounded-full"
                                            objectFit="cover"
                                            fill
                                        />
                                    </div>
                                ) : (
                                    <LiaUserAltSolid className="desktop:text-[32px] text-[24px]" />
                                )}

                                <span
                                    className={classNames(
                                        "hidden desktop:inline hover:font-bold transition-all delay-75 duration-75 text-base",
                                        {
                                            ["font-bold"]:
                                                pathname ===
                                                `/user/${
                                                    currentUser
                                                        ? currentUser.id
                                                        : "me"
                                                }`,
                                            ["font-normal"]:
                                                pathname !==
                                                `/user/${
                                                    currentUser
                                                        ? currentUser.id
                                                        : "me"
                                                }`,
                                        }
                                    )}
                                >
                                    Profile
                                </span>
                            </div>
                            <RiLogoutCircleRLine
                                className="hidden cursor-pointer desktop:block text-[18px] hover:text-[20px] transition-all delay-75 duration-75"
                                onClick={() => {
                                    signOut();
                                    localStorage.setItem(
                                        "currentUser",
                                        JSON.stringify(null)
                                    );
                                }}
                            />
                        </Link>
                        <div className="desktop:hidden w-full flex-1 flex flex-col justify-end cursor-pointer text-[20px]">
                            <RiLogoutCircleRLine
                                className="w-full"
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
            </div>
            {openCreatePostModal && (
                <CreatePostModal
                    userData={currentUser}
                    open={openCreatePostModal}
                    setOpen={setOpenCreatePostModal}
                />
            )}
        </>
    );
};

export default Sidebar;
