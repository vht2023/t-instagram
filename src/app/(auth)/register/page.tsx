"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiShow, BiSolidHide } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

const Register: React.FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit: handleSubmitRegister,
        formState: { errors },
        watch,
    } = useForm<any>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<any> = async (data, e) => {
        e?.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("/api/register", {
                email: data.email,
                name: data.name,
                username: data.username,
                password: data.password,
            });
            // .then(() =>
            //     signIn("credentials", {
            //         email: data.email,
            //         password: data.password,
            //     })
            // );
            toast.success("Registered Account Successfully!");
            signIn("credentials", {
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            toast.error("Something went wrong with your register.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmitRegister(onSubmit)}
            className="flex justify-center items-center border border-stone-700/20 p-8 flex-col"
        >
            <Image
                src="/images/t-instagram-logo.png"
                width={200}
                height={200}
                alt="logo"
                className="mb-8 mt-2"
            />
            <div className="relative">
                <span className="absolute top-1 left-3 text-[10px] text-slate-500">
                    Username
                </span>
                <input
                    className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent pt-4 pb-1 h-12"
                    {...register("username", {
                        required: true,
                    })}
                />
            </div>
            {errors.username && (
                <span className="text-sm text-red-500 float-left block w-80 mt-1">
                    Username is required!
                </span>
            )}
            <div className="relative mt-4">
                <span className="absolute top-1 left-3 text-[10px] text-slate-500">
                    Email
                </span>
                <input
                    className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent pt-4 pb-1 h-12"
                    type="text"
                    {...register("email", {
                        required: "Email is required!",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email invalid!",
                        },
                    })}
                />
            </div>
            {errors.email && (
                <span className="text-sm text-red-500 float-left block w-80 mt-1">
                    {errors.email.message?.toString()}
                </span>
            )}
            <div className="relative mt-4">
                <span className="absolute top-1 left-3 text-[10px] text-slate-500">
                    Name
                </span>
                <input
                    className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent pt-4 pb-1 h-12"
                    {...register("name", {
                        required: true,
                    })}
                />
            </div>
            {errors.username && (
                <span className="text-sm text-red-500 float-left block w-80 mt-1">
                    Name is required!
                </span>
            )}
            <div className="relative mt-4">
                <span className="absolute top-1 left-3 text-[10px] text-slate-500">
                    Password
                </span>
                {showPassword ? (
                    <BiSolidHide
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute bottom-4 right-2 cursor-pointer"
                    />
                ) : (
                    <BiShow
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute bottom-4 right-2 cursor-pointer"
                    />
                )}

                <input
                    className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent pt-4 pb-1 h-12"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                        required: "Password is required!",
                        validate: (value) =>
                            value.length >= 6 ||
                            "Password length must be at least 6 characters",
                    })}
                />
            </div>
            {errors.password && (
                <span className="text-sm text-red-500 float-left block w-80 mt-1">
                    {errors.password.message?.toString()}
                </span>
            )}
            <div className="relative mt-4">
                <span className="absolute top-1 left-3 text-[10px] text-slate-500">
                    Confirm Password
                </span>
                {showConfirmPassword ? (
                    <BiSolidHide
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute bottom-4 right-2 cursor-pointer"
                    />
                ) : (
                    <BiShow
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute bottom-4 right-2 cursor-pointer"
                    />
                )}
                <input
                    className="w-80 text-sm bg-gray-200/20 border border-stone-700/20 rounded focus:border-transparent pt-4 pb-1 h-12"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                        required: "Confirm password is required!",
                        validate: (value) =>
                            value === watch("password") ||
                            "Password does not match",
                    })}
                />
            </div>
            {errors.confirmPassword && (
                <span className="text-sm text-red-500 float-left block w-80 mt-1">
                    {errors.confirmPassword.message?.toString()}
                </span>
            )}

            <button
                disabled={isLoading}
                type="submit"
                className={classNames(
                    "mt-4 bg-sky-500 w-80 h-10 rounded text-white font-medium hover:bg-sky-400 transition-all delay-75",
                    {
                        ["bg-sky-500/60"]: isLoading,
                    }
                )}
            >
                Register
            </button>
            <div className="mt-3 flex justify-center items-center w-80 text-sm">
                <span>Do you already have an account?</span>
                <Link
                    href="/login"
                    className="ml-1 cursor-pointer text-blue-700 underline"
                >
                    Login
                </Link>
            </div>
        </form>
    );
};

export default Register;
