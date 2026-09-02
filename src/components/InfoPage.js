import Link from "next/link";
import PageHero from "./PageHero";
import { getWikiSummary } from "@/lib/wikipedia";

/**
 * Reusable service page. Pulls placeholder content from Wikipedia for `wikiTitle`.
 * (Temporary — will be swapped for our own API/feature later.)
 * Async Server Component.
 */
export default async function InfoPage({
  emoji,
  title,
  subtitle,
  wikiTitle,
  cta = {},
  children,
}) {
  const wiki = await getWikiSummary(wikiTitle);

  return (
    <>
      <PageHero
        emoji={emoji}
        breadcrumb={
          <>
            <Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / {title}
          </>
        }
        title={title}
        subtitle={subtitle}
      />

      <div className="container-x pb-8">
        {children}

        <div className="glass rounded-[22px] p-7 max-w-[820px] mx-auto mt-2">
          {wiki ? (
            <>
              {wiki.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={wiki.image}
                  alt={wiki.title}
                  className="float-right ml-5 mb-3 rounded-xl max-w-[160px] border border-white/10"
                />
              )}
              <p className="text-ink-dim leading-8 m-0">{wiki.extract}</p>
            </>
          ) : (
            <p className="text-ink-dim m-0">Is topic ki detailed jankari jald aa rahi hai. ✨</p>
          )}

          <div className="mt-6 border-t border-white/10 pt-5 text-center clear-both">
            <p className="text-ink-dim text-sm mb-3">
              {cta.note || "AstroVeda ki apni detailed service jald aa rahi hai."}
            </p>
            <Link
              href={cta.href || "/kundli"}
              className="btn-gold inline-flex items-center gap-1.5 px-6 py-3 rounded-full no-underline"
            >
              {cta.label || "Get your Free Kundli"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
