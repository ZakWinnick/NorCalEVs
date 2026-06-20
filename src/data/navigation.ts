// Main nav links. Items flagged external render with a small NE arrow.
export interface NavItem {
  title: string;
  url: string;
  external?: boolean;
  submenu?: NavItem[];
}

export const navigation: NavItem[] = [
  { title: 'Home', url: '/' },
  { title: 'Membership', url: '/membership' },
  { title: 'Sponsorships', url: '/sponsorships' },
  { title: 'Resources', url: '/resources' },
  { title: 'Leaders', url: '/leaders' },
  { title: 'Shop', url: 'https://shop.norcalevs.org', external: true },
  {
    title: 'Social',
    url: '#',
    submenu: [
      { title: 'Heylo', url: 'https://heylo.group/norcalevs', external: true },
      { title: 'Bluesky', url: 'https://bsky.app/profile/norcalevs.org', external: true },
      { title: 'Instagram', url: 'https://instagram.com/norcalevs', external: true },
      { title: 'LinkedIn', url: 'https://www.linkedin.com/company/norcalevs', external: true },
      { title: 'X', url: 'https://x.com/norcalevs', external: true },
      { title: 'YouTube', url: 'https://youtube.com/@norcalevs', external: true },
    ],
  },
];
