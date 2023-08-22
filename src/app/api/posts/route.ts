import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                isPublic: true,
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
