"use client";

import classNames from "classnames";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import useFeedPosts from "@/hooks/useFeedPosts";

interface PropsType {
    userData: any;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatePostModal: React.FC<PropsType> = ({
    userData,
    open,
    setOpen,
}: PropsType) => {
    const inputFileRef = useRef<any>(null);
    const { mutate: mutateFetchedPosts } = useFeedPosts();
    const [image, setImage] = useState<string>("");
    const [caption, setCaption] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const disabledSubmit = image.length === 0;

    const handleClickUploadFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleUploadFile = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "t-insta");
            formData.append("api_key", "789532596783883");
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dgn01fb11/image/upload`,
                formData
            );
            if (response.status === 200) {
                setLoading(false);
                setImage(response.data.url);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        await axios.post("/api/posts/create", {
            caption,
            mediaUrl: image,
        });
        mutateFetchedPosts();
        toast.success("Create new post successfully!");
        setOpen(false);
        setLoading(false);
    };

    return (
        <div
            className={classNames(
                "justify-center items-center fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-neutral-500/20",
                { ["hidden"]: open === false, ["flex flex-col"]: open === true }
            )}
        >
            <div className="w-full h-full desktop:w-[1024px] desktop:h-[667px] laptop:w-[768px] laptop:h-[538px] tablet:w-[650px] tablet:h-[480px]">
                <div className="bg-white rounded-lg shadow w-full h-full">
                    <div className="flex justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Create new post
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            onClick={() => setOpen(false)}
                        >
                            <MdClose className="text-lg" />
                        </button>
                    </div>
                    <div className="flex">
                        <div className="basis-1/2">
                            <div className="relative flex justify-center items-center tablet:w-[325px] tablet:h-[325px] laptop:w-[384px] laptop:h-[384px] desktop:w-[500px] desktop:h-[500px]">
                                {image.length > 0 ? (
                                    <Image
                                        src={image ?? ""}
                                        alt="avatar"
                                        className=""
                                        objectFit="cover"
                                        fill
                                    />
                                ) : (
                                    <div className="flex flex-col justify-center items-center w-full">
                                        <LuImagePlus className="tablet:text-[60px] desktop:text-[160px]" />
                                        <input
                                            ref={inputFileRef}
                                            className="hidden"
                                            type="file"
                                            onChange={handleUploadFile}
                                        />
                                        <button
                                            onClick={() =>
                                                handleClickUploadFile()
                                            }
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                                        >
                                            Select photo from computer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="basis-1/2 p-4 border-l">
                            <div className="flex gap-4 items-center">
                                <div className="relative rounded-full w-[40px] h-[40px]">
                                    <Image
                                        src={userData?.image ?? ""}
                                        alt="avatar"
                                        className="rounded-full"
                                        objectFit="cover"
                                        fill
                                    />
                                </div>
                                <span className="font-semibold text-base">
                                    {userData?.username}
                                </span>
                            </div>
                            <div className="mt-4">
                                <div className="px-0 py-2 bg-white rounded-t-lg">
                                    <textarea
                                        rows={4}
                                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                        placeholder="Write a caption..."
                                        value={caption}
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={classNames(
                                "text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
                                {
                                    ["cursor-wait bg-blue-400 hover:bg-blue-400"]:
                                        loading || disabledSubmit,
                                    ["bg-blue-600 hover:bg-blue-700"]:
                                        !loading && !disabledSubmit,
                                }
                            )}
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
