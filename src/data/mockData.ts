import {
  Examination,
  CohortYear,
  PrepObjective,
  CatalogCourse,
  TestSeriesItem,
  FreeResource,
  CandidateReflection,
  FAQItem,
  SearchResultItem,
} from '../types';

export const EXAMINATIONS: Examination[] = [
  {
    id: 'jee-adv',
    title: 'JEE Advanced',
    shortCode: 'ADV',
    badge: 'IIT-JEE Standard',
    description: 'High-rigor conceptual derivations and multi-concept problem architecture.',
  },
  {
    id: 'jee-main',
    title: 'JEE Main',
    shortCode: 'MAIN',
    badge: 'NTA Standard',
    description: 'Accuracy, speed calibration, and complete NCERT-mapped syllabus depth.',
  },
  {
    id: 'neet-ug',
    title: 'NEET-UG',
    shortCode: 'NEET',
    badge: 'Medical Entrance',
    description: 'High-density biology recall, physics problem-solving, and chemical reaction mastery.',
  },
  {
    id: 'foundation',
    title: 'Foundation (9-10)',
    shortCode: 'FND',
    badge: 'Early Mastery',
    description: 'Olympiad-tier fundamentals in mathematics and natural sciences for early scholars.',
  },
];

export const COHORT_YEARS: CohortYear[] = [
  {
    id: 2026,
    label: '2026 Aspirants',
    description: 'Final lap intensive series, full syllabus mocks, and precision error revision.',
  },
  {
    id: 2027,
    label: '2027 Cohort',
    description: 'Two-year systematic first-principles foundation and phased chapter progression.',
  },
  {
    id: 'dropper',
    label: 'Repeater / Dropper',
    description: 'Targeted gap remediation, speed calibration, and advanced problem-solving tracks.',
  },
];

export const PREPARATION_OBJECTIVES: PrepObjective[] = [
  {
    id: 'learning',
    label: 'Comprehensive Learning',
    subtitle: 'Deep theory lectures, faculty seminars & guided DPPs',
    icon: 'school',
    targetPath: '#courses-section',
  },
  {
    id: 'tests',
    label: 'Test Series & CBT Mocks',
    subtitle: 'Exact NTA/IIT interface simulations with pacing telemetry',
    icon: 'timer',
    targetPath: '#test-series-section',
  },
  {
    id: 'practice',
    label: 'Adaptive Practice Engine',
    subtitle: 'Untimed derivations, error autopsies & 12,500+ PYQs',
    icon: 'tune',
    targetPath: '#practice-section',
  },
  {
    id: 'resources',
    label: 'Free Study Vault',
    subtitle: 'Companion formula sheets, cheat sheets & past papers',
    icon: 'menu_book',
    targetPath: '#resources-section',
  },
];

export const COURSES: CatalogCourse[] = [
  {
    id: 'course-phy-adv-2027',
    title: 'Physics Mastery: Mechanics to Modern Physics',
    subtitle:
      'Comprehensive derivation track emphasizing mathematical rigor, rotating reference frames, electrodynamics invariants, and statistical mechanics.',
    examId: 'jee-adv',
    cohortYear: 2027,
    category: 'physics',
    batchName: 'Batch 04 · Evening Seminar',
    faculty: {
      name: 'Prof. Arvind Verma',
      designation: 'Former Academic Fellow, IIT Kanpur (18+ yrs teaching)',
      initials: 'AV',
      avatarBg: 'bg-primary-container text-on-primary',
    },
    metrics: {
      lectures: 70,
      dpps: 45,
      milestones: 12,
    },
    pricing: {
      amount: 14999,
      period: '/ yr',
      originalAmount: 18999,
    },
    badge: 'JEE Advanced 2027',
    status: 'enrolling',
    features: [
      'Pure derivation video modules',
      'Curated Daily Practice Problems (DPPs)',
      'Chapter-end milestone diagnostic checks',
      'Direct mistake notebook synchronization',
    ],
  },
  {
    id: 'course-chem-adv-2027',
    title: 'Comprehensive Physical & Inorganic Chemistry',
    subtitle:
      'Deep dive into molecular orbital theory, reaction kinetics, thermodynamic entropy manifolds, and stereochemical isomerism matrices.',
    examId: 'jee-adv',
    cohortYear: 2027,
    category: 'chemistry',
    batchName: 'Batch 02 · Morning Seminar',
    faculty: {
      name: 'Dr. Meenakshi Rao',
      designation: 'Doctorate in Chemical Physics, IISc Bangalore',
      initials: 'MR',
      avatarBg: 'bg-secondary text-on-secondary',
    },
    metrics: {
      lectures: 64,
      dpps: 50,
      milestones: 10,
    },
    pricing: {
      amount: 12999,
      period: '/ yr',
      originalAmount: 16499,
    },
    badge: 'JEE Advanced 2027',
    status: 'enrolling',
    features: [
      '3D coordination isomerism models',
      'Physical chemistry derivation sheets',
      'NCERT line-by-line inorganic deconstructions',
      'Periodic revision flashcard decks',
    ],
  },
  {
    id: 'course-math-adv-2026',
    title: 'Advanced Mathematics: Differential & Integral Calculus',
    subtitle:
      'Master analytical transformations, King’s rule symmetries, functional equations, and multi-variable curve curvature without rote shortcuts.',
    examId: 'jee-adv',
    cohortYear: 2026,
    category: 'mathematics',
    batchName: 'Masterclass Series 01',
    faculty: {
      name: 'Vikas Gupta',
      designation: 'Author & Senior Mathematics Mentor (22+ yrs experience)',
      initials: 'VG',
      avatarBg: 'bg-tertiary-container text-on-tertiary',
    },
    metrics: {
      lectures: 82,
      dpps: 60,
      milestones: 14,
    },
    pricing: {
      amount: 14999,
      period: '/ yr',
      originalAmount: 19999,
    },
    badge: 'JEE 2026/27',
    status: 'enrolling',
    features: [
      'Non-standard solution pathways',
      'Calculus invariant cheat sheets',
      'Graph transformation workbooks',
      'Weekly live problem dissection labs',
    ],
  },
];

export const TEST_SERIES_CATALOG: TestSeriesItem[] = [
  {
    id: 'test-series-jee-adv-2026',
    title: 'Aura National Proctored Mock Series (JEE Advanced 2026)',
    examCode: 'ADV-2026-NMS',
    examId: 'jee-adv',
    targetYear: 2026,
    paperType: 'Paper 1 & Paper 2 Simulation',
    durationMinutes: 360,
    totalQuestions: 108,
    totalMarks: 360,
    questionPattern: 'SCQ / MCQ / Numerical / Match Column',
    metrics: {
      fullMocks: 14,
      sectionals: 28,
      topicWise: 42,
    },
    pricing: {
      amount: 6999,
      period: 'Complete Season',
    },
    features: [
      'Exact IIT-JEE CBT user interface replicate',
      'Offline local browser synchronization resilience',
      'Second-by-second pacing telemetry & stall detection',
      'Gaussian percentile ranking against verified test cohorts',
      'Instant Diagnostic Error Autopsy within seconds of submission',
    ],
  },
];

export const FREE_RESOURCES: FreeResource[] = [
  {
    id: 'res-phy-icr',
    title: 'Rotational Dynamics & Instantaneous Center of Rotation (ICR)',
    subject: 'Physics',
    topic: 'Rigid Body Mechanics',
    examId: 'jee-adv',
    format: 'PDF',
    fileSize: '1.4 MB',
    downloads: '18,400+ downloads',
    downloadUrl: '#',
    summary: 'Coordinate invariance relations, tensor moments, and rolling without slipping conditions.',
    lastReviewed: 'August 2026',
  },
  {
    id: 'res-math-leibniz',
    title: 'Leibniz Rule & Definite Integral Transformations',
    subject: 'Mathematics',
    topic: 'Integral Calculus',
    examId: 'jee-adv',
    format: 'PDF',
    fileSize: '920 KB',
    downloads: '24,100+ downloads',
    downloadUrl: '#',
    summary: 'Step-by-step limits differentiation, King’s property symmetries, and Frullani integrals compendium.',
    lastReviewed: 'August 2026',
  },
  {
    id: 'res-chem-coordination',
    title: 'Coordination Compounds Isomerism Cheat Sheet',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    examId: 'jee-adv',
    format: 'PDF',
    fileSize: '2.1 MB',
    downloads: '15,600+ downloads',
    downloadUrl: '#',
    summary: '3D geometric isomerism grids, optical activity flags, and CFT splitting energy reference charts.',
    lastReviewed: 'July 2026',
  },
  {
    id: 'res-jee-2025-sol',
    title: 'JEE Advanced Previous Examination Solutions (Paper 1 & 2)',
    subject: 'Past Papers',
    topic: 'Official Solutions',
    examId: 'jee-adv',
    format: 'PDF',
    fileSize: '3.8 MB',
    downloads: '31,400+ downloads',
    downloadUrl: '#',
    summary: 'Authenticated step-by-step proofs with marks distribution breakdowns and multiple solution pathways.',
    lastReviewed: 'August 2026',
  },
];

export const CANDIDATE_REFLECTIONS: CandidateReflection[] = [
  {
    id: 'ref-1',
    quote:
      'The diagnostic autopsy showed me I wasn’t lacking calculus theory—I was dropping negative signs in King’s rule transformations. Fixing that single habit recovered 16 marks in the next national mock.',
    author: 'Rahul Sharma',
    cohort: 'Class of 2025 · Delhi',
    location: 'Delhi',
    badge: 'Proctored Mock Cohort Top 1%',
    metricLabel: 'Diagnostic mark recovery',
  },
  {
    id: 'ref-2',
    quote:
      'The complete absence of gamification clutter and noisy leaderboards gives you a calm mental sanctuary. You sit down to solve problems with complete clarity and walk into the examination hall composed.',
    author: 'Ananya Deshmukh',
    cohort: 'Class of 2025 · Pune',
    location: 'Pune',
    badge: 'High-Retention Cohort',
    metricLabel: 'Study discipline & composure',
  },
  {
    id: 'ref-3',
    quote:
      'Pacing analysis highlighted that I was spending 6 minutes on conics stems that yielded zero marks. Learning to abandon sunk-cost traps changed my paper score by over 28 percentile points.',
    author: 'Siddharth V.',
    cohort: 'Class of 2025 · Bengaluru',
    location: 'Bengaluru',
    badge: 'Percentile Acceleration Cohort',
    metricLabel: 'Pacing efficiency gain',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Aura Glacial Sanctuary differ from traditional coaching and online video portals?',
    answer:
      'Traditional platforms deploy dopamine triggers, gamified points, and passive endless-scroll video libraries that induce a false sense of productivity. Aura operates like an academic laboratory: lectures are deep derivations, problem sets are deliberately calibrated for step-by-step rigor, and tests provide diagnostic error autopsies rather than hollow leaderboard scores.',
    category: 'pedagogy',
  },
  {
    id: 'faq-2',
    question: 'Can I enroll in individual subject modules or only full-year batches?',
    answer:
      'Yes. While our comprehensive year-long tracks cover the entire coordinated PCM / PCB syllabus, every student is free to enroll in modular masterclasses—such as Rotational Mechanics, Advanced Integral Calculus, or Molecular Orbital Theory—with full access to that topic’s DPPs and milestone assessments.',
    category: 'enrollment',
  },
  {
    id: 'faq-3',
    question: 'How are mock exam cohort ranks and percentiles calculated?',
    answer:
      'Every national mock takes place across calibrated testing windows where verified students sit simultaneously. Our engine generates a continuous Gaussian distribution that compares your score, topic accuracy, and second-by-second pacing against authentic historical marks curves from recent IIT and NTA examinations without artificial inflation.',
    category: 'testing',
  },
  {
    id: 'faq-4',
    question: 'Are free resources and previous year questions accessible without a paid subscription?',
    answer:
      'Absolutely. Our Open Study Vault hosts over 450 verified formula compendiums, authentic past papers (2014–2025), and chapter-level invariant summaries that are completely open-access to uphold academic dignity for all aspirants.',
    category: 'resources',
  },
];

export const SEARCH_INDEX: SearchResultItem[] = [
  {
    id: 's-1',
    title: 'Physics Mastery: Mechanics to Modern Physics',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '70 Lectures · Comprehensive mechanics & electrodynamics',
  },
  {
    id: 's-2',
    title: 'Comprehensive Physical & Inorganic Chemistry',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '64 Lectures · Molecular orbital theory & kinetics',
  },
  {
    id: 's-3',
    title: 'Advanced Mathematics: Differential & Integral Calculus',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '82 Lectures · King’s property, limits & curves',
  },
  {
    id: 's-4',
    title: 'Aura National Proctored Mock Series (JEE Advanced 2026)',
    category: 'Test Series',
    examId: 'jee-adv',
    href: '#test-series-section',
    description: '14 Full Mocks · 28 Sectionals · Pacing Telemetry',
  },
  {
    id: 's-5',
    title: 'Rotational Dynamics & Instantaneous Center of Rotation',
    category: 'Formula Sheet',
    examId: 'jee-adv',
    href: '#resources-section',
    description: 'PDF Cheat Sheet · Tensor moments & rolling',
  },
  {
    id: 's-6',
    title: 'Leibniz Rule & Definite Integral Transformations',
    category: 'Formula Sheet',
    examId: 'jee-adv',
    href: '#resources-section',
    description: 'PDF Cheat Sheet · Differentiation under integral sign',
  },
  {
    id: 's-7',
    title: 'Electrostatics & Gauss’s Law Syllabus Breakdown',
    category: 'Syllabus Chapter',
    examId: 'jee-adv',
    href: '#practice-section',
    description: 'Core concepts, past year frequency & common traps',
  },
  {
    id: 's-8',
    title: 'Thermodynamics & Carnot Efficiency Benchmarks',
    category: 'Syllabus Chapter',
    examId: 'jee-main',
    href: '#practice-section',
    description: 'PV/TS diagrams, indicator graphs & entropy checks',
  },
];
