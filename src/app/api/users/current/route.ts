import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();
        if (currentUser) {
            return NextResponse.json(currentUser);
        }
    } catch (error) {
        console.log(error);

        return NextResponse.json({ errorMessage: error });
    }
}
