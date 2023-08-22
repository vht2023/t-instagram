import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth();
        const body = await request.json();
        const { caption, mediaUrl } = body;

        const post = await prisma.post.create({
            data: {
                caption,
                mediaUrl,
                authorId: currentUser.id,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
