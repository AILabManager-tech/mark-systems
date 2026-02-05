export const TEAM_MEMBER_IDS = [
  "marcus-chen",
  "elena-vasquez",
  "james-okafor",
  "sarah-kim",
] as const;

export type TeamMemberId = (typeof TEAM_MEMBER_IDS)[number];

export const teamMemberNames: Record<TeamMemberId, { name: string; initials: string }> = {
  "marcus-chen": { name: "Marcus Chen", initials: "MC" },
  "elena-vasquez": { name: "Dr. Elena Vasquez", initials: "EV" },
  "james-okafor": { name: "James Okafor", initials: "JO" },
  "sarah-kim": { name: "Sarah Kim", initials: "SK" },
};

export const VALUE_COUNT = 4;
