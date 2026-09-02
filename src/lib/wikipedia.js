/**
 * Placeholder content source — fetches a topic summary from Wikipedia's REST API.
 * Used to fill the service pages for now; will be replaced by our own API later.
 * Cached for a day (Next fetch revalidate). Fails soft → returns null.
 */
export async function getWikiSummary(title) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { accept: "application/json" }, next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    if (!d.extract) return null;
    return {
      title: d.title,
      extract: d.extract,
      image: d.thumbnail?.source || d.originalimage?.source || null,
      url:
        d.content_urls?.desktop?.page ||
        `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    };
  } catch {
    return null;
  }
}
