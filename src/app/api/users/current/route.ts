import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();
        return NextResponse.json(currentUser);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ errorMessage: "Internal server error" });
    }
}