import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import UsersPage from "./users-page";

export const dynamic = "force-dynamic";

export default async function UsersRoute() {
  const cookieStore = await cookies();

  const session = cookieStore.get("aiflow_session");

  // --------------------------------------------------
  // 1. Authentication check
  // --------------------------------------------------

  if (!session?.value) {
    redirect("/login");
  }

  const sessionUserId = session.value.trim();

  if (!sessionUserId) {
    redirect("/login");
  }

  // --------------------------------------------------
  // 2. Verify session against database
  // NEVER trust frontend/admin UI
  // --------------------------------------------------

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUserId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  // --------------------------------------------------
  // 3. Invalid/deleted session
  // --------------------------------------------------

  if (!user) {
    redirect("/login");
  }

  // --------------------------------------------------
  // 4. ADMIN ONLY
  // --------------------------------------------------

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // --------------------------------------------------
  // 5. Only ADMIN reaches the Users UI
  // --------------------------------------------------

  return <UsersPage />;
}