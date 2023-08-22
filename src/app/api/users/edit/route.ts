import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { name, userName, bio, profileImage, isPrivate } = await request.json();

        console.log(currentUser);
        console.log(name);
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username: userName,
                bio,
                image: profileImage,
                isPrivate
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
