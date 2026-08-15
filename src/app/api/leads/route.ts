import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "NURTURING",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

const VALID_SOURCES = [
  "WEBSITE",
  "LINKEDIN",
  "EMAIL",
  "COLD_OUTREACH",
  "REFERRAL",
  "OTHER",
] as const;

type LeadStatusValue = (typeof VALID_STATUSES)[number];
type LeadSourceValue = (typeof VALID_SOURCES)[number];

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
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
      leads,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const firstName =
      typeof body.firstName === "string"
        ? body.firstName.trim()
        : "";

    const lastName =
      typeof body.lastName === "string"
        ? body.lastName.trim() || null
        : null;

    const email =
      typeof body.email === "string"
        ? body.email.trim() || null
        : null;

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim() || null
        : null;

    const company =
      typeof body.company === "string"
        ? body.company.trim() || null
        : null;

    const jobTitle =
      typeof body.jobTitle === "string"
        ? body.jobTitle.trim() || null
        : null;

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    /*
     * Resolve owner automatically.
     * Authentication connect hone tak first user
     * default owner ke roop mein use hoga.
     */
    let ownerId =
      typeof body.ownerId === "string"
        ? body.ownerId
        : null;

    if (!ownerId) {
      const defaultOwner = await prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!defaultOwner) {
        return NextResponse.json(
          {
            success: false,
            message:
              "No user found. Please create a user first.",
          },
          { status: 400 },
        );
      }

      ownerId = defaultOwner.id;
    }

    /*
     * Make sure owner actually exists.
     */
    const owner = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      return NextResponse.json(
        {
          success: false,
          message: "Owner not found",
        },
        { status: 404 },
      );
    }

    /*
     * Status
     */
    const rawStatus =
      typeof body.status === "string"
        ? body.status.toUpperCase()
        : "NEW";

    const status: LeadStatusValue =
      (VALID_STATUSES as readonly string[]).includes(
        rawStatus,
      )
        ? (rawStatus as LeadStatusValue)
        : "NEW";

    /*
     * Source
     */
    const rawSource =
      typeof body.source === "string"
        ? body.source.toUpperCase()
        : null;

    const source: LeadSourceValue | null =
      rawSource &&
      (VALID_SOURCES as readonly string[]).includes(
        rawSource,
      )
        ? (rawSource as LeadSourceValue)
        : null;

    /*
     * Score
     */
    let score: number | null = null;

    if (
      typeof body.score === "number" &&
      Number.isFinite(body.score)
    ) {
      score = body.score;
    }

    if (
      typeof body.score === "string" &&
      body.score.trim() !== ""
    ) {
      const parsedScore = Number(body.score);

      if (Number.isFinite(parsedScore)) {
        score = parsedScore;
      }
    }

    /*
     * Create lead
     */
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,

        // Prisma enum expects the generated enum-compatible value.
        status: status as any,

        // null is allowed if source isn't provided.
        source: source as any,

        score,
        ownerId,
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

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        lead,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/leads error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create lead",
      },
      { status: 500 },
    );
  }
}