"use client";

import { signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { CgAddR } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSearchAlt, BiMessageDetail } from "react-icons/bi";
import { MdOutlineExplore, MdOndemandVideo } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import CreatePostModal from "../modals/CreatePostModal";
import { LiaUserAltSolid } from "react-icons/lia";
import NotificationsModal from "../modals/NotificationsModal";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";

const Sidebar = ({
    currentUser,
    mutateFetchedCurentUser,
}: {
    currentUser: any;
    mutateFetchedCurentUser: any;
}) => {
    const menuNotiRef = useRef<any>(null);
    const pathname = usePathname();
    const [openCreatePostModal, setOpenCreatePostModal] =
        useState<boolean>(false);
    const [openNotificationsModal, setOpenNotificationsModal] =
        useState<boolean>(false);
    const [hasNotifications, setHasNotifications] = useState<boolean>(false);

    const getActive = (url: string): boolean => {
        if (pathname === url && !openCreatePostModal && !openNotificationsModal)
            return true;
        return false;
    };

    const handleClickNotification = async () => {
        setOpenNotificationsModal(!openNotificationsModal);
        if (!openNotificationsModal && currentUser?.hasNotification) {
            setHasNotifications(false);
            await axios.patch(`/api/notifications/${currentUser?.id}/clear`);
            await mutateFetchedCurentUser();
        }
    };

    useEffect(() => {
        if (currentUser?.hasNotification) {
            setHasNotifications(true);
        } else {
            setHasNotifications(false);
        }

        pusherClient.subscribe("follow_notifications");

        const getNotifications = async ({ userId }: any) => {
            if (userId === currentUser.id) {
                setHasNotifications(true);
            }
        };

        pusherClient.bind("follow_request", getNotifications);

        return () => {
            pusherClient.unsubscribe("follow_notifications");
            pusherClient.unbind("follow_request", getNotifications);
        };
    }, [currentUser]);

    return (
        <>
            <div className="border-r fixed left-0 top-0 bottom-0 z-10 h-full w-[80px] desktop:w-72 desktop:min-w-72 p-4 bg-white">
                <div className="h-full w-full flex flex-col gap-4 desktop:px-2">
                    <Link
                        href="/"
                        className="w-full text-center my-4 desktop:mt-0"
                    >
                        <Image
                            src="https://res.cloudinary.com/dgn01fb11/image/upload/v1692870231/frbsmzoswq6uhj7ousxe.png"
                            alt="logo"
                            width={140}
                            height={40}
                            className="hidden desktop:block mt-4 desktop:ml-2"
                            layout="fit"
                        />
                        <span className="desktop:hidden text-3xl text-red-500 font-bold">
                            T
                        </span>
                    </Link>
                    <div className="hidden-scrollbar flex flex-col gap-2 mt-2 h-full overflow-y-auto">
                        <Link
                            href="/"
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: getActive("/"),
                                }
                            )}
                        >
                            <AiOutlineHome className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]",
                                    {
                                        ["font-bold "]: getActive("/"),
                                        ["font-normal"]: !getActive("/"),
                                    }
                                )}
                            >
                                Home
                            </span>
                        </Link>
                        <Link
                            href="/search"
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: getActive("/search"),
                                }
                            )}
                        >
                            <BiSearchAlt className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]",
                                    {
                                        ["font-bold"]: getActive("/search"),
                                        ["font-normal"]: !getActive("/search"),
                                    }
                                )}
                            >
                                Search
                            </span>
                        </Link>
                        <div
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]:
                                        pathname === "/explore",
                                }
                            )}
                        >
                            <MdOutlineExplore className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Explore
                            </span>
                        </div>
                        <div
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: pathname === "/reels",
                                }
                            )}
                        >
                            <MdOndemandVideo className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Reels
                            </span>
                        </div>
                        <div
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]:
                                        pathname === "/messages",
                                }
                            )}
                        >
                            <BiMessageDetail className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]"
                                    // {
                                    //     ["font-bold"]: pathname === "/",
                                    //     ["font-medium"]: pathname !== "/",
                                    // }
                                )}
                            >
                                Messages
                            </span>
                        </div>
                        <div
                            ref={menuNotiRef}
                            onClick={() => handleClickNotification()}
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: openNotificationsModal,
                                }
                            )}
                        >
                            <FiHeart className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]",
                                    {
                                        ["font-bold"]: openNotificationsModal,
                                        ["font-medium"]:
                                            !openNotificationsModal,
                                    }
                                )}
                            >
                                Notifications
                            </span>
                            {hasNotifications && (
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </div>
                            )}
                        </div>
                        <div
                            onClick={() => setOpenCreatePostModal(true)}
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-normal items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: openCreatePostModal,
                                }
                            )}
                        >
                            <CgAddR className="desktop:text-3xl text-2xl" />
                            <span
                                className={classNames(
                                    "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]",
                                    {
                                        ["font-bold"]: openCreatePostModal,
                                        ["font-medium"]: !openCreatePostModal,
                                    }
                                )}
                            >
                                Create
                            </span>
                        </div>
                        <Link
                            href={`/user/${
                                currentUser ? currentUser.id : "me"
                            }`}
                            className={classNames(
                                "cursor-pointer flex justify-center desktop:justify-between w-full items-center gap-4 menu-item hover:bg-zinc-400/10 rounded-md p-2",
                                {
                                    ["bg-zinc-400/10 "]: getActive(
                                        `/user/${
                                            currentUser ? currentUser.id : "me"
                                        }`
                                    ),
                                }
                            )}
                        >
                            <div className="flex gap-4 items-center">
                                {currentUser?.image ? (
                                    <div className="relative rounded-full desktop:w-[30px] desktop:h-[30px] w-[24px] h-[24px]">
                                        <Image
                                            src={currentUser?.image ?? ""}
                                            alt="avatar"
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
                                        "hidden desktop:inline transition-all delay-75 duration-75 text-[15px]",
                                        {
                                            ["font-bold"]: getActive(
                                                `/user/${
                                                    currentUser
                                                        ? currentUser.id
                                                        : "me"
                                                }`
                                            ),
                                            ["font-normal"]: !getActive(
                                                `/user/${
                                                    currentUser
                                                        ? currentUser.id
                                                        : "me"
                                                }`
                                            ),
                                        }
                                    )}
                                >
                                    Profile
                                </span>
                            </div>
                            <RiLogoutCircleRLine
                                className="hidden cursor-pointer desktop:block text-[18px] hover:text-[20px] transition-all delay-75 duration-75"
                                onClick={() => signOut()}
                            />
                        </Link>
                        <div className="desktop:hidden w-full flex-1 flex flex-col justify-end cursor-pointer text-[20px]">
                            <RiLogoutCircleRLine
                                className="w-full"
                                onClick={() => signOut()}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openCreatePostModal && (
                <CreatePostModal
                    userData={currentUser}
                    open={openCreatePostModal}
                    setOpen={setOpenCreatePostModal}
                />
            )}

            <NotificationsModal
                menuNotiRef={menuNotiRef}
                userData={currentUser}
                open={openNotificationsModal}
                setOpen={setOpenNotificationsModal}
            />
        </>
    );
};

export default Sidebar;
