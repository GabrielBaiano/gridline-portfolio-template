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

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Dot Grid Banner */}
      <HeaderBanner />

      {/* Sticky Navigation */}
      <StickyNav />

      {/* Main Content Flow */}
      <div className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Activity Calendar */}
        <ActivityCalendar />

        <div className="divider-dashed"></div>

        {/* Experiences Section (Accordion) */}
        <ExperienceSection />

        <div className="divider-dashed"></div>

        {/* Projects Section (2x2 Grid with Crosshairs) */}
        <ProjectsSection />

        <div className="divider-dashed"></div>

        {/* Blog Section (4 items on home, View All -> /blog) */}
        <BlogSection />

        <div className="divider-dashed"></div>

        {/* Skills Section */}
        <SkillsSection />

        <div className="divider-dashed"></div>

        {/* Newsletter Section */}
        <NewsletterSection />

        <div className="divider-dashed"></div>

        {/* Quote Footer Section */}
        <FooterSection />
      </div>

      <div className="divider-dashed"></div>

      {/* Bottom Dot Grid Banner */}
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col flex-1 grow md:w-full container-dashed">
        <DotGridSpaceInvaders className="w-full sm:min-h-[220px] min-h-[140px] h-full grow" />
      </div>

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />
    </div>
  );
}
