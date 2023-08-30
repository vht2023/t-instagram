import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id || typeof id !== "string") {
            throw new Error("Invalid ID");
        }

        await prisma.like.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
