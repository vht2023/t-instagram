"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HashLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";
import useUsers from "@/hooks/useUsers";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function Profile() {
    const [viewState, setViewState] = useState<string>("POSTS");
    const { data: allUsers } = useUsers();
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser") as string
    );

    const otherUsers =
        allUsers && allUsers?.filter((user: any) => user.id !== currentUser.id);

    if (!allUsers) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <HashLoader
                    color="#d63644"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    console.log(otherUsers);

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <div className="mx-auto w-full text-center font-semibold text-xl">
                All Users
            </div>
            {otherUsers.map((user: any) => (
                <Link href={`/user/${user.id}`} className="w-full flex gap-3 items-center" key={user.id}>
                    {user.image ? (
                        <Image
                            src={user.image ?? ""}
                            alt="avatar"
                            className="rounded-full"
                            objectFit="cover"
                            width={60}
                            height={60}
                        />
                    ) : (
                        <HiOutlineUserCircle className="text-[64px]" />
                    )}
                    <div className="flex flex-col text-sm">
                        <span className="font-medium">{user.username ?? "[no_username]"}</span>
                        <span className="mt-1 font-light">{user.name ?? "[no_name]"}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
