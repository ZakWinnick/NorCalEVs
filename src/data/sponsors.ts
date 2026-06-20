// Homepage sponsor logos. Optional tier (1/2/3) sizes logos by sponsorship level:
//   tier 1 -> Supercharger ($3,000+, largest)
//   tier 2 -> Fast Charge ($1,500, medium)
//   tier 3 -> Level 2 ($500, smaller)
// Sponsors with no tier render at the standard size. Set real tiers only when confirmed.
export interface Sponsor {
  name: string;
  url: string;
  logo: string;
  // Optional light/monochrome variant shown in dark mode (for logos drawn dark).
  logoDark?: string;
  tier?: 1 | 2 | 3;
}

export const sponsors: Sponsor[] = [
  {
    name: 'Unplugged Performance',
    url: 'https://unpluggedperformance.com/fremont/',
    logo: 'sponsor-unplugged-performance.png',
    logoDark: 'sponsor-unplugged-performance-dark.webp',
  },
  {
    name: 'OC Customs',
    url: 'https://www.occustoms.com/',
    logo: 'sponsor-oc-customs.png',
  },
];
