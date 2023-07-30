import { NextResponse } from "next/server";

export function middleware(request) {
  const csrfToken = request.cookies.get("csrftoken");
  const sessionId = request.cookies.get("sessionid");

  // Pages that are restricted if a user is not logged in
  if (!csrfToken || !sessionId) {
    if (request.nextUrl.pathname === "/my-finances/expenses") {
      return NextResponse.error(new Error("Page not found"), { status: 404 });
    } else if (request.nextUrl.pathname === "/my-finances") {
      return NextResponse.error(new Error("Page not found"), { status: 404 });
    }
  }
}
