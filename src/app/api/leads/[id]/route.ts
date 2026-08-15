import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================
   PATCH — Update Lead
========================= */

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      status,
      source,
      score,
    } = body;

    if (!firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    const existingLead = await prisma.lead.findUnique({
      where: {
        id,
      },
    });

    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 },
      );
    }

    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        firstName: firstName.trim(),
        lastName: lastName?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        jobTitle: jobTitle?.trim() || null,
        status: status || "NEW",
        source: source || null,
        score:
          score === null ||
          score === undefined ||
          score === ""
            ? null
            : Number(score),
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("PATCH /api/leads/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update lead",
      },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE — Delete Lead
========================= */

export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required",
        },
        { status: 400 },
      );
    }

    const existingLead = await prisma.lead.findUnique({
      where: {
        id,
      },
    });

    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 },
      );
    }

    await prisma.lead.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/leads/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete lead",
      },
      { status: 500 },
    );
  }
}