import React from "react";
import { HeaderBanner } from "@/components/HeaderBanner";
import { DotGridSpaceInvaders } from "@/components/DotGridSpaceInvaders";
import { StickyNav } from "@/components/StickyNav";
import { HeroSection } from "@/components/HeroSection";
import { ActivityCalendar } from "@/components/ActivityCalendar";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { SkillsSection } from "@/components/SkillsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FooterSection } from "@/components/FooterSection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Dot Grid Banner */}
      <HeaderBanner />

      {/* Sticky Navigation */}
      <StickyNav />

      {/* Main Content Flow */}
      <div>
        {/* Hero Section */}
        <HeroSection />

        {/* Activity Calendar */}
        <ActivityCalendar />

        <div className="divider-dashed"></div>

        {/* Experiences Section (Accordion) */}
        <div className="section-cv">
          <ExperienceSection />
        </div>

        <div className="divider-dashed"></div>

        {/* Projects Section (2x2 Grid with Crosshairs) */}
        <div className="section-cv">
          <ProjectsSection />
        </div>

        <div className="divider-dashed"></div>

        {/* Blog Section (4 items on home, View All -> /blog) */}
        <div className="section-cv">
          <BlogSection />
        </div>

        <div className="divider-dashed"></div>

        {/* Skills Section */}
        <div className="section-cv">
          <SkillsSection />
        </div>

        {/* Newsletter Section */}
        {portfolioData.features?.newsletter !== false && (
          <>
            <div className="divider-dashed"></div>
            <div className="section-cv">
              <NewsletterSection />
            </div>
          </>
        )}

        <div className="divider-dashed"></div>

        {/* Quote Footer Section */}
        <div className="section-cv">
          <FooterSection />
        </div>
      </div>

      <div className="divider-dashed"></div>

      {/* Bottom Dot Grid Banner */}
      <div className="section-cv max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
        <DotGridSpaceInvaders className="w-full sm:min-h-[220px] min-h-[120px] h-full grow" />
      </div>

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />
    </div>
  );
}
