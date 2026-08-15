import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        success: false,
        message: "Google OAuth is not configured.",
      },
      { status: 500 },
    );
  }

  const googleUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth",
  );

  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set(
    "scope",
    "openid email profile",
  );
  googleUrl.searchParams.set(
    "access_type",
    "offline",
  );
  googleUrl.searchParams.set(
    "prompt",
    "select_account",
  );

  return NextResponse.redirect(googleUrl);
}