import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

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
                    waitingFollowerIds: targetUser.waitingFollowerIds.concat(currentUser.id),
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
        }

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
