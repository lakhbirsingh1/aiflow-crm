import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const session = cookieStore.get("aiflow_session");

  if (!session?.value) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.value,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      googleId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}