import Link from "next/link";
import PageHero from "./PageHero";

/**
 * Reusable service guide with original, page-specific content.
 */
export default async function InfoPage({
  emoji,
  title,
  subtitle,
  content = [],
  cta = {},
  children,
}) {
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

        <div className="mx-auto mt-2 grid max-w-[820px] gap-4">
          {content.map((section) => (
            <section key={section.heading} className="glass rounded-[22px] p-7">
              <h2 className="mt-0 font-display text-xl font-bold">{section.heading}</h2>
              <p className="m-0 leading-8 text-ink-dim">{section.body}</p>
            </section>
          ))}

          <div className="glass rounded-[22px] p-7 text-center">
            <p className="mb-3 mt-0 text-sm text-ink-dim">{cta.note}</p>
            <Link href={cta.href || "/"} className="btn-gold inline-flex items-center gap-1.5 rounded-full px-6 py-3 no-underline">
              {cta.label || "Explore AstroVedji"}
            </Link>
            <p className="mb-0 mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-ink-dim">
              Astrology is a cultural and spiritual practice. Readings are for reflection and entertainment, not a guarantee or professional advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
