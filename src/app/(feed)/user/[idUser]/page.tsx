"use client";

import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import HashLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { VscDebug } from "react-icons/vsc";
import EditProfileUserModal from "@/components/modals/EditProfileUserModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { LiaUserAltSolid } from "react-icons/lia";
import axios from "axios";
import toast from "react-hot-toast";
import useUserPost from "@/hooks/useUserPost";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import DetailsPostModal from "@/components/modals/DetailsPostModal";

export default function Profile() {
    const pathname = usePathname();
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isWaitingAcceptFollow, setIsWaitingAcceptFollow] = useState(false);
    const [isRequestingFollow, setIsRequestingFollow] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [loading, setLoading] = useState<string | null>(null);
    const [viewState, setViewState] = useState<string>("POSTS");
    const [openDetailsPostModal, setOpenDetailsPostModal] = useState<
        string | null
    >(null);

    const { data: currentUser, mutate: mutateFetchedCurentUser } =
        useCurrentUser();
    const idUser = pathname.split("/").pop();
    const { data: userData, mutate: mutateFetchedUser } = useUser(idUser ?? "");
    const { data: userPosts, isLoading: usePostsLoading } = useUserPost(
        idUser ?? ""
    );

    const isPrivateUser = userData?.isPrivate && !isFollowing;

    const handleFollowUser = async () => {
        if (userData) {
            setDisabledButton(true);
            setLoading("FOLLOW");
            await axios.patch("/api/users/requestFollow", {
                idUserTarget: userData?.id,
                isPrivateUser: userData.isPrivate,
            });
            if (userData.isPrivate) {
                toast.success(
                    `Waiting for ${userData.username} accept the request`
                );
            } else {
                toast.success(`Followed ${userData.username}`);
            }
            await mutateFetchedUser();
            setDisabledButton(false);
            setLoading(null);
        }
    };

    const handleUnFollowUser = async () => {
        if (userData) {
            setDisabledButton(true);
            setLoading("UNFOLLOW");
            await axios.patch("/api/users/unfollow", {
                idUserTarget: userData?.id,
            });
            toast.success(`Unfollowed ${userData.username}`);
            await mutateFetchedUser();
            setDisabledButton(false);
            setLoading(null);
        }
    };

    const handleAcceptRequestFollow = async () => {
        if (userData) {
            setDisabledButton(true);
            setLoading("ACCEPT");
            await axios.patch("/api/users/acceptRequest", {
                idUserRequest: userData?.id,
            });
            toast.success(`Accepted for ${userData.username} to follow you`);
            await mutateFetchedUser();
            await mutateFetchedCurentUser();
            setDisabledButton(false);
            setLoading(null);
        }
    };

    const handleDeclineRequestFollow = async () => {
        if (userData) {
            setDisabledButton(true);
            setLoading("DECLINE");
            await axios.patch("/api/users/declineRequest", {
                idUserRequest: userData?.id,
            });
            toast.success(`Declined ${userData.username} to follow you`);
            await mutateFetchedUser();
            await mutateFetchedCurentUser();
            setDisabledButton(false);
            setLoading(null);
        }
    };

    const handleCancelRequestFollow = async () => {
        if (userData) {
            setDisabledButton(true);
            setLoading("DECLINE");
            await axios.patch("/api/users/cancelRequest", {
                idUserTarget: userData?.id,
            });
            toast.success(`Canceled requesting follow to ${userData.username}`);
            await mutateFetchedUser();
            setDisabledButton(false);
            setLoading(null);
        }
    };

    useEffect(() => {
        if (currentUser && userData) {
            const existedIdCurrentUserFollowing = userData.followerIds.includes(
                currentUser.id
            );
            if (existedIdCurrentUserFollowing) setIsFollowing(true);
            else setIsFollowing(false);

            const existedIdCurrentUserRequesting =
                userData.waitingFollowerIds.includes(currentUser.id);
            if (existedIdCurrentUserRequesting) setIsRequestingFollow(true);
            else setIsRequestingFollow(false);

            const existedIdCurrentUserWaitingAccept =
                currentUser.waitingFollowerIds.includes(userData.id);
            if (existedIdCurrentUserWaitingAccept)
                setIsWaitingAcceptFollow(true);
            else setIsWaitingAcceptFollow(false);
        }
        setDisabledButton(false);
        setLoading(null);
        setOpenDetailsPostModal(null);
    }, [currentUser, userData]);

    if (!userData) {
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

    // UI
    const followAction = () => {
        if (isRequestingFollow) {
            return (
                <span className="text-sm font-normal italic text-red-500">
                    Sent an invite to follow
                </span>
            );
        } else if (isWaitingAcceptFollow) {
            return (
                <div className="flex gap-2 items-center">
                    <span className="text-xs text-medium">
                        Requested to follow you
                    </span>
                    <button
                        disabled={disabledButton}
                        onClick={() => handleAcceptRequestFollow()}
                        className="p-1 rounded-md text-white text-xs font-medium bg-blue-500 hover:bg-blue-600 transition-all delay-75 duration-75"
                    >
                        {disabledButton && loading === "ACCEPT" && (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 mr-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                        Accept
                    </button>
                    <button
                        disabled={disabledButton}
                        onClick={() => handleDeclineRequestFollow()}
                        className="p-1 rounded-md text-xs font-medium bg-zinc-700/10 hover:bg-zinc-700/20 transition-all delay-75 duration-75"
                    >
                        {disabledButton && loading === "DECLINE" && (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#1C64F2"
                                />
                            </svg>
                        )}
                        Decline
                    </button>
                </div>
            );
        } else return <></>;
    };

    const userButtonActions = () => {
        if (currentUser?.id === userData?.id) {
            return (
                <button
                    onClick={() => setOpenEditProfileModal(true)}
                    className="p-2 rounded-md text-sm font-medium bg-zinc-700/10 hover:bg-zinc-700/20 transition-all delay-75 duration-75"
                >
                    Edit Profile
                </button>
            );
        } else if (isFollowing) {
            return (
                <button
                    disabled={disabledButton}
                    onClick={() => handleUnFollowUser()}
                    className="p-2 rounded-md text-sm font-medium bg-zinc-700/10 hover:bg-zinc-700/20 transition-all delay-75 duration-75"
                >
                    {disabledButton && loading === "UNFOLLOW" && (
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="#1C64F2"
                            />
                        </svg>
                    )}
                    Unfollow
                </button>
            );
        } else if (isRequestingFollow) {
            return (
                <button
                    disabled={disabledButton}
                    onClick={() => handleCancelRequestFollow()}
                    className="p-2 rounded-md text-white text-sm font-medium bg-red-600 hover:bg-red-700 transition-all delay-75 duration-75"
                >
                    {disabledButton && loading === "CANCEL" && (
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                    Cancel Request
                </button>
            );
        } else {
            return (
                <button
                    disabled={disabledButton}
                    onClick={() => handleFollowUser()}
                    className="p-2 rounded-md text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-all delay-75 duration-75"
                >
                    {disabledButton && loading === "FOLLOW" && (
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                    + Follow
                </button>
            );
        }
    };

    return (
        <>
            <div className="flex flex-col tablet:w-[650px] tablet:max-w-[650px] desktop:w-[908px] desktop:max-w-[908px] w-full h-full overflow-x-hidden hidden-scrollbar">
                <div className="flex tablet:flex-row flex-col tablet:justify-center items-center desktop:gap-40 tablet:gap-20 gap-4">
                    {userData.image ? (
                        <div className="relative tablet:w-[150px] tablet:h-[150px] w-[100px] h-[100px] rounded-full">
                            <Image
                                src={userData.image ?? ""}
                                alt="avatar"
                                className="rounded-full cursor-pointer"
                                objectFit="cover"
                                fill
                            />
                        </div>
                    ) : (
                        <LiaUserAltSolid className="text-[150px]" />
                    )}

                    <div className="flex flex-col gap-6 tablet:w-[360px] w-full">
                        <div className="flex justify-between items-center tablet:flex-row flex-col gap-4">
                            <span className="desktop:text-xl cursor-pointer font-medium">
                                {userData?.username ?? "[no_username]"}
                            </span>
                            <div className="tablet:hidden block font-light text-sm">
                                {userData?.bio ?? "[...no bio]"}
                            </div>
                            {userData && currentUser && userButtonActions()}
                        </div>
                        <div className="flex justify-between items-center">
                            {followAction()}
                        </div>
                        <div className="flex justify-between items-center text-base font-light">
                            <div>
                                <span className="font-medium">
                                    {userPosts?.length ?? 0}
                                </span>
                                <span className="ml-1">posts</span>
                            </div>
                            <div className="cursor-pointer">
                                <span className="font-medium">
                                    {userData?.followerIds.length ?? 0}
                                </span>
                                <span className="ml-1">followers</span>
                            </div>
                            <div className="cursor-pointer">
                                <span className="font-medium">
                                    {userData?.followingIds.length ?? 0}
                                </span>
                                <span className="ml-1">following</span>
                            </div>
                        </div>
                        <div className="hidden tablet:block font-light text-sm">
                            {userData?.bio ?? "[...no bio]"}
                        </div>
                    </div>
                </div>
                <div className="border-b w-full h-[1px] tablet:mt-12 mt-6" />
                <div className="flex justify-center items-center gap-10 text-sm text-zinc-500 font-medium">
                    <span
                        onClick={() => setViewState("POSTS")}
                        className={classNames(
                            "hover:text-black tablet:py-4 py-2 px-2 cursor-pointer",
                            {
                                ["text-black border-t-2 border-black"]:
                                    viewState === "POSTS",
                            }
                        )}
                    >
                        POSTS
                    </span>
                    {currentUser?.id === userData?.id && (
                        <span
                            onClick={() => setViewState("SAVED")}
                            className={classNames(
                                "hover:text-black tablet:py-4 py-2 px-2",
                                {
                                    ["text-black border-t-2 border-black"]:
                                        viewState === "SAVED",
                                }
                            )}
                        >
                            SAVED
                        </span>
                    )}
                </div>
                {isPrivateUser && currentUser?.id !== userData?.id ? (
                    <div className="flex flex-col gap-6 w-full justify-center items-center mt-20 font-semibold">
                        <span>This Account is Private</span>
                        <span>Follow to see their posts.</span>
                    </div>
                ) : usePostsLoading ? (
                    <div
                        role="status"
                        className="flex items-center justify-center h-52 w-52 max-w-sm bg-gray-300 rounded-lg animate-pulse"
                    >
                        <svg
                            className="w-10 h-10 text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : userPosts?.length > 0 ? (
                    <div className="w-full h-full tablet:mb-8 mb-20">
                        <div className="grid grid-cols-3 gap-1 w-full h-full overflow-x-hidden">
                            {userPosts &&
                                userPosts.map((post: any) => (
                                    <div
                                        key={post.id}
                                        className="relative tablet:w-[214px] tablet:h-[214px] desktop:w-[300px] desktop:h-[300px] w-full h-[calc(100%/3)]"
                                        onClick={() =>
                                            setOpenDetailsPostModal(post.id)
                                        }
                                    >
                                        <div className="post-hover cursor-pointer absolute top-0 left-0 z-10 hover:bg-gray-900/30 flex gap-6 justify-center items-center tablet:w-[214px] tablet:h-[214px] desktop:w-[300px] desktop:h-[300px] w-full h-full">
                                            <div className="hidden z-10 hover:flex justify-center items-center">
                                                <AiFillHeart className="text-white text-2xl" />
                                                <span className="ml-1 text-white text-xl font-semibold">
                                                    {post.likes.length}
                                                </span>
                                            </div>
                                            <div className="hidden z-10 hover:flex justify-center items-center">
                                                <FaCommentAlt className="text-white text-[20px]" />
                                                <span className="ml-1 text-white text-xl font-semibold">
                                                    {post.comments.length}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative tablet:w-[214px] tablet:h-[214px] desktop:w-[300px] desktop:h-[300px] w-full h-full">
                                            <Image
                                                src={post.mediaUrl}
                                                alt="post-img"
                                                objectFit="cover"
                                                fill
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 flex flex-col justify-center items-center gap-6">
                        <VscDebug className="text-6xl" />
                        <span className="text-3xl font-semibold">
                            No Posts Yet
                        </span>
                    </div>
                )}
            </div>
            {openEditProfileModal && (
                <EditProfileUserModal
                    userData={userData}
                    open={openEditProfileModal}
                    setOpen={setOpenEditProfileModal}
                />
            )}
            {openDetailsPostModal && (
                <DetailsPostModal
                    postId={openDetailsPostModal}
                    setOpen={setOpenDetailsPostModal}
                />
            )}
        </>
    );
}
