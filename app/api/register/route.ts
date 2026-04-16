import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_LIST_ID = 1129489;

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "-";

  const body = {
    email,
    firstName,
    lastName,
    cellPhone: phone,
    listId: SMOOVE_LIST_ID,
  };

  // Log to console for Vercel logs
  console.log("New registration:", { firstName, lastName, email, phone });

  return NextResponse.json({ success: true });
}
