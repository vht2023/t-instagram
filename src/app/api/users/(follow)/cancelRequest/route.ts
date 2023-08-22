import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { idUserTarget } = await request.json();

        const userTarget = await prisma.user.findUnique({
            where: {
                id: idUserTarget,
            },
        });

        if (!userTarget)
            return NextResponse.json({ errorMessage: "Invalid User" });

        await prisma.user.update({
            where: {
                id: userTarget.id,
            },
            data: {
                waitingFollowerIds: userTarget.waitingFollowerIds.filter(
                    (id) => id !== currentUser.id
                ),
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
