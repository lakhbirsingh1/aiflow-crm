import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/login?error=google_cancelled", request.url),
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Google OAuth environment variables are missing.");

      return NextResponse.redirect(
        new URL("/login?error=google_config", request.url),
      );
    }

    const redirectUri =
      `${request.nextUrl.origin}/api/auth/google/callback`;

    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      },
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);

      return NextResponse.redirect(
        new URL("/login?error=google_token", request.url),
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const googleUser = await userResponse.json();

    if (!userResponse.ok || !googleUser.email) {
      console.error("Google user information failed:", googleUser);

      return NextResponse.redirect(
        new URL("/login?error=google_user", request.url),
      );
    }

    const email = String(googleUser.email)
      .trim()
      .toLowerCase();

    const name =
      String(googleUser.name ?? "").trim() ||
      email.split("@")[0];

    const googleId = String(googleUser.id);

    let user = await prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
    }

    if (user) {
      if (user.googleId !== googleId) {
        user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            googleId,
          },
        });
      }
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          googleId,
          password: null,
        },
      });
    }

    const response = NextResponse.redirect(
      new URL("/dashboard", request.url),
    );

    response.cookies.set("aiflow_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(
      "GET /api/auth/google/callback error:",
      error,
    );

    return NextResponse.redirect(
      new URL("/login?error=google_auth", request.url),
    );
  }
}