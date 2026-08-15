import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Server-side authentication + ADMIN authorization
    await requireAdmin();

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        googleId: true,
        createdAt: true,

        _count: {
          select: {
            leads: true,
            campaigns: true,
            activities: true,
          },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountType: user.googleId ? "Google" : "Password",
      createdAt: user.createdAt,
      leadsCount: user._count.leads,
      campaignsCount: user._count.campaigns,
      activitiesCount: user._count.activities,
    }));

    return NextResponse.json(
      {
        success: true,
        users: formattedUsers,
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
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated",
        },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied",
        },
        { status: 403 }
      );
    }

    console.error(
      "GET /api/admin/users error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch users",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Server-side authentication + ADMIN authorization
    const admin = await requireAdmin();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id")?.trim();

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Never allow an admin to delete their own account
    if (userId === admin.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You cannot delete your own admin account",
        },
        { status: 400 }
      );
    }

    // Find target user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // User does not exist
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Never allow ADMIN accounts to be deleted
    if (user.role === "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: "Admin accounts cannot be deleted",
        },
        { status: 403 }
      );
    }

    /*
     * Delete everything belonging to this user.
     *
     * Because the Prisma schema does not use
     * onDelete: Cascade, related records must
     * be removed manually before deleting User.
     */
    await prisma.$transaction(async (tx) => {
      // Delete activities owned directly by the user
      await tx.activity.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Delete activities belonging to this user's leads
      await tx.activity.deleteMany({
        where: {
          lead: {
            ownerId: userId,
          },
        },
      });

      // Delete activities belonging to this user's campaigns
      await tx.activity.deleteMany({
        where: {
          campaign: {
            ownerId: userId,
          },
        },
      });

      // Delete user's leads
      await tx.lead.deleteMany({
        where: {
          ownerId: userId,
        },
      });

      // Delete user's campaigns
      await tx.campaign.deleteMany({
        where: {
          ownerId: userId,
        },
      });

      // Finally delete the user
      await tx.user.delete({
        where: {
          id: userId,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
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
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated",
        },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied",
        },
        { status: 403 }
      );
    }

    console.error(
      "DELETE /api/admin/users error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete user",
      },
      { status: 500 }
    );
  }
}