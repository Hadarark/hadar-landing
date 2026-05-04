import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const MAGNET_LIST_ID = 1133142;
const NOTIFY_EMAIL = "hadararkadash@gmail.com";

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

function normalizeEmail(email: string): string {
  return email.toLowerCase().replace(/\+[^@]+(?=@)/, "");
}

async function findContactByEmail(email: string): Promise<number | null> {
  const res = await fetch(
    `https://rest.smoove.io/v1/Contacts?pageSize=5000`,
    { headers: { Authorization: `Bearer ${SMOOVE_API_KEY}` } }
  );
  if (!res.ok) return null;
  const contacts: { id: number; email: string }[] = await res.json();
  const normalizedLookup = normalizeEmail(email);
  const match = contacts.find(
    (c) => c.email && normalizeEmail(c.email) === normalizedLookup
  );
  return match?.id ?? null;
}

async function notifyManualAdd(name: string, email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: NOTIFY_EMAIL,
      subject: "נרשמת לחוברת — יש להוסיף ידנית לסמוב",
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
        <p>מישהי הורידה את החוברת אבל לא נוספה אוטומטית לרשימה בסמוב.</p>
        <p><strong>שם:</strong> ${name}<br/>
        <strong>מייל:</strong> ${email}</p>
        <p>יש להוסיף ידנית לרשימה 1133142 בסמוב.</p>
      </div>`,
    }),
  });
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
      } else {
        // Contact exists in Smoove but not findable via API — notify manually
        await notifyManualAdd(name, email);
      }
    }
  } catch (err) {
    console.error("Smoove magnet subscribe error:", err);
  }

  return NextResponse.json({ success: true });
}
