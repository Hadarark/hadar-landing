import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_PAID_LIST_ID = 1129605;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "No email" }, { status: 400 });
  }

  try {
    const res = await fetch("https://rest.smoove.io/v1/Contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SMOOVE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        lists_ToSubscribe: [SMOOVE_PAID_LIST_ID],
        lists_ToUnSubscribe: [1129489],
      }),
    });
    const result = await res.text();
    console.log("Add to paid list:", res.status, result);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Smoove error:", err);
    return NextResponse.json({ error: "Smoove error" }, { status: 500 });
  }
}
