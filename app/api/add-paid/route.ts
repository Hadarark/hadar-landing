import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_PAID_LIST_ID = 1129605;
const SMOOVE_WAITLIST_ID = 1129489;

export async function POST(req: NextRequest) {
  const { email, smooveId } = await req.json();

  if (!email && !smooveId) {
    return NextResponse.json({ error: "Missing email or smooveId" }, { status: 400 });
  }

  try {
    let contactId = smooveId;

    // If we have the ID, use PUT to update the existing contact
    if (contactId) {
      const res = await fetch(`https://rest.smoove.io/v1/Contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SMOOVE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          lists_ToSubscribe: [SMOOVE_PAID_LIST_ID],
          lists_ToUnSubscribe: [SMOOVE_WAITLIST_ID],
        }),
      });
      const result = await res.json();
      console.log("PUT contact to paid list:", res.status, result?.lists_Linked);
      return NextResponse.json({ ok: true });
    }

    // Fallback: try POST for new contacts (in case smooveId wasn't saved)
    const res = await fetch("https://rest.smoove.io/v1/Contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SMOOVE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        lists_ToSubscribe: [SMOOVE_PAID_LIST_ID],
      }),
    });
    const result = await res.text();
    console.log("POST contact to paid list:", res.status, result);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Smoove error:", err);
    return NextResponse.json({ error: "Smoove error" }, { status: 500 });
  }
}
