import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const LEADS_LIST_ID = 1131578;

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "-";

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
        lists_ToSubscribe: [LEADS_LIST_ID],
      }),
    });

    const text = await res.text();
    let data: { id?: number; message?: string } | null = null;
    try { data = JSON.parse(text); } catch { /* plain text response */ }

    if (data?.id) {
      return NextResponse.json({ success: true });
    }

    const alreadyExists =
      data?.message?.includes("already exists") ||
      text.includes("already exists");

    if (res.status === 400 && alreadyExists) {
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
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SMOOVE_API_KEY}`,
            },
            body: JSON.stringify({ email, lists_ToSubscribe: [LEADS_LIST_ID] }),
          });
          return NextResponse.json({ success: true });
        }
      }
    }
  } catch (err) {
    console.error("Smoove subscribe error:", err);
  }

  return NextResponse.json({ success: true });
}
