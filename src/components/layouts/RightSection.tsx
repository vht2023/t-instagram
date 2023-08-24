"use client";

import React from "react";
import Image from "next/image";
import { LiaUserAltSolid } from "react-icons/lia";

const RightSection = ({ currentUser }: { currentUser: any }) => {
    return (
        <div className="w-full h-full flex flex-col pt-10 pr-10 gap-6">
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}

                    <span className="text-sm font-semibold">
                        {currentUser?.name ?? ""}
                    </span>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-semibold">
                    Switch
                </span>
            </div>
            <div className="w-full flex justify-between items-center mt-4">
                <div className="text-base text-gray-700/80 font-semibold">
                    Suggested for you
                </div>
                <div className="text-sm cursor-pointer font-semibold">
                    See all
                </div>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">User 1</span>
                        <span className="text-xs">Followed by user_xyz</span>
                    </div>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-medium">
                    Follow
                </span>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">User 1</span>
                        <span className="text-xs">Followed by user_xyz</span>
                    </div>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-medium">
                    Follow
                </span>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">User 1</span>
                        <span className="text-xs">Followed by user_xyz</span>
                    </div>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-medium">
                    Follow
                </span>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">User 1</span>
                        <span className="text-xs">Followed by user_xyz</span>
                    </div>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-medium">
                    Follow
                </span>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    {currentUser?.image ? (
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <Image
                                src={currentUser?.image ?? ""}
                                alt="avatar"
                                className="rounded-full"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[40px]" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">User 1</span>
                        <span className="text-xs">Followed by user_xyz</span>
                    </div>
                </div>
                <span className="text-sm cursor-pointer text-blue-500 font-medium">
                    Follow
                </span>
            </div>
        </div>
    );
};

export default RightSection;
