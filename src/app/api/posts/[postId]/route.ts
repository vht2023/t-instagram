import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: any }) {
    try {
        const { postId } = context.params;
        if (!postId || typeof postId !== "string") {
            return NextResponse.json({ errorMessage: "Invalid ID" });
        }

        const existingPost = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                likes: true,
            },
        });

        return NextResponse.json(existingPost);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
