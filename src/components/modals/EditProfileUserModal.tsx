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
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import axios from "axios";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";

interface PropsType {
    userData: any;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfileUserModal: React.FC<PropsType> = ({
    userData,
    open,
    setOpen,
}: PropsType) => {
    const inputFileRef = useRef<any>(null);
    const { mutate: mutateFetchedUser } = useUser(userData?.id);
    const [profileImage, setProfileImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const handleClickUploadFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleUploadFile = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setDisabledButton(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "t-insta");
            formData.append("api_key", "789532596783883");
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dgn01fb11/image/upload`,
                formData
            );
            if (response.status === 200) {
                setDisabledButton(false);
                setProfileImage(response.data.url);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        await axios.patch("/api/users/edit", {
            name,
            userName,
            bio,
            profileImage,
            isPrivate
        });
        await mutateFetchedUser();
        toast.success("Edited Profile Successfully!");
        setOpen(false);
        setLoading(false);
    };

    useEffect(() => {
        if (open && userData) {
            setProfileImage(userData.image);
            setName(userData.name);
            setUserName(userData.username);
            setBio(userData.bio);
            setIsPrivate(userData.isPrivate);
            setDisabledButton(false);
            setLoading(false);
        }
    }, [open, userData]);

    return (
        <div
            className={classNames(
                "justify-center items-center fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-neutral-500/20",
                { ["hidden"]: open === false, ["flex"]: open === true }
            )}
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Edit Profile
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            onClick={() => setOpen(false)}
                        >
                            <MdClose className="text-lg" />
                        </button>
                    </div>
                    <div className="py-6 px-4 space-y-6">
                        {userData ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex basis-1/5 justify-end">
                                        {profileImage ? (
                                            <div className="relative mr-4 w-[60px] h-[60px] max-w-[60px] max-h-[60px] rounded-full">
                                                <Image
                                                    src={profileImage ?? ""}
                                                    alt="avatar"
                                                    className="rounded-full"
                                                    objectFit="cover"
                                                    fill
                                                />
                                            </div>
                                        ) : (
                                            <HiOutlineUserCircle className="text-[60px] mr-4" />
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            ref={inputFileRef}
                                            className="hidden"
                                            type="file"
                                            onChange={handleUploadFile}
                                        />
                                        <span
                                            onClick={() =>
                                                handleClickUploadFile()
                                            }
                                            className="cursor-pointer text-blue-500"
                                        >
                                            Change profile photo
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex basis-1/5 justify-end">
                                        <span className="mr-4">Email</span>
                                    </div>
                                    <input
                                        value={userData.email}
                                        disabled
                                        className="cursor-not-allowed w-80 text-sm bg-gray-300/40 border border-stone-700/20 rounded focus:border-transparent py-2 h-10"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex basis-1/5 justify-end">
                                        <span className="mr-4">Name</span>
                                    </div>
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent py-2 h-10"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex basis-1/5 justify-end">
                                        <span className="mr-4">Username</span>
                                    </div>
                                    <input
                                        value={userName ?? "[no_username]"}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent py-2 h-10"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex basis-1/5 justify-end">
                                        <span className="mr-4">Bio</span>
                                    </div>
                                    <input
                                        value={bio ?? "[no_bio]"}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent py-2 h-10"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex basis-1/5 justify-end">
                                        <span className="mr-4">
                                            Public Account
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={!isPrivate}
                                            className="sr-only peer"
                                            onChange={(e) => setIsPrivate(!e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        ) : null}
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
                            disabled={loading || disabledButton}
                            type="button"
                            className={classNames(
                                "text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
                                {
                                    ["bg-blue-400 hover:bg-blue-400"]:
                                        disabledButton || loading,
                                    ["bg-blue-600 hover:bg-blue-700 "]:
                                        !disabledButton && !loading,
                                }
                            )}
                            onClick={() => handleSubmit()}
                        >
                            {loading && (
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
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileUserModal;
