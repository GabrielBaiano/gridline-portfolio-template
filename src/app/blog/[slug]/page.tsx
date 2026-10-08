import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import katex from "katex";
import "katex/dist/katex.min.css";
import { portfolioData, BlogPostItem, BlogArticleSection } from "@/data/portfolio";
import { SubPageNav } from "@/components/SubPageNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClapButton, CodeBlock, ShareArticleButton } from "./BlogArticleClient";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = portfolioData.blogs.find((b) => b.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.vercel.app";
  const ogImages = post.image ? [`${siteUrl}${post.image}`] : undefined;

  return {
    title: `${post.title} · ${portfolioData.personal.name}`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [portfolioData.personal.name],
      tags: post.tags,
      url: `/blog/${slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: ogImages,
    },
  };
}

function renderRichText(text: string): React.ReactNode {
  const trimmed = text.trim();
  // Pure block math formula
  if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
    const expr = trimmed.slice(2, -2).trim();
    try {
      const html = katex.renderToString(expr, { displayMode: true, throwOnError: false });
      return (
        <div
          className="my-3 overflow-x-auto py-2 text-center text-title font-sans"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      return <div className="my-2 font-mono text-center text-sm">{expr}</div>;
    }
  }

  // Matches block math, inline math, inline code, bold, italic, and links
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("$$") && part.endsWith("$$")) {
      const expr = part.slice(2, -2).trim();
      try {
        const html = katex.renderToString(expr, { displayMode: true, throwOnError: false });
        return (
          <div
            key={i}
            className="my-3 overflow-x-auto py-2 text-center text-title font-sans"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <div key={i} className="my-2 font-mono text-center text-sm">{expr}</div>;
      }
    }

    if (part.startsWith("$") && part.endsWith("$")) {
      const expr = part.slice(1, -1).trim();
      try {
        const html = katex.renderToString(expr, { displayMode: false, throwOnError: false });
        return (
          <span
            key={i}
            className="inline-block px-0.5 text-title align-baseline font-sans"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <span key={i} className="font-mono text-[0.88em]">{expr}</span>;
      }
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded text-[0.88em] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-border"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-title">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-foreground">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-title font-medium underline underline-offset-4 decoration-border hover:decoration-title hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = portfolioData.blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.vercel.app";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: portfolioData.personal.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: portfolioData.personal.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    keywords: post.tags?.join(", "),
  };

  const currentIndex = portfolioData.blogs.findIndex((b) => b.slug === slug);
  const prevPost = currentIndex > 0 ? portfolioData.blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < portfolioData.blogs.length - 1 ? portfolioData.blogs[currentIndex + 1] : null;

  const headings = post.sections.filter((s) => s.heading);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Top Dot-Grid Banner */}
      <div className="relative z-50 bg-background">
        <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
          <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
        </div>
        <div className="divider-dashed" />
      </div>

      {/* SubPage Navigation */}
      <SubPageNav title={post.title} backHref="/blog" />

      {/* Main Article Container */}
      <article className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed bg-background">
        {/* Article Header */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-[1.85rem] font-bold leading-tight text-title tracking-tight">
            {post.title}
          </h1>

          {/* Meta Information Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-mutedForeground">
            <div className="flex flex-wrap items-center gap-2">
              {currentIndex !== -1 && (
                <>
                  <span className="font-mono text-mutedForeground font-medium text-[11.5px] tabular-nums">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-400">•</span>
                </>
              )}
              <div className="flex items-center gap-1.5">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                >
                  <path d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13Z" fill="currentColor" />
                  <path d="M8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17Z" fill="currentColor" />
                  <path d="M11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16Z" fill="currentColor" />
                  <path d="M16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15 16 15 16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17Z" fill="currentColor" />
                  <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="currentColor" />
                  <path d="M16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15 11 16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13Z" fill="currentColor" />
                  <path d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16 7 16 7H8Z" fill="currentColor" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <>
                  <span className="text-zinc-400">•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ShareArticleButton title={post.title} slug={post.slug} />
              <ClapButton slug={post.slug} initialClaps={post.claps ?? 0} />
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs text-foreground bg-mutedBackground px-2 py-0.5 rounded-[4px] border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Lead Summary Callout */}
          <div className="p-3.5 rounded-[8px] border border-border bg-zinc-50/70 dark:bg-zinc-900/50 text-sm leading-relaxed text-foreground font-medium">
            {renderRichText(post.summary)}
          </div>

          {/* Table of Contents (if >= 3 headings) */}
          {headings.length >= 3 && (
            <details className="group p-3.5 rounded-[8px] border border-border bg-mutedBackground/20 text-xs sm:text-sm">
              <summary className="font-semibold text-title cursor-pointer select-none flex items-center justify-between list-none">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mutedForeground">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Table of Contents
                </span>
                <span className="text-xs text-mutedForeground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <ol className="mt-3 flex flex-col gap-1.5 pl-4 list-decimal text-mutedForeground">
                {headings.map((s, idx) => {
                  const headingId = slugifyHeading(s.heading!);
                  return (
                    <li key={idx} className="pl-1">
                      <a
                        href={`#${headingId}`}
                        className="hover:text-title hover:underline underline-offset-2 transition-colors"
                      >
                        {s.heading}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </details>
          )}
        </div>

        <div className="divider-dashed" />

        {/* Article Body Content */}
        <div className="p-4 sm:p-6 flex flex-col gap-6 text-[0.95rem] leading-7 text-[#333] dark:text-[#d9d9d9]">
          {post.sections.map((section, sIdx) => {
            const headingId = section.heading ? slugifyHeading(section.heading) : undefined;
            return (
              <section key={sIdx} className="flex flex-col gap-3.5">
                {section.heading && (
                  <h2
                    id={headingId}
                    className="scroll-mt-20 text-lg sm:text-xl font-bold text-title tracking-tight pt-2 border-t border-border/30 first:border-t-0"
                  >
                    {section.heading}
                  </h2>
                )}

                {section.subheading && (
                  <h3 className="text-base sm:text-[1.05rem] font-semibold text-title tracking-tight pt-1">
                    {renderRichText(section.subheading)}
                  </h3>
                )}

                {section.image && (
                  <figure className="my-4 flex flex-col items-center w-full">
                    <div className="w-full overflow-hidden rounded-[8px] border border-border bg-[#101012] flex items-center justify-center p-2 sm:p-4">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="w-full h-auto max-h-[560px] rounded object-contain [image-rendering:pixelated]"
                        loading="lazy"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="mt-2 text-xs text-center text-mutedForeground font-sans flex items-center gap-1.5 justify-center">
                        <span className="text-[10px]">▲</span>
                        <span>{renderRichText(section.image.caption)}</span>
                      </figcaption>
                    )}
                  </figure>
                )}

                {section.paragraphs?.map((para, pIdx) => (
                  <p key={pIdx} className="leading-7">
                    {renderRichText(para)}
                  </p>
                ))}

                {section.bullets && (
                  <ul
                    className={`my-1 flex flex-col gap-2 ${
                      section.listOrdered ? "list-decimal" : "list-disc"
                    } list-inside text-foreground text-[0.93rem] leading-relaxed`}
                  >
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="pl-1">
                        <span>{renderRichText(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="my-3 overflow-x-auto rounded-[8px] border border-border bg-background">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-border bg-mutedBackground/60">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3.5 py-2.5 font-semibold text-title">
                              {renderRichText(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-mutedBackground/30 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3.5 py-2 text-foreground font-mono text-[11.5px] sm:text-xs"
                              >
                                {renderRichText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.quote && (
                  <blockquote className="my-2 p-3.5 rounded-[8px] border-l-2 border-title/60 bg-mutedBackground/30 italic text-foreground text-sm sm:text-base leading-relaxed">
                    <p>"{renderRichText(section.quote.text)}"</p>
                    {section.quote.author && (
                      <footer className="mt-1.5 text-xs text-mutedForeground not-italic font-normal">
                        — {section.quote.author}
                      </footer>
                    )}
                  </blockquote>
                )}

                {section.callout && (
                  <div className="my-2 p-3.5 rounded-[8px] border border-border bg-zinc-50 dark:bg-zinc-900/70 text-sm flex items-start gap-2.5">
                    {section.callout.icon && (
                      <span className="text-base select-none shrink-0">
                        {section.callout.icon}
                      </span>
                    )}
                    <span className="text-foreground leading-relaxed">
                      {renderRichText(section.callout.text)}
                    </span>
                  </div>
                )}

                {section.code && (
                  <CodeBlock
                    code={section.code.code}
                    language={section.code.language}
                    caption={section.code.caption}
                  />
                )}
              </section>
            );
          })}
        </div>

        <div className="divider-dashed" />

        {/* Article Footer & Navigation */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <ClapButton slug={post.slug} initialClaps={post.claps ?? 0} />
              <ShareArticleButton title={post.title} slug={post.slug} />
            </div>

            <Link
              href="/blog"
              data-cuelume-hover="tick"
              data-cuelume-press="true"
              className="flex items-center gap-1.5 text-sm font-medium text-title hover:underline underline-offset-4 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              All Articles
            </Link>
          </div>

          {/* Previous / Next Article Links */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/40">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  data-cuelume-hover="tick"
                  className="flex flex-col p-3 rounded-[8px] border border-border bg-mutedBackground/20 hover:bg-mutedBackground/50 transition-colors group"
                >
                  <span className="text-[11px] text-mutedForeground font-mono">← Newer Article</span>
                  <span className="text-xs sm:text-sm font-medium text-title group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate mt-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  data-cuelume-hover="tick"
                  className="flex flex-col p-3 rounded-[8px] border border-border bg-mutedBackground/20 hover:bg-mutedBackground/50 transition-colors group sm:text-right"
                >
                  <span className="text-[11px] text-mutedForeground font-mono">Older Article →</span>
                  <span className="text-xs sm:text-sm font-medium text-title group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate mt-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </article>

      <div className="divider-dashed" />

      {/* Bottom Dot-Grid Banner */}
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
        <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
      </div>

      <ScrollToTop />
    </div>
  );
}
