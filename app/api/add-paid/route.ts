import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_PAID_LIST_ID = 1129605;
const SMOOVE_WAITLIST_ID = 1129489;

async function findContactIdByEmail(email: string): Promise<number | null> {
  const res = await fetch("https://rest.smoove.io/v1/Contacts", {
    headers: { Authorization: `Bearer ${SMOOVE_API_KEY}` },
  });
  if (!res.ok) return null;
  const contacts: { id: number; email: string }[] = await res.json();
  const contact = contacts.find(
    (c) => c.email?.toLowerCase() === email.toLowerCase()
  );
  return contact?.id ?? null;
}

async function moveContactToPaidList(contactId: number, email: string) {
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
  console.log("PUT to paid list:", res.status, result?.lists_Linked);
  return { ok: res.ok, status: res.status, lists: result?.lists_Linked };
}

export async function POST(req: NextRequest) {
  const { email, smooveId } = await req.json();

  if (!email && !smooveId) {
    return NextResponse.json({ error: "Missing email or smooveId" }, { status: 400 });
  }

  try {
    // 1. If we have the ID — use it directly
    if (smooveId) {
      const result = await moveContactToPaidList(Number(smooveId), email);
      return NextResponse.json(result);
    }

    // 2. No ID — search by email in Smoove
    const contactId = await findContactIdByEmail(email);
    if (contactId) {
      const result = await moveContactToPaidList(contactId, email);
      return NextResponse.json(result);
    }

    // 3. Contact doesn't exist yet — create directly in paid list
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
    const result = await res.json();
    console.log("POST new contact to paid list:", res.status, result?.id);
    return NextResponse.json({ ok: res.ok, status: res.status, lists: result?.lists_Linked });
  } catch (err) {
    console.error("Smoove error:", err);
    return NextResponse.json({ error: "Smoove error" }, { status: 500 });
  }
}
