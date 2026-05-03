import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const MAGNET_LIST_ID = 1133142;

const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SMOOVE_API_KEY}`,
};

// Smoove rejects requests with non-ASCII characters in JSON bodies.
// Encoding to \uXXXX sequences produces valid JSON that Smoove can parse.
function escapeForSmoove(obj: object): string {
  return JSON.stringify(obj).replace(
    /[^\x00-\x7F]/g,
    (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
  );
}

async function addToList(contactId: number) {
  await fetch(`https://rest.smoove.io/v1/Contacts/${contactId}`, {
    method: "PUT",
    headers: HEADERS,
    body: escapeForSmoove({ lists_ToSubscribe: [MAGNET_LIST_ID] }),
  });
}

async function findContactByEmail(email: string): Promise<number | null> {
  const res = await fetch(
    `https://rest.smoove.io/v1/Contacts?pageSize=5000`,
    { headers: { Authorization: `Bearer ${SMOOVE_API_KEY}` } }
  );
  if (!res.ok) return null;
  const contacts: { id: number; email: string }[] = await res.json();
  const match = contacts.find(
    (c) => c.email?.toLowerCase() === email.toLowerCase()
  );
  return match?.id ?? null;
}

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
      headers: HEADERS,
      body: escapeForSmoove({
        email,
        firstName,
        lastName,
        lists_ToSubscribe: [MAGNET_LIST_ID],
      }),
    });

    const text = await res.text();
    let data: { id?: number } | null = null;
    try { data = JSON.parse(text); } catch { /* plain text */ }

    if (data?.id) {
      return NextResponse.json({ success: true });
    }

    // Smoove returns 409 when the contact already exists
    if (res.status === 409 || text.includes("already exists")) {
      const contactId = await findContactByEmail(email);
      if (contactId) {
        await addToList(contactId);
      }
    }
  } catch (err) {
    console.error("Smoove magnet subscribe error:", err);
  }

  return NextResponse.json({ success: true });
}
