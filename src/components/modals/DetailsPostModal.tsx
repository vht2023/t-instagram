"use client";

import classNames from "classnames";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import useFeedPosts from "@/hooks/useFeedPosts";
import moment from "moment";
import { FiBookmark } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { VscSend } from "react-icons/vsc";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import usePost from "@/hooks/usePost";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PropsType {
    postId: string | null;
    setOpen: Dispatch<SetStateAction<any>>;
}

const DetailsPostModal: React.FC<PropsType> = ({
    postId,
    setOpen,
}: PropsType) => {
    const { data: currentUser } = useCurrentUser();
    const { data: postData, mutate: mutateFetchedPost } = usePost(postId ?? "");
    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const disabledSubmit = comment.length === 0;
    const isLiked =
        postData &&
        currentUser &&
        postData?.likes.find((item: any) => item.userId === currentUser.id);
        
    const createComment = async (postId: string) => {
        setLoading(true);
        await axios.post("/api/comments/create", {
            comment,
            postId,
        });
        mutateFetchedPost();
        setLoading(false);
        setComment("");
    };

    const handleLikePost = async (postId?: string) => {
        setLoading(true);
        if (isLiked) {
            await axios.delete("/api/likes/delete", {
                data: {
                    id: isLiked.id,
                },
            });
        } else {
            await axios.post("/api/likes/create", {
                postId,
            });
        }
        mutateFetchedPost();
        setLoading(false);
    };

    return (
        <div
            className={classNames(
                "justify-center items-center tablet:fixed z-[1000] w-full max-w-screen overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-screen bg-neutral-500/20 absolute top-0 left-0 bottom-0",
                { ["hidden"]: !postData, ["flex flex-col "]: postData }
            )}
        >
            <div className="desktop:w-[906px] desktop:h-[520px] laptop:w-[880px] laptop:h-[507px] tablet:w-[680px] tablet:h-[389px] w-[300px] h-[550px]">
                <div className="bg-white rounded-lg shadow w-full h-full max-h-full">
                    <div className="flex justify-between laptop:p-4 p-2 border-b rounded-t">
                        <Link
                            href={`/user/${postData?.author?.id}`}
                            className="flex gap-4 items-center cursor-pointer"
                        >
                            <div className="relative rounded-full laptop:w-[35px] laptop:h-[35px] w-[28px] h-[28px]">
                                <Image
                                    src={postData?.author?.image ?? ""}
                                    alt="avatar"
                                    className="rounded-full"
                                    objectFit="cover"
                                    fill
                                />
                            </div>
                            <div className="font-semibold text-sm laptop:text-base">
                                {postData?.author?.username}
                            </div>
                        </Link>
                        <div className="flex justify-center items-center ml-auto gap-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            >
                                <BsThreeDots className="text-lg" />
                            </button>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                onClick={() => setOpen(null)}
                            >
                                <MdClose className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <div className="flex tablet:flex-row flex-col">
                        <div className="tablet:basis-1/2">
                            <div className="relative flex justify-center items-center tablet:w-[340px] tablet:h-[340px] laptop:w-[440px] laptop:h-[440px] desktop:w-[453px] desktop:h-[453px] w-[300px] h-[300px]">
                                <Image
                                    src={postData?.mediaUrl ?? ""}
                                    alt="avatar"
                                    className=""
                                    objectFit="cover"
                                    fill
                                />
                            </div>
                        </div>
                        <div className="tablet:basis-1/2 border-l flex flex-col">
                            <div className="px-4 desktop:h-[328px] laptop:h-[322px] tablet:h-[234px] h-[100px]">
                                <div className="overflow-y-auto h-full hidden-scrollbar">
                                    <div className="flex gap-4 tablet:mb-4 tablet:pt-4 mb-2 pt-2">
                                        <Link
                                            href={`/user/${postData?.author?.id}`}
                                            className="flex-shrink-0 flex flex-col items-end relative rounded-full laptop:w-[40px] laptop:h-[40px] w-[24px] h-[24px] cursor-pointer"
                                        >
                                            <Image
                                                src={
                                                    postData?.author?.image ??
                                                    ""
                                                }
                                                alt="avatar"
                                                className="rounded-full"
                                                objectFit="cover"
                                                fill
                                            />
                                        </Link>
                                        <div className="w-full flex flex-col">
                                            <div className="font-normal text-sm w-full inline-block">
                                                <Link
                                                    href={`/user/${postData?.author?.id}`}
                                                    className="font-semibold text-sm cursor-pointer mr-2"
                                                >
                                                    {postData?.author?.username}
                                                </Link>
                                                {postData?.caption}
                                            </div>
                                            <div className="w-full mt-2">
                                                <span className="text-gray-700 text-xs">
                                                    {moment
                                                        .duration(
                                                            moment().diff(
                                                                moment.utc(
                                                                    postData?.createdAt
                                                                )
                                                            )
                                                        )
                                                        .humanize()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* list comments */}
                                    {postData &&
                                        postData?.comments.map(
                                            (comment: any) => (
                                                <div
                                                    className="flex gap-4 mb-4"
                                                    key={comment.id}
                                                >
                                                    <Link
                                                        href={`/user/${comment?.user?.id}`}
                                                        className="flex-shrink-0 flex flex-col items-end relative rounded-full laptop:w-[40px] laptop:h-[40px] w-[24px] h-[24px] cursor-pointer"
                                                    >
                                                        <Image
                                                            src={
                                                                comment?.user
                                                                    ?.image ??
                                                                ""
                                                            }
                                                            alt="avatar"
                                                            className="rounded-full"
                                                            objectFit="cover"
                                                            fill
                                                        />
                                                    </Link>
                                                    <div className="w-full flex flex-col">
                                                        <div className="font-normal text-sm w-full inline-block">
                                                            <Link
                                                                href={`/user/${comment?.user?.id}`}
                                                                className="font-semibold text-sm cursor-pointer mr-2"
                                                            >
                                                                {
                                                                    comment
                                                                        ?.user
                                                                        ?.username
                                                                }
                                                            </Link>
                                                            {comment?.comment}
                                                        </div>
                                                        <div className="w-full mt-2">
                                                            <span className="text-gray-700 text-xs">
                                                                {moment
                                                                    .duration(
                                                                        moment().diff(
                                                                            moment.utc(
                                                                                comment?.createdAt
                                                                            )
                                                                        )
                                                                    )
                                                                    .humanize()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className="border-t px-4 flex flex-col">
                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-4">
                                        {isLiked ? (
                                            <AiFillHeart
                                                onClick={() =>
                                                    handleLikePost()
                                                }
                                                className="cursor-pointer text-2xl text-red-500"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                onClick={() =>
                                                    handleLikePost(postId ?? "")
                                                }
                                                className="cursor-pointer text-2xl hover:text-gray-700/80"
                                            />
                                        )}
                                        <GoComment className="cursor-pointer text-2xl hover:text-gray-700/80" />
                                        <VscSend className="cursor-pointer text-2xl hover:text-gray-700/80" />
                                    </div>
                                    <FiBookmark className="cursor-pointer text-2xl hover:text-gray-700/80" />
                                </div>
                                <div className="text-sm pt-2 font-normal">
                                    {postData && postData?.likes?.length > 0 ? (
                                        <span className="cursor-pointer font-semibold">
                                            {postData?.likes?.length} likes
                                        </span>
                                    ) : (
                                        <div>
                                            Be the first to{" "}
                                            <span className="cursor-pointer font-semibold hover:text-gray-500">
                                                Like this
                                            </span>
                                        </div>
                                    )}
                                    <span></span>
                                </div>
                                <div className="flex items-center laptop:pt-4 pt-2">
                                    <input
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        type="text"
                                        className="flex-1 text-sm text-black pl-0 py-1 border-none focus:border-none focus:shadow-none focus:ring-0 font-normal"
                                        placeholder="Add a comment..."
                                    />
                                    <span
                                        onClick={() =>
                                            createComment(postId ?? "")
                                        }
                                        className="text-sm text-blue-700 font-medium cursor-pointer"
                                    >
                                        Post
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPostModal;
