import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("aiflow_session");

    if (!session?.value) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
          error: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.value,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "GET /api/auth/my-profile error:",
      error
    );

    return NextResponse.json(
      {
        authenticated: false,
        user: null,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("aiflow_session");

    if (!session?.value) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is too long",
        },
        { status: 400 }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: session.value,
        },
        select: {
          id: true,
        },
      });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const updatedUser =
      await prisma.user.update({
        where: {
          id: session.value,
        },
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "PUT /api/auth/my-profile error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to update profile",
      },
      { status: 500 }
    );
  }
}