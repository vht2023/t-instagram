import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, context: { params: any }) {
    try {
        const { notiId } = context.params;

        if (!notiId || typeof notiId !== "string") {
            throw new Error("Invalid ID");
        }

        await prisma.notification.delete({
            where: {
                id: notiId,
            },
        });

        return NextResponse.json({ status: 200, data: "OK" });
    } catch (error) {
        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}
