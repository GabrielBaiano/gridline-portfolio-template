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

  const appsList = portfolioData.apps || portfolioData.appsAndTools || [];
  const toolsList = portfolioData.tools || portfolioData.repositories || [];

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

      {/* Apps Section */}
      {appsList.length > 0 && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <h2 className="text-[1.55rem] font-semibold text-title p-3">
              Apps
            </h2>
          </div>
          <div className="divider-dashed" />

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

              {appsList.map((app, idx) => (
                <div key={idx} className="relative z-10 p-2.5 sm:p-3 flex min-w-0">
                  <AppToolCard item={app} />
                </div>
              ))}
            </div>
          </section>

          <div className="divider-dashed" />
        </>
      )}

      {/* Tools Section */}
      {toolsList.length > 0 && (
        <>
          <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
            <h2 className="text-[1.55rem] font-semibold text-title p-3">
              Tools
            </h2>
          </div>
          <div className="divider-dashed" />

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

              {toolsList.map((tool, idx) => (
                <div key={idx} className="relative z-10 p-2.5 sm:p-3 flex min-w-0">
                  <RepoCard repo={tool} />
                </div>
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
