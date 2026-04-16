import { NextRequest, NextResponse } from "next/server";

const SMOOVE_LP_URL = "https://lp.smoove.io/igww";

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ") || "-";

  console.log("New registration:", { firstName, lastName, email, phone });

  try {
    // Step 1: GET the Smoove landing page to extract VIEWSTATE tokens
    const getRes = await fetch(SMOOVE_LP_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const html = await getRes.text();

    // Extract VIEWSTATE and VIEWSTATEGENERATOR
    const viewStateMatch = html.match(
      /id="__VIEWSTATE"\s+value="([^"]+)"/
    );
    const viewStateGenMatch = html.match(
      /id="__VIEWSTATEGENERATOR"\s+value="([^"]+)"/
    );

    if (!viewStateMatch || !viewStateGenMatch) {
      console.error("Could not extract VIEWSTATE from Smoove LP");
      // Still return success — contact will be logged
      return NextResponse.json({ success: true });
    }

    const viewState = viewStateMatch[1];
    const viewStateGenerator = viewStateGenMatch[1];

    // Step 2: POST to Smoove's form endpoint with the user's data
    const formData = new URLSearchParams();
    formData.append(
      "uf__8fc221d2e89545488eb2d432f84ba118_email_434355",
      email
    );
    formData.append(
      "uf__8fc221d2e89545488eb2d432f84ba118_first_name_434358",
      firstName
    );
    formData.append(
      "uf__8fc221d2e89545488eb2d432f84ba118_mobile_461237",
      phone
    );
    formData.append("__VIEWSTATE", viewState);
    formData.append("__VIEWSTATEGENERATOR", viewStateGenerator);
    formData.append("RedirectToUrl", "thanks");
    formData.append("ActionButton_submit", "שליחה");

    const cookies = getRes.headers.get("set-cookie") || "";

    const postRes = await fetch(SMOOVE_LP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Referer: SMOOVE_LP_URL,
        Cookie: cookies,
      },
      body: formData.toString(),
      redirect: "manual",
    });

    console.log("Smoove POST status:", postRes.status);
    console.log("Smoove POST location:", postRes.headers.get("location"));
  } catch (err) {
    console.error("Smoove submission error:", err);
    // Don't fail the user — log and continue
  }

  return NextResponse.json({ success: true });
}
