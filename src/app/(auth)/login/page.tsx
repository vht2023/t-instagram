"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiShow, BiSolidHide } from "react-icons/bi";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import classNames from "classnames";

const Login: React.FC = () => {
    const {
        register,
        handleSubmit: handleSubmitRegister,
        formState: { errors },
        watch,
    } = useForm<any>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<any> = async (data) => {
        setIsLoading(true);
        try {
            await signIn("credentials", data);
            toast.success("Logged Successfully!");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setIsLoading(false);
        }
    };

    async function loginWithGoogle(e: any) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            toast.error("Something went wrong with your login.");
        } finally {
            setIsLoading(false);
        }
    }

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

            <button
                disabled={isLoading}
                type="submit"
                className={classNames(
                    "mt-4 bg-sky-500 w-80 h-10 rounded text-white font-medium hover:bg-sky-400 transition-all delay-75",
                    {
                        ['bg-sky-500/60']: isLoading
                    }
                )}
            >
                Login
            </button>
            <div className="mt-3 flex justify-center w-80 text-sm">
                <span>Do not have an account?</span>
                <Link
                    href="/register"
                    className="ml-1 cursor-pointer text-blue-700 underline"
                >
                    Register
                </Link>
            </div>
            <div className="mt-3 flex justify-center items-center w-80 text-sm gap-2">
                <div className="w-36 h-[1px] border-t border-gray-700" />
                <span>Or</span>
                <div className="w-36 h-[1px] border-t border-gray-700" />
            </div>
            <button
                onClick={loginWithGoogle}
                className="flex justify-center items-center gap-2 mt-4 w-80 h-10 rounded border border-black text-black font-medium transition-all delay-75"
            >
                <FcGoogle />
                <span>Login with Google</span>
            </button>
        </form>
    );
};

export default Login;
