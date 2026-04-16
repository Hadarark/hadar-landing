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

  const res = await fetch("https://rest.smoove.io/v1/Contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SMOOVE_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Smoove error:", text);
    return NextResponse.json({ error: "Smoove error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
