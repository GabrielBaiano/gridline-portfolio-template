import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.vercel.app";

  const itemsXml = portfolioData.blogs
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date || new Date()).toUTCString();
      const tags = (post.tags || []).map((t) => `<category>${t}</category>`).join("");

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${tags}
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${portfolioData.personal.name} - Blog]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[Articles and thoughts on frontend performance, SVG architectures, and engineering by ${portfolioData.personal.name}.]]></description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
