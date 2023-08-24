import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import { pusherServer } from "@/app/libs/pusher";

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
                id: currentUser?.id,
            },
            data: {
                followerIds: currentUser?.followerIds.concat(idUserRequest),
                waitingFollowerIds: currentUser?.waitingFollowerIds.filter(id => id !== idUserRequest),
            },
        });

        await prisma.user.update({
            where: {
                id: userRequest.id,
            },
            data: {
                followingIds: userRequest.followingIds.concat(currentUser?.id),
                hasNotification: true,
            },
        });

        await prisma.notification.create({
            data: {
                body: "has accepted your follow request.",
                link: `/user/${currentUser?.id}`,
                mediaUrl: currentUser?.image,
                userId: userRequest.id,
                username: currentUser?.username,
            },
        });

        await pusherServer.trigger(
            "follow_notifications",
            "follow_request",
            {
                link: `/user/${currentUser?.id}`,
                userId: userRequest.id,
                messages: "New Notifications",
            }
        );
        
        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
