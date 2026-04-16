import { NextRequest, NextResponse } from "next/server";

const SMOOVE_API_KEY = "e052d9e6-fc9b-4133-b284-3b22d6af1696";
const SMOOVE_PAID_LIST_ID = 1129605;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Log all params Cardcom sends
  const allParams = Object.fromEntries(searchParams.entries());
  console.log("Cardcom success params:", JSON.stringify(allParams));

  // Cardcom may send email in different field names
  const email =
    searchParams.get("Email") ||
    searchParams.get("email") ||
    searchParams.get("CustomerEmail") ||
    searchParams.get("customer_email") ||
    searchParams.get("CardOwnerEmail") ||
    "";

  const responseCode =
    searchParams.get("ResponseCode") ||
    searchParams.get("responseCode") ||
    "0";

  console.log("Email:", email, "ResponseCode:", responseCode);

  if (email && responseCode === "0") {
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
        }),
      });
      const result = await res.text();
      console.log("Smoove status:", res.status, "body:", result);
    } catch (err) {
      console.error("Smoove error:", err);
    }
  }

  // Redirect to thank you page
  return NextResponse.redirect(
    new URL("/thank-you", req.url)
  );
}

// Cardcom may also POST
export async function POST(req: NextRequest) {
  const body = await req.text();
  console.log("Cardcom success POST body:", body);

  const params = new URLSearchParams(body);
  const allParams = Object.fromEntries(params.entries());
  console.log("Cardcom success POST params:", JSON.stringify(allParams));

  const email =
    params.get("Email") ||
    params.get("email") ||
    params.get("CustomerEmail") ||
    params.get("CardOwnerEmail") ||
    "";

  const responseCode = params.get("ResponseCode") || "0";

  if (email && responseCode === "0") {
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
        }),
      });
      const result = await res.text();
      console.log("Smoove status:", res.status, "body:", result);
    } catch (err) {
      console.error("Smoove error:", err);
    }
  }

  return NextResponse.redirect(new URL("/thank-you", req.url));
}
