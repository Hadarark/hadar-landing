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
    // Step 1: Create/update contact globally
    const createRes = await fetch("https://rest.smoove.io/v1/Contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SMOOVE_API_KEY}`,
      },
      body: JSON.stringify({ email, firstName, lastName, cellPhone: phone }),
    });
    const createText = await createRes.text();
    console.log("Create contact status:", createRes.status);
    console.log("Create contact body:", createText);

    // Step 2: Add contact to the list via PUT
    const res = await fetch(
      `https://rest.smoove.io/v1/Lists/${SMOOVE_LIST_ID}/Contacts`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SMOOVE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          cellPhone: phone,
        }),
      }
    );

    const text = await res.text();
    console.log("Smoove response status:", res.status);
    console.log("Smoove response body:", text);
  } catch (err) {
    console.error("Smoove error:", err);
  }

  return NextResponse.json({ success: true });
}
