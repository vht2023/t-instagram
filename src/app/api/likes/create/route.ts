import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        const body = await request.json();
        const { postId } = body;

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const like = await prisma.like.create({
            data: {
                userId: currentUser?.id,
                postId,
            },
        });

        return NextResponse.json(like);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
