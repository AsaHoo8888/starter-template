const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || "";

function directusHeaders(extra = {}) {
  return {
    "Content-Type": "application/json",
    ...(DIRECTUS_STATIC_TOKEN
      ? { Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}` }
      : {}),
    ...extra,
  };
}

export async function getDirectusItem(collection, query = "") {
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/${collection}${query}`, {
      headers: directusHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return payload.data;
  } catch {
    return null;
  }
}

export async function createDirectusItem(collection, data) {
  const response = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
    method: "POST",
    headers: directusHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Directus create failed: ${response.status}`);
  }

  const payload = await response.json();
  return payload.data;
}
