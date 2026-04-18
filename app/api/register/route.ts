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

  console.log("New registration:", { firstName, lastName, email, phone });

  try {
    const res = await fetch("https://rest.smoove.io/v1/Contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SMOOVE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        cellPhone: phone,
        lists_ToSubscribe: [SMOOVE_LIST_ID],
      }),
    });

    const data = await res.json();
    console.log("Smoove response status:", res.status, "id:", data?.id);
    if (data?.id) {
      return NextResponse.json({ success: true, smooveId: data.id });
    }

    // Contact already exists — find by email via GET /v1/Contacts
    if (res.status === 400 && data?.message?.includes("already exists")) {
      const allRes = await fetch("https://rest.smoove.io/v1/Contacts", {
        headers: { Authorization: `Bearer ${SMOOVE_API_KEY}` },
      });
      if (allRes.ok) {
        const contacts: { id: number; email: string }[] = await allRes.json();
        const existing = contacts.find(
          (c) => c.email?.toLowerCase() === email.toLowerCase()
        );
        if (existing?.id) {
          await fetch(`https://rest.smoove.io/v1/Contacts/${existing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${SMOOVE_API_KEY}` },
            body: JSON.stringify({ email, lists_ToSubscribe: [SMOOVE_LIST_ID] }),
          });
          return NextResponse.json({ success: true, smooveId: existing.id });
        }
      }
    }
  } catch (err) {
    console.error("Smoove error:", err);
  }

  return NextResponse.json({ success: true });
}
