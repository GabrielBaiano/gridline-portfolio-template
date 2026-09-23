import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { SubPageNav } from "@/components/SubPageNav";
import { BlogItem } from "@/components/BlogItem";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: `Blog · ${portfolioData.personal.name}`,
  description: `Technical articles, engineering guides, and open source insights by ${portfolioData.personal.name}.`,
};

export default function BlogPage() {
  const githubUrl =
    portfolioData.socials.find((s) => s.name.toLowerCase() === "github")?.url ||
    "https://github.com";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Dot-Grid Banner */}
      <div className="relative z-50 bg-background">
        <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
          <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
        </div>
        <div className="divider-dashed" />
      </div>

      {/* Subpage Navigation */}
      <SubPageNav title="Blog" backHref="/" />

      {/* All Blog Posts List */}
      <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
        <div className="flex flex-col">
          {portfolioData.blogs.map((post, idx) => (
            <div key={idx}>
              <BlogItem post={post} />
              {idx < portfolioData.blogs.length - 1 && (
                <div className="divider-dashed" />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="divider-dashed" />

      {/* Bottom Github Callout */}
      {githubUrl && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto p-4 container-dashed">
            <p className="text-center text-sm text-mutedForeground">
              For more articles and open source contributions, check my{" "}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-title font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                GitHub
              </a>
            </p>
          </div>
          <div className="divider-dashed" />
        </>
      )}

      {/* Bottom Dot-Grid Banner */}
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
        <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
      </div>

      <ScrollToTop />
    </div>
  );
}
