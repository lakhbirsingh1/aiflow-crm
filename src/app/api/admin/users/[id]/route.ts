import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const admin = await requireAdmin();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Admin apne aap ko delete nahi kar sakta
    if (admin.id === id) {
      return NextResponse.json(
        {
          success: false,
          error: "You cannot delete your own admin account.",
        },
        { status: 403 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Kisi bhi ADMIN ko delete nahi karne denge
    // Isse accidental/malicious admin deletion se protection rahegi.
    if (targetUser.role === "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error: "Admin accounts cannot be deleted.",
        },
        { status: 403 }
      );
    }

    /*
     * Delete user and their owned data.
     *
     * We use a transaction so the operation is atomic.
     */
    await prisma.$transaction(async (tx) => {
      // Activities created by this user
      await tx.activity.deleteMany({
        where: {
          userId: id,
        },
      });

      // Activities belonging to user's campaigns
      await tx.activity.deleteMany({
        where: {
          campaign: {
            ownerId: id,
          },
        },
      });

      // Activities belonging to user's leads
      await tx.activity.deleteMany({
        where: {
          lead: {
            ownerId: id,
          },
        },
      });

      // User's campaigns
      await tx.campaign.deleteMany({
        where: {
          ownerId: id,
        },
      });

      // User's leads
      await tx.lead.deleteMany({
        where: {
          ownerId: id,
        },
      });

      // Finally delete the user
      await tx.user.delete({
        where: {
          id,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
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
      "DELETE /api/admin/users/[id] error:",
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