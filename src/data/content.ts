export const brand = {
  name: 'My Ummah',
  arabic: 'أمتي',
  tagline: 'Together in Faith · United in Good',
  subtitle: 'A complete mosque management solution linking community with the mosque.',
  company: 'Albain Group Inc',
  owner: 'Nagoor Monnapillai Ahamed',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'challenge', label: 'Why' },
  { id: 'platform', label: 'Platform' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'team', label: 'Team' },
  { id: 'connect', label: 'Join', cta: true },
] as const

export const verses = [
  {
    arabic: 'إِنَّ هَٰذِهِۦٓ أُمَّتُكُمْ أُمَّةً وَٰحِدَةً وَأَنَا۠ رَبُّكُمْ فَٱعْبُدُونِ',
    translation:
      'Indeed, this community of yours is one community, and I am your Lord, so worship Me.',
    reference: 'Qur’an 21:92',
  },
  {
    arabic: 'وَٱعْتَصِمُوا۟ بِحَبْلِ ٱللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا۟',
    translation:
      'And hold firmly to the rope of Allah all together and do not become divided.',
    reference: 'Qur’an 3:103',
  },
]

export const challenges = [
  {
    title: 'Fragmented community engagement',
    points: [
      'Benefits only those who already visit the mosque',
      'Excludes elderly and women from digital participation',
      'Reduced engagement with today’s digital youth',
    ],
  },
  {
    title: 'Existing solutions fall short',
    points: [
      'Few mosques can afford their own website or app',
      'CRM tools are rare and often used only for donations',
      'High development and maintenance costs — unaffordable for 99% of mosques',
      'One-way communication; individuals need a separate app for every mosque',
    ],
  },
]

export const objectives = [
  'Links the Muslim community (Ummah) with the local mosque',
  'Engages the whole community, including women and youth',
  'Eases the workload of mosque management teams',
  'Moves mosque management into the digital age',
]

export const platformPillars = [
  {
    title: 'Personal users',
    audience: 'General users — mobile app',
    items: [
      'Location & mosque-based prayer times',
      'Prayer notifications',
      'Qibla compass',
      'Nearest mosque map',
      'Qur’an with multi-language translation',
      'Hadith, Tasbih, Duas',
      'Zakat calculator',
    ],
  },
  {
    title: 'Mosque subscribers',
    audience: 'Community members — mobile app',
    items: [
      'Azan / prayer / Ramadan notifications',
      'Ask Imam — religious Q&A chat',
      'Social media links (FB / YouTube / Insta)',
      'Sermon livestream links',
      'Ask Management — subscriber chat',
      'Event discovery & ticketing',
    ],
  },
  {
    title: 'Mosque management',
    audience: 'Admins — mobile app + web portal',
    items: [
      'Finance: payments, receipts, accounting, approvals',
      'Member & family database',
      'Subscription & donor management',
      'Event creation, teams, budgeting, entry control',
      'Role-based access & team chat',
      'Multi-tenant data segregation per mosque',
    ],
  },
]

export const revenueFree = [
  'Prayer time — location & mosque',
  'Prayer notification selection',
  'Qibla compass & nearest mosque map',
  'Qur’an + multi-language translation',
  '99 Names of Allah, Hadith, Tasbih, Duas',
  'Zakat calculator',
  'Create & register mosque',
  'Mosque location setup',
  'Azan / prayer / Ramadan time upload',
]

export const revenuePaid = [
  'Management role assignment & onboarding',
  'Member database & donor management',
  'Ask Management / Ask Imam chat',
  'Azan audio upload',
  'Payment gateway & online receipts',
  'Accounting, expenses & finance governance',
  'Event management, ticketing & promotion',
]

export const adSharing = [
  { source: 'Company-sourced ads', split: '20% Mosque · 80% Company' },
  { source: 'Mosque-sourced ads', split: '40% Mosque · 60% Company' },
  { source: 'Freelancer-sourced ads', split: '10% Mosque · 60% Company · 30% Freelancer' },
]

export const team = [
  { name: 'Nagoor Monnapillai', role: 'Product Owner', initials: 'NM' },
  { name: 'Samee Sultan', role: 'Fullstack Developer', initials: 'SS' },
  { name: 'Mohamed Rilwan', role: 'Senior Software Developer', initials: 'MR' },
  { name: 'Faraj Ahamed', role: 'UI/UX Lead', initials: 'FA' },
  { name: 'Ahamed Rajaa', role: 'Business Analyst / AI Consultant', initials: 'AR' },
]
