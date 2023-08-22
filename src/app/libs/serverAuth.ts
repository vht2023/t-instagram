import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const serverAuth = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error("Not signed in");
    }

    return { currentUser };
}

export default serverAuth;