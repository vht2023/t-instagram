import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: any }) {
    try {
        const { userId } = context.params;
        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ errorMessage: "Invalid ID" });
        }

        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
            include: {
                author: true,
                comments: true,
                likes: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
