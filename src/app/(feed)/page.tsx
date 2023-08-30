"use client";

export const dynamic = "force-dynamic";
import moment from "moment";
import Image from "next/image";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { VscSend } from "react-icons/vsc";
import { FiBookmark } from "react-icons/fi";
import HashLoader from "react-spinners/ClipLoader";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFeedPosts from "@/hooks/useFeedPosts";
import { LiaUserAltSolid } from "react-icons/lia";
import Link from "next/link";
import { useState } from "react";
import DetailsPostModal from "@/components/modals/DetailsPostModal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

export default function Feed() {
    const { data: currentUser } = useCurrentUser();
    const { data: postsData, mutate: mutateFetchedPosts } = useFeedPosts();
    const [openDetailsPostModal, setOpenDetailsPostModal] = useState<
        string | null
    >(null);

    const getLikePost = (post: any) => {
        const isLike = post?.likes.find(
            (item: any) => item.userId === currentUser.id
        );
        return isLike;
    };

    const handleLikePost = async (postId: string) => {
        await axios.post("/api/likes/create", {
            postId,
        });
        mutateFetchedPosts();
    };

    const handleUnLikePost = async (id: string) => {
        if (id) {
            await axios.delete("/api/likes/delete", {
                data: {
                    id: id,
                },
            });
            mutateFetchedPosts();
        }
    };

    if (!currentUser || !postsData) {
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

    return (
        <div className="hidden-scrollbar px-10 py-20 tablet:py-10 h-full flex justify-center overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 mb-8 pb-8">
                {postsData.map((post: any) => (
                    <div
                        className="tablet:w-[480px] tablet:min-w-[480px] flex flex-col gap-4"
                        key={post.id}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 items-center">
                                {post?.author?.image ? (
                                    <Link
                                        href={`/user/${post?.author?.id}`}
                                        className="relative rounded-full w-[40px] h-[40px] cursor-pointer"
                                    >
                                        <Image
                                            src={post?.author?.image ?? ""}
                                            alt="avatar"
                                            className="rounded-full"
                                            objectFit="cover"
                                            fill
                                        />
                                    </Link>
                                ) : (
                                    <LiaUserAltSolid className="text-[40px] cursor-pointer" />
                                )}
                                <Link
                                    href={`/user/${post?.author?.id}`}
                                    className="text-sm font-semibold ml-2 cursor-pointer"
                                >
                                    {post?.author?.username}
                                </Link>
                                <BsDot className="text-gray-500 text-[10px]" />
                                <span className="text-gray-500 text-xs">
                                    {moment
                                        .duration(
                                            moment().diff(
                                                moment.utc(post?.createdAt)
                                            )
                                        )
                                        .humanize()}
                                </span>
                            </div>
                            <BsThreeDots className="cursor-pointer text-lg" />
                        </div>
                        <div className="rounded-lg laptop:w-[480px]">
                            <Image
                                src={post?.mediaUrl ?? ""}
                                alt="img-post"
                                className="rounded-lg object-cover"
                                width={480}
                                height={650}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                {getLikePost(post) ? (
                                    <AiFillHeart
                                        onClick={() => handleUnLikePost(getLikePost(post)?.id ?? '')}
                                        className="cursor-pointer text-2xl text-red-500"
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        onClick={() =>
                                            handleLikePost(post?.id)
                                        }
                                        className="cursor-pointer text-2xl hover:text-gray-700/80"
                                    />
                                )}

                                <GoComment
                                    onClick={() =>
                                        setOpenDetailsPostModal(post.id)
                                    }
                                    className="cursor-pointer text-2xl hover:text-gray-700/80"
                                />
                                <VscSend className="cursor-pointer text-2xl hover:text-gray-700/80" />
                            </div>
                            <FiBookmark className="cursor-pointer text-2xl hover:text-gray-700/80" />
                        </div>
                        <div className="text-sm font-semibold cursor-pointer hover:text-gray-700/80">
                            {post.likes.length} likes
                        </div>
                        <div>
                            <Link
                                href={`/user/${post?.author?.id}`}
                                className="text-sm font-semibold cursor-pointer hover:text-gray-700/80 mr-2"
                            >
                                {post?.author?.username}
                            </Link>
                            <span className="text-sm">{post?.caption}</span>
                        </div>
                        <span
                            onClick={() => setOpenDetailsPostModal(post.id)}
                            className="text-sm text-gray-900/90 cursor-pointer hover:text-gray-900/70"
                        >
                            {post?.comments.length > 0
                                ? `View all ${post?.comments.length} comments`
                                : "No comments yet"}
                        </span>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="flex-1 text-sm text-gray-900/90 pl-0 border-none focus:border-none focus:shadow-none focus:ring-0"
                                placeholder="Add a comment..."
                            />
                            <span className="text-sm text-blue-700 font-medium cursor-pointer">
                                Post
                            </span>
                        </div>
                        <div className="w-full h-[1px] mb-8 border-b"></div>
                    </div>
                ))}
                <div className="w-full h-10 tablet:hidden block" />
            </div>
            {openDetailsPostModal && (
                <DetailsPostModal
                    postId={openDetailsPostModal}
                    setOpen={setOpenDetailsPostModal}
                />
            )}
        </div>
    );
}
