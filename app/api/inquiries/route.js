import { createDirectusItem } from "@/lib/directus";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
    const fullName = String(payload.full_name || "").trim();
    const email = String(payload.email || "").trim();
    const message = String(payload.message || "").trim();

    if (!fullName || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await createDirectusItem("contact_inquiries", {
      full_name: fullName,
      email,
      phone: String(payload.phone || "").trim(),
      company: String(payload.company || "").trim(),
      message,
      source_page: String(payload.source_page || "homepage").trim(),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Unable to submit inquiry" },
      { status: 500 }
    );
  }
}
