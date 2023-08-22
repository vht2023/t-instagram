import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(request: Request) {
    try {
        const { currentUser } = await serverAuth();

        const { idUserRequest } = await request.json();
       
        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                waitingFollowerIds: currentUser.waitingFollowerIds.filter(id => id !== idUserRequest),
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
