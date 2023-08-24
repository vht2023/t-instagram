"use client";

import classNames from "classnames";
import Image from "next/image";
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { MdClose } from "react-icons/md";
import useNotifications from "@/hooks/useNotitfications";
import Link from "next/link";
import moment from "moment";

interface PropsType {
    menuNotiRef: any;
    userData: any;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationsModal: React.FC<PropsType> = ({
    menuNotiRef,
    userData,
    open,
    setOpen,
}: PropsType) => {
    const containerRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { data: notificationsData } = useNotifications(userData?.id);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target) &&
                menuNotiRef.current &&
                !menuNotiRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuNotiRef.current]);
    
    return (
        <div
            ref={containerRef}
            className={classNames(
                "bg-white fixed top-0 desktop:left-72 tablet:left-[80px] w-96 max-w-96 h-full overflow-x-hidden overflow-y-auto transition-all duration-500",
                { ["-z-50 -translate-x-96"]: !open, ["z-10 shadow"]: open }
            )}
        >
            <div className="relative bg-white w-full h-full">
                <div className="flex justify-between p-4 border-b rounded-t">
                    <h3 className="text-2xl font-bold text-black ">
                        Notifications
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        onClick={() => setOpen(false)}
                    >
                        <MdClose className="text-lg" />
                    </button>
                </div>
                <div className="flex flex-col gap-2 w-full py-2">
                    <div className="pl-4 text-lg font-medium">Recently</div>
                    {notificationsData &&
                        notificationsData.map((noti: any) => (
                            <Link
                                href={noti.link}
                                key={noti.id}
                                className="flex p-4 gap-2 items-center hover:bg-zinc-400/10"
                            >
                                <div className="relative w-[40px] h-[40px] max-w-[40px] max-h-[40px] rounded-full">
                                    <Image
                                        src={noti.mediaUrl ?? ""}
                                        alt="avatar"
                                        className="rounded-full"
                                        objectFit="cover"
                                        fill
                                    />
                                </div>
                                <div className="flex-1 text-sm">
                                    <span className="text-sm font-semibold">
                                        {noti.username}
                                    </span>{" "}
                                    {noti.body}{" "}
                                    <span className="text-gray-900/80">{`(${moment
                                        .duration(
                                            moment().diff(
                                                moment.utc(noti?.createdAt)
                                            )
                                        )
                                        .humanize()})`}</span>
                                </div>
                                <div>
                                    <div className="relative w-[40px] h-[40px] max-w-[40px] max-h-[40px] rounded-md">
                                        <Image
                                            src={noti.mediaUrl ?? ""}
                                            alt="avatar"
                                            className="rounded-md"
                                            objectFit="cover"
                                            fill
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;
