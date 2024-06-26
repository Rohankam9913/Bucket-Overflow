import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const public_paths = path === "/login" || path === "/register";

    const token = cookies().get("access_token");

    if (!token && !public_paths) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    else if(token && public_paths){
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [
        "/tags",
        "/all_questions",
        "/askQuestion",
        "/users",
        "/login",
        "/register",
        "/all_questions/:questionTitle*",
        "/singleTag/:tagged*",
        "/profile/:user_id*",
        "/profile/update_profile"
    ]
};