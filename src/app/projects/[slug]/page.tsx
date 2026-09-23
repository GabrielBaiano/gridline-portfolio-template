import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { SubPageNav } from "@/components/SubPageNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ActionButton, StackBadge } from "./ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.projects.map((proj) => ({
    slug: proj.slug || proj.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find(
    (p) => (p.slug || p.name.toLowerCase().replace(/\s+/g, "-")) === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.screenshot],
      url: `/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [project.screenshot],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioData.projects.find(
    (p) => (p.slug || p.name.toLowerCase().replace(/\s+/g, "-")) === slug
  );

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.dev";
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Person",
      name: portfolioData.personal.name,
      url: siteUrl,
    },
    url: project.websiteUrl || project.githubUrl,
    image: `${siteUrl}${project.screenshot}`,
  };

  const githubIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 496 512"
      height="15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );

  const websiteIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 496 512"
      height="15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z" />
    </svg>
  );

  const postIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 17 17"
      height="15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 12h-13v-1h13v1zM12 12.993h-10v1h10v-1zM17 1v15h-17v-15h17zM16 2h-15v13h15v-13z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* Top Dot-Grid Banner */}
      <div className="relative z-50 bg-background">
        <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
          <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
        </div>
        <div className="divider-dashed" />
      </div>

      {/* SubPage Navigation */}
      <SubPageNav title={project.name} backHref="/projects" />

      {/* Project Main Content Container */}
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative container-dashed">
        <div className="flex flex-col items-start">
          {/* Screenshot Hero Window */}
          <div className="p-4 w-full">
            <div className="w-full h-full md:min-h-[340px] min-h-[200px] rounded-[12px] relative border border-border p-[4px] overflow-hidden">
              <Image
                priority
                src={project.screenshot}
                alt={project.name}
                width={1000}
                height={560}
                sizes="(max-width: 768px) 100vw, 690px"
                className="w-full object-cover md:h-[340px] h-[200px] rounded-[8px] border border-border"
              />
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="w-full">
            <div className="divider-dashed" />
            <div className="flex items-stretch justify-between w-full">
              <ActionButton
                href={project.githubUrl}
                label="Github"
                icon={githubIcon}
              />

              <div className="self-stretch">
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

              <ActionButton
                href={project.websiteUrl}
                label="Website"
                icon={websiteIcon}
              />

              <div className="self-stretch">
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

              <ActionButton
                href={project.postUrl}
                label="Post"
                icon={postIcon}
              />
            </div>
            <div className="divider-dashed" />
          </div>

          {/* Title & Status & Description */}
          <div className="flex flex-col w-full gap-2 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.40rem] font-bold leading-tight text-title">
                {project.name}
              </h1>
              <div className="flex items-center gap-1 select-none">
                <div className="relative flex items-center justify-center">
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping group-hover:hidden ${
                      project.status === "Building" ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: "10px", height: "10px", borderRadius: "50%", opacity: 0.4 }}
                  />
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className={`relative z-10 ${
                      project.status === "Building" ? "text-red-500" : "text-green-500"
                    }`}
                    height="14"
                    width="14"
                  >
                    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                  </svg>
                </div>
                <p className="text-sm text-mutedForeground font-medium">
                  {project.status}
                </p>
              </div>
            </div>

            <div className="text-base text-foreground flex flex-col gap-3 leading-relaxed mt-1">
              {(project.longDescription || [project.description]).map(
                (paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                )
              )}
            </div>
          </div>

          {/* Stack Used Section */}
          {project.stack && project.stack.length > 0 && (
            <>
              <div className="w-full">
                <div className="divider-dashed" />
                <div className="flex font-semibold text-title flex-col gap-2.5 px-4 pt-4 pb-5">
                  <h2 className="text-[1.10rem] font-semibold text-title">
                    Stack used
                  </h2>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.stack.map((tech, idx) => (
                      <StackBadge key={idx} name={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="divider-dashed" />

      {/* Bottom Dot-Grid Banner */}
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
        <div className="w-full sm:min-h-[220px] min-h-[100px] h-full grow bg-dot-grid rounded-[4px]" />
      </div>

      <ScrollToTop />
    </div>
  );
}
