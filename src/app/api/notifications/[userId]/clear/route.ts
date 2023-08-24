import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(_: Request, context: { params: any }) {
    try {
        const { userId } = context.params;

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }
console.log(userId);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false,
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
