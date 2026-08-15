import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const remember = Boolean(body.remember);

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        googleId: true,
      },
    });

    /*
     * Do not reveal whether the email exists.
     */
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    /*
     * Google-only accounts don't have a password.
     * They must use "Continue with Google".
     */
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message: user.googleId
            ? "This account uses Google sign-in. Please continue with Google."
            : "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );

    /*
     * Session cookie
     *
     * Remember checked:
     * → Cookie persists for 30 days.
     *
     * Remember unchecked:
     * → Session cookie expires when the browser session ends.
     */
    response.cookies.set("aiflow_session", user.id, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(remember
        ? {
            maxAge: 60 * 60 * 24 * 30,
          }
        : {}),
    });

    return response;
  } catch (error) {
    console.error(
      "POST /api/auth/login error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}