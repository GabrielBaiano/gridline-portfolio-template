import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";
import { SubPageNav } from "@/components/SubPageNav";
import { ProjectCard } from "@/components/ProjectCard";
import { AppToolCard } from "@/components/AppToolCard";
import { RepoCard } from "@/components/RepoCard";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: `Projects · ${portfolioData.personal.name}`,
  description: `Explore open-source projects, web apps, and developer tools built by ${portfolioData.personal.name}.`,
};

export default function ProjectsPage() {
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
      <SubPageNav title="Projects" backHref="/" />

      {/* Featured Projects Grid */}
      <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto container-dashed">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* Vertical middle divider on desktop */}
          <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0 hidden sm:block">
            <div
              className="h-full w-px"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)",
                backgroundSize: "1px 100%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>

          {portfolioData.projects.map((proj, idx) => (
            <div key={idx}>
              <div className="relative z-10 p-3">
                <ProjectCard project={proj} />
              </div>
              {/* Mobile divider between cards */}
              <div className="block sm:hidden">
                <div className="divider-dashed" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-dashed" />

      {/* Apps & Tools Section */}
      {portfolioData.appsAndTools && portfolioData.appsAndTools.length > 0 && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <h2 className="text-[1.55rem] font-semibold text-title p-3">
              Apps & Tools
            </h2>
          </div>
          <div className="divider-dashed" />

          <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-3">
              {portfolioData.appsAndTools.map((app, idx) => (
                <AppToolCard key={idx} item={app} />
              ))}
            </div>
          </section>

          <div className="divider-dashed" />
        </>
      )}

      {/* Repositories Section */}
      {portfolioData.repositories && portfolioData.repositories.length > 0 && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <h2 className="text-[1.55rem] font-semibold text-title p-3">
              Repositories
            </h2>
          </div>
          <div className="divider-dashed" />

          <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-3">
              {portfolioData.repositories.map((repo, idx) => (
                <RepoCard key={idx} repo={repo} />
              ))}
            </div>
          </section>

          <div className="divider-dashed" />
        </>
      )}

      {/* Bottom Github Callout */}
      {githubUrl && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto p-4 container-dashed">
            <p className="text-center text-sm text-mutedForeground">
              For more cool projects, visit my{" "}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-title font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Github
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
