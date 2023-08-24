import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { idUserTarget } = await request.json();

        await prisma.user.update({
            where: {
                id: currentUser?.id,
            },
            data: {
                followingIds: currentUser?.followingIds.filter(id => id !== idUserTarget),
            },
        });

        const targetUser = await prisma.user.findUnique({
            where: {
                id: idUserTarget,
            },
        });

        if (!targetUser)
            return NextResponse.json({ errorMessage: "Invalid User" });

        await prisma.user.update({
            where: {
                id: idUserTarget,
            },
            data: {
                followerIds: targetUser.followerIds.filter(id => id !== currentUser?.id),
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
