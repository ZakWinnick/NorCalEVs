// Social platforms, used by the footer "Connect" column.
// LinkedIn uses a placeholder company URL until the real page is confirmed.
export interface Social {
  name: string;
  url: string;
}

// Heylo pinned first; the rest alphabetical.
export const social: Social[] = [
  { name: "Heylo", url: "https://heylo.group/norcalevs" },
  { name: "Bluesky", url: "https://bsky.app/profile/norcalevs.org" },
  { name: "Instagram", url: "https://instagram.com/norcalevs" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/norcalevs" },
  { name: "X", url: "https://x.com/norcalevs" },
  { name: "YouTube", url: "https://youtube.com/@norcalevs" },
];
