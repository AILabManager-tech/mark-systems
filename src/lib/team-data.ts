export const TEAM_MEMBER_IDS = [
  "founder",
] as const;

export type TeamMemberId = (typeof TEAM_MEMBER_IDS)[number];

export const teamMemberNames: Record<TeamMemberId, { name: string; initials: string }> = {
  "founder": { name: "Gear", initials: "GR" },
};

export const VALUE_COUNT = 4;
