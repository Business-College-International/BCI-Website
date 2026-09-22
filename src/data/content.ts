export const school = {
  name: 'Business College International',
  shortName: 'BCI',
  founded: 2003,
  founder: 'Ibrahim Shamsudeen Taimako',
  country: 'Ghana',
};

export const motto = [
  'BCI, our dream our school our future.',
  'BCI, talk to us, we can help you.',
  'BCI, from our collective weakness, we derive our individual strength.',
];

export const pathwayStages = [
  {
    step: '01',
    tag: 'KG',
    title: 'KG 1 – KG 2',
    body: 'Early years foundation: confidence, routine, first literacy and numeracy, social development.',
  },
  {
    step: '02',
    tag: 'Primary',
    title: 'Primary 1 – 6',
    body: 'The academic base: core subjects, study habits, and the groundwork for BECE.',
  },
  {
    step: '03',
    tag: 'JHS',
    title: 'JHS 1 – 3',
    body: 'Preparing for BECE and the transition into senior high school, whichever route a family takes.',
  },
  {
    step: '04',
    tag: 'SHS',
    title: 'SHS 1 – 3',
    body: 'Programme-based senior high study across four course pathways, private or GES-placed.',
  },
];

export const admissionRoutes = [
  {
    label: 'Private candidates',
    title: 'Apply directly to BCI',
    body: 'Families who choose BCI directly, outside the government placement system, apply and pay as private candidates at any level from KG to SHS.',
    cta: { label: 'Start an application', href: '#apply' },
  },
  {
    label: 'GES / BECE placement',
    title: 'Placed by the Ghana Education Service',
    body: 'Students placed at BCI through the national BECE computerized school placement system are admitted under that placement. There is no separate application — bring your placement details to the school office to complete enrolment.',
    cta: { label: 'Contact the school office', href: '#contact' },
  },
];

export const programmes = [
  {
    value: 'AGRIC',
    label: 'Agric',
    description: 'A practical pathway for learners interested in agriculture, food systems and related sciences.',
  },
  {
    value: 'GENERAL_ARTS',
    label: 'General Arts',
    description: 'A broad humanities and social-science pathway supporting further study and professional options.',
  },
  {
    value: 'BUSINESS',
    label: 'Business',
    description: 'A business-focused pathway for learners interested in commerce, accounting and enterprise.',
  },
  {
    value: 'HOME_ECONOMICS',
    label: 'Home Economics',
    description: 'A practical pathway combining home economics, life skills and related academic study.',
  },
] as const;

export const levels = [
  'KG1', 'KG2',
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6',
  'JHS1', 'JHS2', 'JHS3',
  'SHS1', 'SHS2', 'SHS3',
];

export const galleryPlaceholders = [
  { caption: 'The BCI campus entrance and signage, wide daytime shot.' },
  { caption: 'KG or Primary classroom, students at work.' },
  { caption: 'SHS science or computer lab in use.' },
  { caption: 'Assembly, sports day, or a whole-school gathering.' },
  { caption: 'JHS or SHS classroom, teacher and students.' },
  { caption: 'Portrait of the founder, Ibrahim Shamsudeen Taimako, or the current head of school.' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Pathway', href: '#pathway' },
  { label: 'Admissions routes', href: '#routes' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Life at BCI', href: '#life' },
  { label: 'Contact', href: '#contact' },
];
