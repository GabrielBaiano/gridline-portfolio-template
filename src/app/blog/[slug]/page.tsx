import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { SubPageNav } from "@/components/SubPageNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClapButton, CodeBlock } from "./BlogArticleClient";

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

  return {
    title: post.title,
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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
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
    keywords: post.tags?.join(", "),
  };

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
              <div className="flex items-center gap-1">
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
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>

            <ClapButton slug={post.slug} initialClaps={post.claps ?? 0} />
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
            {post.summary}
          </div>
        </div>

        <div className="divider-dashed" />

        {/* Article Body Content */}
        <div className="p-4 sm:p-6 flex flex-col gap-6 text-[0.95rem] leading-7 text-[#333] dark:text-[#d9d9d9]">
          {post.sections.map((section, sIdx) => (
            <section key={sIdx} className="flex flex-col gap-3">
              {section.heading && (
                <h2 className="text-lg sm:text-xl font-bold text-title tracking-tight pt-2">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {section.callout && (
                <div className="my-2 p-3.5 rounded-[8px] border border-border bg-zinc-50 dark:bg-zinc-900/70 text-sm flex items-start gap-2.5">
                  {section.callout.icon && (
                    <span className="text-base select-none shrink-0">
                      {section.callout.icon}
                    </span>
                  )}
                  <span className="text-foreground leading-relaxed">
                    {section.callout.text}
                  </span>
                </div>
              )}

              {section.code && (
                <CodeBlock
                  code={section.code.code}
                  language={section.code.language}
                />
              )}
            </section>
          ))}
        </div>

        <div className="divider-dashed" />

        {/* Article Footer & Navigation */}
        <div className="p-4 sm:p-6 flex items-center justify-between flex-wrap gap-4">
          <ClapButton slug={post.slug} initialClaps={post.claps ?? 0} />

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
