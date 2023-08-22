import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: any }) {
    try {
        const { userId } = context.params;
        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ errorMessage: "Invalid ID" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });


        return NextResponse.json(existingUser);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
