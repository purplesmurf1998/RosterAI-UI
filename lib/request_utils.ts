import { NextRequest } from "next/server";

export function extractUserId(req: NextRequest): string {
  const userId = req.headers.get("x-user-id");
  if (!userId) throw Error("Unauthorized");
  return userId;
}