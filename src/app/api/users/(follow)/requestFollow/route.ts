import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import { pusherServer } from "@/app/libs/pusher";
import { toPusherKey } from "@/app/libs/utils";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { idUserTarget, isPrivateUser } = await request.json();

        const targetUser = await prisma.user.findUnique({
            where: {
                id: idUserTarget,
            },
        });

        if (!targetUser)
            return NextResponse.json({ errorMessage: "Invalid User" });

        if (isPrivateUser) {
            await prisma.user.update({
                where: {
                    id: idUserTarget,
                },
                data: {
                    waitingFollowerIds: targetUser.waitingFollowerIds.concat(
                        currentUser.id
                    ),
                },
            });
            await prisma.notification.create({
                data: {
                    body: "requested to follow you.",
                    link: `/user/${currentUser.id}`,
                    mediaUrl: currentUser.image,
                    userId: targetUser.id,
                    username: currentUser.username,
                },
            });
        } else {
            await prisma.user.update({
                where: {
                    id: currentUser.id,
                },
                data: {
                    followingIds: currentUser.followingIds.concat(idUserTarget),
                },
            });
            await prisma.user.update({
                where: {
                    id: idUserTarget,
                },
                data: {
                    followerIds: targetUser.followerIds.concat(currentUser.id),
                },
            });
            await prisma.notification.create({
                data: {
                    body: "followed you.",
                    link: `/user/${currentUser.id}`,
                    mediaUrl: currentUser.image,
                    userId: targetUser.id,
                    username: currentUser.username,
                },
            });
            await pusherServer.trigger(
                "follow_notifications",
                "follow_request",
                {
                    link: `/user/${currentUser.id}`,
                    userId: targetUser.id,
                    messages: "New Notifications",
                }
            );
        }

        await prisma.user.update({
            where: {
                id: targetUser.id,
            },
            data: {
                hasNotification: true,
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
