import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: any }) {
    try {
        const { userId } = context.params;

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
