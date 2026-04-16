import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_PAID_LIST_ID = 1129605;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    console.log("Cardcom webhook raw body:", body);

    // Cardcom sends form-encoded data
    const params = new URLSearchParams(body);
    const responseCode = params.get("ResponseCode");
    const email =
      params.get("Email") ||
      params.get("email") ||
      params.get("CustomerEmail") ||
      params.get("customer_email") ||
      "";

    console.log("Cardcom ResponseCode:", responseCode);
    console.log("Cardcom Email:", email);
    console.log("All params:", Object.fromEntries(params.entries()));

    // ResponseCode "0" means success in Cardcom
    if (responseCode !== "0") {
      console.log("Payment not successful, skipping Smoove update");
      return NextResponse.json({ ok: true });
    }

    if (!email) {
      console.error("No email found in Cardcom webhook");
      return NextResponse.json({ ok: true });
    }

    // Add contact to paid list
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
    console.log("Smoove status:", res.status);
    console.log("Smoove body:", result);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Cardcom webhook error:", err);
    return NextResponse.json({ ok: true }); // Always return 200 to Cardcom
  }
}

// Cardcom may also send GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ ok: true });
}
