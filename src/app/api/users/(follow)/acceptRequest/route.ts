import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { idUserRequest } = await request.json();
        const userRequest = await prisma.user.findUnique({
            where: {
                id: idUserRequest,
            },
        });

        if (!userRequest)
            return NextResponse.json({ errorMessage: "Invalid User" });

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followerIds: currentUser.followerIds.concat(idUserRequest),
                waitingFollowerIds: currentUser.waitingFollowerIds.filter(id => id !== idUserRequest),
            },
        });

        await prisma.user.update({
            where: {
                id: userRequest.id,
            },
            data: {
                followingIds: userRequest.followingIds.concat(currentUser.id),
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
