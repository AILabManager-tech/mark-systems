"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamCard } from "@/components/ui/TeamCard";
import { ValueCard } from "@/components/ui/ValueCard";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { TEAM_MEMBER_IDS, teamMemberNames } from "@/lib/team-data";

export function AboutContent() {
  const tAbout = useTranslations("about");

  return (
    <>
      <section className="section-padding border-t border-b border-surface-border">
        <div className="section-container">
          <SectionHeader
            label={tAbout("teamLabel")}
            title={tAbout("teamTitle")}
            description={tAbout("teamDescription")}
          />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBER_IDS.map((id) => (
              <TeamCard
                key={id}
                memberId={id}
                name={teamMemberNames[id].name}
                initials={teamMemberNames[id].initials}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            label={tAbout("valuesLabel")}
            title={tAbout("valuesTitle")}
            description={tAbout("valuesDescription")}
          />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <ValueCard key={i} index={i} />
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
