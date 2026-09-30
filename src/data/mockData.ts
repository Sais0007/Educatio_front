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
  FacultyMember,
  PlatformMetric,
  PublicCourse,
  PublicSampleTest,
  CourseResource,
  AboutPageData,
} from '../types';

export const EXAMINATIONS: Examination[] = [
  {
    id: 'jee-adv',
    title: 'JEE Advanced',
    shortCode: 'ADV',
    badge: 'IIT Standard',
    category: 'engineering',
    description: 'High-rigor conceptual derivations and multi-concept problem architecture for engineering entrance.',
    targetAudiences: ['Top 2.5 Lakh JEE Main qualifiers', 'Class 11/12 & Dropper scholars'],
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    supportedYears: [2026, 2027, 'dropper'],
    conductingBody: 'IIT Joint Admission Board (JAB)',
    format: 'Computer-Based Test · Paper 1 & Paper 2',
    frequency: 'Annual (May/June)',
  },
  {
    id: 'jee-main',
    title: 'JEE Main',
    shortCode: 'MAIN',
    badge: 'NTA Standard',
    category: 'engineering',
    description: 'Accuracy, speed calibration, and complete NCERT-mapped syllabus depth across mathematics and physical sciences.',
    targetAudiences: ['Engineering aspirants nationwide', 'Session 1 (Jan) & Session 2 (Apr)'],
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    supportedYears: [2026, 2027, 'dropper'],
    conductingBody: 'National Testing Agency (NTA)',
    format: 'Computer-Based Test · Single 3-Hour Paper',
    frequency: 'Biannual (January & April)',
  },
  {
    id: 'neet-ug',
    title: 'NEET-UG',
    shortCode: 'NEET',
    badge: 'Medical Entrance',
    category: 'medical',
    description: 'High-density biology recall, physics problem-solving, and chemical reaction mechanism mastery.',
    targetAudiences: ['Aspiring medical professionals', 'NCERT verbatim line-by-line focus'],
    subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
    supportedYears: [2026, 2027, 'dropper'],
    conductingBody: 'National Testing Agency (NTA)',
    format: 'Pen & Paper OMR · Single 3-Hour 20-Min Paper',
    frequency: 'Annual (First Sunday of May)',
  },
  {
    id: 'foundation',
    title: 'Foundation (9-10)',
    shortCode: 'FND',
    badge: 'Early Mastery',
    category: 'foundation',
    description: 'Olympiad-tier fundamentals in mathematics and natural sciences for early secondary scholars.',
    targetAudiences: ['Class 9 & 10 Olympiad aspirants', 'NSEJS & RMO preparation tracks'],
    subjects: ['Natural Sciences', 'Olympiad Mathematics', 'Logical Aptitude'],
    supportedYears: [2026, 2027],
    conductingBody: 'National Olympiad Councils & Boards (NSEJS/RMO)',
    format: 'Stage-wise Conceptual & Problem Solving Assessments',
    frequency: 'Academic Cycle & Olympiad Calendar',
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
    id: 'practice',
    label: 'Targeted Practice',
    subtitle: 'Untimed derivations, error autopsies & 12,500+ PYQs',
    icon: 'tune',
    targetPath: '#practice-section',
  },
  {
    id: 'tests',
    label: 'Mock Tests & Test Series',
    subtitle: 'Exact NTA/IIT interface simulations with pacing telemetry',
    icon: 'timer',
    targetPath: '#mock-test-section',
  },
  {
    id: 'resources',
    label: 'Free Study Vault',
    subtitle: 'Companion formula sheets, cheat sheets & past papers',
    icon: 'menu_book',
    targetPath: '#resources-section',
  },
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. Arvind Verma',
    subject: 'Physics Mastery',
    designation: 'Former Academic Fellow, IIT Kanpur',
    credentials: 'M.Tech IIT Kanpur · 18+ Years Pedagogy',
    experienceYears: 18,
    initials: 'AV',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    examSpecialization: 'JEE Advanced Mechanics & Electrodynamics',
    keyContributions: 'Pioneer of the coordinate-invariance derivation method for rotational dynamics.',
  },
  {
    id: 'fac-2',
    name: 'Dr. Meenakshi Rao',
    subject: 'Physical & Inorganic Chemistry',
    designation: 'Doctorate in Chemical Physics, IISc Bangalore',
    credentials: 'Ph.D. IISc · CSIR Gold Medalist',
    experienceYears: 14,
    initials: 'MR',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    examSpecialization: 'Molecular Orbital Theory & Chemical Kinetics',
    keyContributions: 'Creator of the 3D Coordination Compound stereochemistry visualizer.',
  },
  {
    id: 'fac-3',
    name: 'Vikas Gupta',
    subject: 'Advanced Mathematics',
    designation: 'Senior Author & Calculus Mentor',
    credentials: 'B.Tech IIT BHU · Author of Advanced Problems in Mathematics',
    experienceYears: 22,
    initials: 'VG',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    examSpecialization: 'Differential & Integral Calculus, Complex Analysis',
    keyContributions: 'Master of King’s property transformations and non-standard geometric bounds.',
  },
];

export const COURSES: CatalogCourse[] = [
  {
    id: 'course-phy-adv-2027',
    title: 'Complete Physics Preparation: Mechanics to Modern Physics',
    subtitle:
      'Comprehensive derivation track emphasizing mathematical rigor, rotating reference frames, electrodynamics invariants, and statistical mechanics.',
    examId: 'jee-adv',
    cohortYear: 2027,
    category: 'physics',
    batchName: 'Batch 04 · Evening Seminar',
    faculty: {
      name: 'Prof. Arvind Verma',
      designation: 'Former Academic Fellow, IIT Kanpur',
      initials: 'AV',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      avatarBg: 'bg-primary-container text-on-primary',
    },
    metrics: {
      lectures: 180,
      dpps: 45,
      milestones: 40,
      accessMonths: 12,
    },
    pricing: {
      amount: 14999,
      period: '/ yr',
      originalAmount: 18999,
    },
    badge: 'JEE 2027',
    status: 'enrolling',
    features: [
      '180+ Unrushed First-Principles Derivation Lectures',
      '45 Curated Daily Practice Problem (DPP) Sets',
      '40 Sectional & Milestone Diagnostic Tests',
      'Direct Mistake Notebook Synchronization',
      '12 Months Unrestricted Access',
    ],
    curriculumOverview: {
      moduleCount: 6,
      totalHours: 240,
      sampleChapters: ['Rotational Dynamics', 'Electrodynamics & Maxwell Laws', 'Wave Optics', 'Thermal Physics'],
    },
  },
  {
    id: 'course-chem-adv-2027',
    title: 'Complete Chemistry Preparation: Physical, Organic & Inorganic',
    subtitle:
      'Deep dive into molecular orbital theory, reaction kinetics, thermodynamic entropy manifolds, and stereochemical isomerism matrices.',
    examId: 'jee-adv',
    cohortYear: 2027,
    category: 'chemistry',
    batchName: 'Batch 02 · Morning Seminar',
    faculty: {
      name: 'Dr. Meenakshi Rao',
      designation: 'Doctorate in Chemical Physics, IISc',
      initials: 'MR',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      avatarBg: 'bg-secondary text-on-secondary',
    },
    metrics: {
      lectures: 165,
      dpps: 50,
      milestones: 38,
      accessMonths: 12,
    },
    pricing: {
      amount: 12999,
      period: '/ yr',
      originalAmount: 16499,
    },
    badge: 'JEE 2027',
    status: 'enrolling',
    features: [
      '3D Coordination Isomerism Model Deconstructions',
      'Thermodynamic Entropy & Free Energy Derivation Workbooks',
      'NCERT Line-by-Line Inorganic Deconstruction',
      '12 Months Full Platform Entitlement',
    ],
    curriculumOverview: {
      moduleCount: 5,
      totalHours: 210,
      sampleChapters: ['Chemical Thermodynamics', 'Coordination Compounds', 'Reaction Mechanisms', 'Equilibrium'],
    },
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
      designation: 'Author, Advanced Problems in Mathematics',
      initials: 'VG',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      avatarBg: 'bg-tertiary-container text-on-tertiary',
    },
    metrics: {
      lectures: 140,
      dpps: 60,
      milestones: 35,
      accessMonths: 12,
    },
    pricing: {
      amount: 14999,
      period: '/ yr',
      originalAmount: 19999,
    },
    badge: 'JEE 2026/27',
    status: 'enrolling',
    features: [
      'Non-standard Solution Pathways for Olympiad & JEE Adv',
      '60 High-Yield DPP Problem Sets with Full Video Solutions',
      'Calculus Invariant Cheat Sheets and Graph Transformations',
      'Weekly Live Problem Dissection Laboratories',
    ],
    curriculumOverview: {
      moduleCount: 4,
      totalHours: 195,
      sampleChapters: ['Definite Integrals & Invariants', 'Differential Equations', 'Continuity & Differentiability'],
    },
  },
];

export const TEST_SERIES_CATALOG: TestSeriesItem[] = [
  {
    id: 'test-series-jee-adv-2026',
    title: 'Aura National Proctored Mock Series (JEE Advanced 2026)',
    examCode: 'ADV-2026-NMS',
    examId: 'jee-adv',
    targetYear: 2026,
    paperType: 'Paper 1 & Paper 2 CBT Simulation',
    durationMinutes: 360,
    totalQuestions: 108,
    totalMarks: 360,
    questionPattern: 'Single Choice / Multi-Correct / Numerical / Matrix Match',
    metrics: {
      fullMocks: 14,
      sectionals: 28,
      topicWise: 42,
    },
    pricing: {
      amount: 6999,
      period: 'Complete Season Access',
    },
    features: [
      'Exact IIT-JEE CBT user interface replica down to pixel constraints',
      'Offline local browser synchronization (zero answers lost on disconnect)',
      'Second-by-second pacing telemetry & question stall analysis',
      'Gaussian percentile curves calibrated against verified candidates',
      'Diagnostic Error Autopsy within seconds of submission',
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
    previewUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80',
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
    previewUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80',
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
    previewUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80',
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
    previewUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80',
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
    badge: 'Diagnostic mark recovery',
    metricLabel: '+16 Marks Recovered',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    examTarget: 'JEE Advanced',
    recoveredMarks: '16 Marks in Calculus',
  },
  {
    id: 'ref-2',
    quote:
      'The complete absence of gamification clutter and noisy leaderboards gives you a calm mental sanctuary. You sit down to solve problems with complete clarity and walk into the examination hall composed.',
    author: 'Ananya Deshmukh',
    cohort: 'Class of 2025 · Pune',
    location: 'Pune',
    badge: 'Study discipline & composure',
    metricLabel: 'Zero Exam Panic',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    examTarget: 'NEET-UG',
    recoveredMarks: 'Physics Accuracy from 58% to 84%',
  },
  {
    id: 'ref-3',
    quote:
      'Pacing analysis highlighted that I was spending 6 minutes on conics stems that yielded zero marks. Learning to abandon sunk-cost traps changed my paper score by over 28 percentile points.',
    author: 'Siddharth V.',
    cohort: 'Class of 2025 · Bengaluru',
    location: 'Bengaluru',
    badge: 'Pacing efficiency gain',
    metricLabel: '+28 Percentile Points',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    examTarget: 'JEE Advanced',
    recoveredMarks: 'Eliminated 4 Time-Trap Questions',
  },
];

export const PLATFORM_SCALE_METRICS: PlatformMetric[] = [
  {
    label: 'Authenticated Questions',
    value: '12,500+',
    description: 'Every stem with LaTeX proof and error tags',
    icon: 'quiz',
  },
  {
    label: 'CBT Simulation Fidelity',
    value: '100%',
    description: 'Exact NTA and IIT-JEE keyboard & UI replicate',
    icon: 'desktop_windows',
  },
  {
    label: 'Syllabus Matrix Depth',
    value: '350+ Topics',
    description: 'Exhaustive chapter & invariant coverage',
    icon: 'account_tree',
  },
  {
    label: 'Pacing Telemetry',
    value: '1-Sec Precision',
    description: 'Dwell time and stall detection per stem',
    icon: 'timelapse',
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
  {
    id: 'faq-5',
    question: 'How does the Mistake Notebook help improve marks over time?',
    answer:
      'When you take a mock test or practice set, incorrect answers are classified by error type: Careless Calculation, Misread Stem, or Conceptual Gap. These problems automatically flow into your Mistake Notebook, which schedules re-attempts at 3, 7, and 21 days following the proven SM-2 spaced repetition protocol.',
    category: 'pedagogy',
  },
  {
    id: 'faq-6',
    question: 'Can I test the platform before making a purchase?',
    answer:
      'Yes. Every registered guest receives complimentary 10-day diagnostic access, including one full-length proctored CBT simulation, unlimited access to the Open Study Vault, and sample chapter derivation practice sets.',
    category: 'enrollment',
  },
];

export const SEARCH_INDEX: SearchResultItem[] = [
  {
    id: 's-1',
    title: 'Physics Mastery: Mechanics to Modern Physics',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '180 Lectures · Comprehensive mechanics & electrodynamics',
  },
  {
    id: 's-2',
    title: 'Comprehensive Physical & Inorganic Chemistry',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '165 Lectures · Molecular orbital theory & kinetics',
  },
  {
    id: 's-3',
    title: 'Advanced Mathematics: Differential & Integral Calculus',
    category: 'Course',
    examId: 'jee-adv',
    href: '#courses-section',
    description: '140 Lectures · King’s property, limits & curves',
  },
  {
    id: 's-4',
    title: 'Aura National Proctored Mock Series (JEE Advanced 2026)',
    category: 'Test Series',
    examId: 'jee-adv',
    href: '#mock-test-section',
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

/**
 * Super Admin-Managed Platform Courses Raw Dataset.
 * Includes both compliant Public Free courses and internal/restricted courses
 * to verify strict business logic enforcement.
 */
export const RAW_PLATFORM_COURSES: PublicCourse[] = [
  {
    id: 'pub-phy-kinematics',
    title: 'Vectors, Kinematics & Coordinate Dynamics',
    examId: 'jee-main',
    examinationName: 'JEE Main',
    subject: 'Physics',
    description: 'First-principles derivation of Cartesian coordinate transforms, projectile geometry, and relative velocity frames.',
    overview: 'This foundation track builds mathematical intuition and physical insight for classical mechanics. Students develop the ability to construct moving coordinate systems, evaluate multidimensional kinematic equations, and resolve vector decomposition without reliance on formulaic memorization.',
    learningOutcomes: [
      'Master vector algebra, dot/cross products, and component resolution in 2D and 3D Euclidean space.',
      'Derive differential and integral kinematic relationships for variable acceleration trajectories.',
      'Analyze projectile trajectories on inclined planes with rotating reference frames.',
      'Solve multi-body constrained relative velocity problems systematically.',
    ],
    prerequisites: [
      'Class 10 Trigonometry and Elementary Algebra',
      'Basic introduction to differential calculus',
    ],
    targetAudience: 'Aspirants preparing for JEE Main & JEE Advanced who want to establish rock-solid first principles in mechanics.',
    language: 'English',
    faculty: {
      name: 'Prof. Arvind Verma',
      designation: 'Former Academic Fellow, IIT Kanpur',
      bio: 'Over 18 years mentoring national rankers in JEE Advanced Physics. Specializes in deriving mechanics through coordinate invariance principles.',
    },
    duration: '6 Weeks (18 Lectures)',
    level: 'Conceptual Foundation',
    contentSummary: {
      modulesCount: 4,
      lecturesCount: 18,
      practiceSheetsCount: 12,
    },
    modules: [
      {
        id: 'mod-1',
        title: 'Vectors & Coordinate Transformations',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Vector axioms, direction cosines & unit vector algebra',
          'Scalar dot product & orthogonal projections',
          'Cross product, area vectors & angular momentum orientation',
          'Curvilinear coordinate resolutions in polar planes',
        ],
      },
      {
        id: 'mod-2',
        title: 'Rectilinear Motion & Differential Calculus',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Instantaneous velocity & acceleration differential equations',
          'Integration techniques for variable acceleration a(v), a(x), a(t)',
          'Geometric interpretation of motion graphs (v-t, a-t, v-x)',
          'Kinematics under gravity with air drag models',
        ],
      },
      {
        id: 'mod-3',
        title: 'Planar Motion & Projectile Trajectories',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Parametric equations of projectile trajectories in Cartesian form',
          'Projectiles on inclined planes: upward and downward slope derivations',
          'Condition for collision between two independent airborne bodies',
          'Wind drift and river-boat relative motion vectors',
        ],
      },
      {
        id: 'mod-4',
        title: 'Relative Velocity & Constrained Motion',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Galilean transformations and relative reference frames',
          'Shortest distance of approach between moving particles',
          'Wedge-block and string-pulley acceleration constraints',
          'Circular kinematics: centripetal and tangential vector components',
        ],
      },
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2026,
  },
  {
    id: 'pub-chem-bonding',
    title: 'Chemical Bonding & Molecular Symmetry',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Chemistry',
    description: 'Rigorous molecular orbital theory derivations, hybridisation geometry, and resonance energy manifolds in inorganic molecules.',
    overview: 'A comprehensive journey into the electronic architecture of molecules. Moving systematically from Lewis models to quantum-mechanical valence bond and molecular orbital frameworks, this course demystifies bond order, magnetic properties, and stereochemical shapes.',
    learningOutcomes: [
      'Predict 3D geometries and bond angles using modern VSEPR and Bent rule considerations.',
      'Construct diatomic molecular orbital diagrams for homo- and hetero-nuclear species (B2, C2, O2, NO, CO).',
      'Evaluate hybridization geometry, steric numbers, and resonance stabilization energies.',
      'Understand intermolecular forces, hydrogen bonding networks, and back-bonding phenomena.',
    ],
    prerequisites: [
      'Class 11 Atomic Structure fundamentals (quantum numbers, atomic orbitals)',
    ],
    targetAudience: 'Aspirants targeting top ranks in JEE Advanced seeking mastery in physical & inorganic chemistry.',
    language: 'English',
    faculty: {
      name: 'Dr. Meenakshi Rao',
      designation: 'Doctorate in Chemical Physics, IISc',
      bio: 'Doctorate from IISc Bangalore with research in chemical physics. Renowned for visual pedagogical models in stereochemistry and crystal field theory.',
    },
    duration: '8 Weeks (24 Lectures)',
    level: 'Advanced Problem Solving',
    contentSummary: {
      modulesCount: 5,
      lecturesCount: 24,
      practiceSheetsCount: 16,
    },
    modules: [
      {
        id: 'mod-cb-1',
        title: 'Octet Foundations & Resonance Manifolds',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Lewis dot representations & formal charge distribution',
          'Resonance structures, canonical hybrids & bond orders',
          'Octet exceptions: electron-deficient and hypervalent systems',
          'Lattice enthalpy, Born-Haber cycles & ionic polarization',
        ],
      },
      {
        id: 'mod-cb-2',
        title: 'VSEPR Theory & Bent Rule Applications',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Steric numbers, lone-pair repulsion geometries',
          'Bent rule: s-character distribution and electronegativity',
          'Trigonal bipyramidal distortions & Berry pseudorotation',
          'Dipole moments in cis/trans and planar aromatic systems',
        ],
      },
      {
        id: 'mod-cb-3',
        title: 'Valence Bond Theory & Hybridization',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Wavefunction overlap criteria (sigma vs pi bonds)',
          'sp, sp2, sp3, sp3d, sp3d2 hybrid orbitals',
          'd-orbital participation in main group fluorides and oxides',
          'Non-hybridized p-pi interactions in inorganic rings',
        ],
      },
      {
        id: 'mod-cb-4',
        title: 'Molecular Orbital Theory (MOT)',
        lecturesCount: 6,
        duration: '9 Hours',
        topics: [
          'LCAO approximations and orbital symmetry classification',
          '2s-2p mixing in lighter diatomics (B2, C2, N2)',
          'Oxygen paramagnetism and peroxide/superoxide comparison',
          'Heteronuclear diatomics: CO and NO orbital filling',
        ],
      },
      {
        id: 'mod-cb-5',
        title: 'Secondary Bonds & Intermolecular Forces',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Intermolecular vs intramolecular hydrogen bonds',
          'Multicenter 3c-2e bonds in boranes (B2H6)',
          'Back-bonding in boron halides and metal carbonyls',
          'van der Waals dispersion forces and physical property trends',
        ],
      },
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2027,
  },
  {
    id: 'pub-math-calculus',
    title: 'Differential Calculus & Graph Transformations',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Mathematics',
    description: 'Continuity, differentiability proofs, intermediate value theorems, and non-standard geometric curve sketching.',
    overview: 'Designed to transform intuitive curve sketching into rigorous analytical deduction. Explores continuity and differentiability from topological and algebraic perspectives, enabling students to conquer non-standard functional equations and optimization problems.',
    learningOutcomes: [
      'Formulate formal limit comparison tests and asymptotic analysis for indeterminate expressions.',
      'Determine points of non-differentiability in piecewise, composite, and modulus functions.',
      'Apply Mean Value Theorems (Rolle, Cauchy, Lagrange) to prove root existence and inequality bounds.',
      'Execute systematic curve tracing using asymptotes, concavity, and inflection points.',
    ],
    prerequisites: ['Senior secondary Functions, Domain & Range, and Trigonometric Identities'],
    targetAudience: 'Scholars preparing for JEE Advanced Mathematics requiring high analytical precision.',
    language: 'English',
    faculty: {
      name: 'Vikas Gupta',
      designation: 'Senior Author & Calculus Mentor',
      bio: 'Author of advanced mathematics problem books for competitive examinations. Former IIT BHU graduate with 22 years of calculus coaching expertise.',
    },
    duration: '7 Weeks (21 Lectures)',
    level: 'Bridge Track',
    contentSummary: {
      modulesCount: 4,
      lecturesCount: 21,
      practiceSheetsCount: 14,
    },
    modules: [
      {
        id: 'mod-calc-1',
        title: 'Limits & Asymptotic Analysis',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Standard algebraic and trigonometric limits',
          'Taylor series expansions and higher-order cancellations',
          'L\'Hopital rule criteria and common evaluation traps',
          'Squeeze theorem bounds and integer floor limits',
        ],
      },
      {
        id: 'mod-calc-2',
        title: 'Continuity & Intermediate Value Theorems',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Epsilon-delta definitions and point-wise continuity',
          'Types of discontinuities: removable, jump, and essential',
          'Intermediate Value Property (IVP) and root isolation',
          'Continuity of composite and implicit functional relations',
        ],
      },
      {
        id: 'mod-calc-3',
        title: 'Differentiability & Tangent Analysis',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Left and right hand derivatives in composite functions',
          'Differentiability of absolute value and signum expressions',
          'Geometric tangents, normals, and angle of intersection',
          'Mean Value Theorems: Rolle and Lagrange inequality proofs',
        ],
      },
      {
        id: 'mod-calc-4',
        title: 'Monotonicity, Extrema & Curve Tracing',
        lecturesCount: 6,
        duration: '9 Hours',
        topics: [
          'First and second derivative tests for local extrema',
          'Concavity, convexity, and points of inflection',
          'Horizontal, vertical, and oblique asymptote derivations',
          'Systematic 7-step graph plotting for non-standard functions',
        ],
      },
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2026,
  },
  {
    id: 'pub-bio-genetics',
    title: 'Molecular Genetics & Inheritance Principles',
    examId: 'neet-ug',
    examinationName: 'NEET-UG',
    subject: 'Biology',
    description: 'NCERT line-by-line breakdown of DNA replication, transcription operons, and Mendelian dihybrid inheritance ratios.',
    overview: 'A precise, line-by-line examination of the molecular blueprint of life mapped directly to the NEET-UG examination syllabus. Explores the structure of nucleic acids, central dogma mechanisms, and Mendelian pedigree analysis with zero ambiguous terminology.',
    learningOutcomes: [
      'Interpret classical Mendelian mono- and dihybrid ratios alongside modern non-allelic deviations.',
      'Decipher DNA double helix architecture, packaging in chromatin, and historical Hershey-Chase experiments.',
      'Trace the enzymes and directional dynamics of replication, transcription, and translation.',
      'Analyze lac operon gene regulation and decipher human pedigree charts for inherited disorders.',
    ],
    prerequisites: ['Foundational Cell Biology & Cell Division (Mitosis and Meiosis)'],
    targetAudience: 'NEET-UG medical aspirants targeting 100% accuracy in the high-weightage Genetics unit.',
    language: 'English',
    duration: '6 Weeks (18 Lectures)',
    level: 'Conceptual Foundation',
    contentSummary: {
      modulesCount: 4,
      lecturesCount: 18,
      practiceSheetsCount: 10,
    },
    modules: [
      {
        id: 'mod-gen-1',
        title: 'Mendelian Principles & Variations',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Mendel 7 pairs of contrasting pea traits and laws',
          'Incomplete dominance, co-dominance and multiple allelism',
          'Chromosomal theory of inheritance (Sutton and Boveri)',
          'Pleiotropy and polygenic inheritance in human traits',
        ],
      },
      {
        id: 'mod-gen-2',
        title: 'Linkage, Recombination & Pedigree Analysis',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Morgan experiments on Drosophila melanogaster',
          'Genetic recombination mapping and chromosome centimorgans',
          'Sex determination mechanisms: XX-XY, ZZ-ZW, and haplo-diploidy',
          'Autosomal vs sex-linked human pedigree chart interpretation',
        ],
      },
      {
        id: 'mod-gen-3',
        title: 'Molecular Structure & DNA Packaging',
        lecturesCount: 5,
        duration: '7.5 Hours',
        topics: [
          'Purines, pyrimidines, phosphodiester and hydrogen bonds',
          'Watson-Crick B-DNA geometry and Chargaff equivalence rules',
          'Histone octamers, nucleosome structure and solenoid fibers',
          'Transforming principle: Griffith and Avery-MacLeod proofs',
        ],
      },
      {
        id: 'mod-gen-4',
        title: 'Central Dogma & Operon Gene Regulation',
        lecturesCount: 4,
        duration: '6 Hours',
        topics: [
          'Semi-conservative replication fork and DNA polymerases',
          'Transcription in prokaryotes vs eukaryotic pre-mRNA processing',
          'Genetic code properties, wobble hypothesis, and tRNA adapters',
          'Lac operon: promoter, operator, repressor, and allolactose induction',
        ],
      },
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2026,
  },
  {
    id: 'pub-math-olympiad',
    title: 'Number Theory & Combinatorics Essentials',
    examId: 'foundation',
    examinationName: 'Foundation (9-10)',
    subject: 'Mathematics',
    description: 'Modular arithmetic, Fermat little theorem, pigeonhole principle, and structured Olympiad proof formulation.',
    overview: 'An exploration of fundamental arithmetic structures and counting principles for early secondary students aiming for Olympiads like RMO, NSEJS, and PRMO.',
    learningOutcomes: [
      'Utilize Euclidean algorithm for greatest common divisors and Bezout identity.',
      'Apply congruence arithmetic and modular inverses to solve linear Diophantine equations.',
      'Construct combinatorial proofs using Pigeonhole Principle and Inclusion-Exclusion.',
      'Master binomial coefficients, integer partitions, and recurrence relations.',
    ],
    prerequisites: ['Class 8-9 School Mathematics and elementary algebraic operations'],
    targetAudience: 'Early secondary students preparing for competitive olympiad mathematics.',
    language: 'English',
    faculty: {
      name: 'Vikas Gupta',
      designation: 'Senior Author & Olympiad Mentor',
    },
    duration: '5 Weeks (15 Lectures)',
    level: 'Olympiad Foundation',
    contentSummary: {
      modulesCount: 3,
      lecturesCount: 15,
      practiceSheetsCount: 8,
    },
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2027,
  },
  {
    id: 'pub-chem-organic',
    title: 'Organic Reaction Mechanisms & Intermediates',
    examId: 'neet-ug',
    examinationName: 'NEET-UG',
    subject: 'Chemistry',
    description: 'Carbocation rearrangements, SN1/SN2 kinetics, electrophilic aromatic substitution, and stability rankings.',
    overview: 'A logical approach to organic chemistry based on electronic structure, orbital overlap, and reaction kinetics rather than rote reaction memorization.',
    learningOutcomes: [
      'Identify nucleophilic, electrophilic, and radical intermediates.',
      'Differentiate between SN1, SN2, E1, and E2 pathways based on substrate and solvent factors.',
      'Predict Markovnikov and anti-Markovnikov additions across olefinic double bonds.',
      'Map multistep synthetic pathways from common aliphatic precursors.',
    ],
    prerequisites: ['Basic high-school atomic bonding and polar covalent concepts'],
    targetAudience: 'NEET-UG and JEE Main scholars entering organic chemistry mechanisms.',
    language: 'English',
    faculty: {
      name: 'Dr. Meenakshi Rao',
      designation: 'Doctorate in Chemical Physics, IISc',
    },
    duration: '5 Weeks (15 Lectures)',
    level: 'Bridge Track',
    contentSummary: {
      modulesCount: 3,
      lecturesCount: 15,
      practiceSheetsCount: 10,
    },
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
    badge: 'Open Access',
    targetYear: 2026,
  },
  // --- The following items intentionally violate visibility rules to demonstrate strict exclusion ---
  {
    id: 'restricted-inst-pune-01',
    title: 'Internal Pune Branch Physics Intensive Batch',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Physics',
    description: 'Exclusive classroom cohort for enrolled students at the Pune central branch.',
    managedBy: 'INSTITUTE_ADMIN',
    visibility: 'INSTITUTE_RESTRICTED',
    status: 'PUBLISHED',
    accessType: 'PAID',
  },
  {
    id: 'draft-platform-quantum',
    title: 'Introduction to Wave Particle Duality & Photoelectric Effect',
    examId: 'jee-main',
    examinationName: 'JEE Main',
    subject: 'Physics',
    description: 'Unpublished course draft pending syllabus audit by academic director.',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'DRAFT',
    accessType: 'FREE',
  },
];

/**
 * Strict Public Free Course Visibility Predicate
 *
 * IF:
 *   Course is managed by Super Admin
 *   AND Course visibility = Guest Accessible / Public
 *   AND Course status = Published
 *   AND Course access type = Free
 * THEN:
 *   Course may appear in the Public Free Course Listing
 * Otherwise:
 *   DO NOT show it.
 */
export const isPublicFreeCourse = (course: PublicCourse): boolean => {
  return (
    course.managedBy === 'SUPER_ADMIN' &&
    (course.visibility === 'PUBLIC' || course.visibility === 'GUEST_ACCESSIBLE') &&
    course.status === 'PUBLISHED' &&
    course.accessType === 'FREE'
  );
};

/**
 * Returns filtered list of public free courses strictly compliant with visibility rules
 */
export const getPublicFreeCourses = (): PublicCourse[] => {
  return RAW_PLATFORM_COURSES.filter(isPublicFreeCourse);
};

/**
 * Retrieves a public free course by ID, strictly enforcing visibility rules.
 * Returns undefined if course does not exist or fails public visibility criteria.
 */
export const getPublicCourseById = (id: string): PublicCourse | undefined => {
  const course = RAW_PLATFORM_COURSES.find((c) => c.id === id);
  if (!course || !isPublicFreeCourse(course)) {
    return undefined;
  }
  return course;
};

/**
 * Retrieves related public free courses sharing the same examination or subject,
 * excluding the currently viewed course.
 */
export const getRelatedPublicCourses = (currentCourse: PublicCourse, limit = 2): PublicCourse[] => {
  return getPublicFreeCourses()
    .filter(
      (c) =>
        c.id !== currentCourse.id &&
        (c.examId === currentCourse.examId || c.subject.toLowerCase() === currentCourse.subject.toLowerCase())
    )
    .slice(0, limit);
};

/**
 * Super Admin-Managed Public Sample Tests Dataset.
 * Includes both compliant preview tests and internal/restricted tests
 * to verify strict business logic enforcement.
 */
export const RAW_PUBLIC_SAMPLE_TESTS: PublicSampleTest[] = [
  {
    id: 'test-jee-main-phy-01',
    title: 'JEE Main Physics Sample Mock 01',
    examId: 'jee-main',
    examinationName: 'JEE Main',
    subject: 'Physics',
    testType: 'Sectional Assessment',
    totalQuestions: 30,
    durationMinutes: 60,
    totalMarks: 100,
    description: 'Representative 30-question sectional assessment covering Mechanics, Oscillations, and Electrodynamics calibrated to NTA difficulty standards.',
    overview: 'This sample assessment mirrors the exact cognitive pacing, difficulty calibration, and numerical rounding rules of NTA JEE Main Session 1 & 2 papers. It tests problem-solving speed and conceptual clarity across high-weightage Physics units.',
    syllabusTopics: [
      'Kinematics, Newton Laws of Motion & Work-Energy Theorem',
      'Rotational Dynamics & Moment of Inertia',
      'Electrostatics, Capacitance & Current Electricity',
      'Magnetic Effects of Current & Electromagnetic Induction',
      'Dual Nature of Matter & Bohr Model Atomic Physics',
    ],
    scoringScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
      format: 'Section A (20 MCQs, +4/-1) · Section B (10 Numericals, +4/-1, attempt any 5)',
    },
    targetAudience: 'JEE Main 2026/2027 engineering aspirants seeking timed sectional benchmark evaluation.',
    instructionsSummary: [
      'Total duration of assessment is 60 minutes with continuous countdown timer.',
      'Section A has 20 compulsory multiple-choice questions with single correct options.',
      'Section B contains 10 numerical value questions; candidates must choose and attempt any 5.',
      'Scratchpad for rough working and physical constants reference table are provided.',
    ],
    previewFeatures: [
      'NTA-format single choice (SCQ) and numerical integer input questions',
      'Full timed test simulation with section timer and question palette',
      'Instant post-test answer key with structured step derivations',
    ],
    gatedFeatures: [
      'Diagnostic mistake categorization (Conceptual Gap vs Calculation Slip vs Pacing Panic)',
      'Sub-topic level accuracy breakdown across Mechanics & Electrodynamics',
      'Pacing calibration: time spent per question vs national peer benchmark',
      'Targeted remediation revision problem sets linked to missed questions',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2026,
    patternNotice: 'Section A (20 MCQs) + Section B (10 Numericals, attempt any 5)',
  },
  {
    id: 'test-jee-adv-comprehensive-01',
    title: 'JEE Advanced Comprehensive Paper 1 Preview',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Full Syllabus',
    testType: 'Full Mock Test',
    totalQuestions: 54,
    durationMinutes: 180,
    totalMarks: 180,
    description: 'Three-hour balanced full-syllabus paper featuring multi-correct, matrix match, and comprehension paragraph architectures across Physics, Chemistry, and Mathematics.',
    overview: 'Engineered to replicate the multi-concept rigor and partial-marking scoring dynamics of IIT JEE Advanced Paper 1. Questions demand simultaneous application of principles across mechanics, calculus transforms, and chemical energetics without formulaic shortcuts.',
    syllabusTopics: [
      'Rotational Mechanics & Moving Reference Frames',
      'Thermodynamics, Carnot Heat Engines & Entropy Manifolds',
      'Coordination Chemistry & Crystal Field Stabilization Energy',
      'Definite Integrals, Differential Equations & Curve Tracing',
      'Electromagnetic Waves & Wave Optics Interference',
    ],
    scoringScheme: {
      correct: 4,
      incorrect: -2,
      unattempted: 0,
      format: 'Multi-Correct (+4/-2 with partial marks) · Matrix Match (+3/-1) · Paragraph (+3/0)',
    },
    targetAudience: 'Top-tier JEE Advanced qualifiers targeting top 1000 All India Ranks.',
    instructionsSummary: [
      'Total duration is 180 minutes with unrestricted section switching across Physics, Chemistry & Math.',
      'Partial marking applies to multi-correct questions (e.g. +1 for each correct option marked without wrong choices).',
      'Calculators are prohibited; full on-screen scribbling pad and formula invariants are provided.',
    ],
    previewFeatures: [
      'Multi-concept derivation questions mirroring IIT JAB assessment architecture',
      'Authentic negative marking and partial-marking scoring simulator',
      'Step-by-step rigorous mathematical proofs in answer key explanations',
    ],
    gatedFeatures: [
      'Negative mark bleed diagnostics & risk vs return choice analysis',
      'Multi-correct partial scoring efficiency evaluation',
      'Historical JAB benchmark projection and rank corridor estimates',
      'Automatic mistake export to student personalized Mistake Notebook',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2026,
    patternNotice: 'Full 3-Hour Paper · Physics, Chemistry & Mathematics',
  },
  {
    id: 'test-neet-ug-bio-01',
    title: 'NEET-UG Biology High-Density Mock 01',
    examId: 'neet-ug',
    examinationName: 'NEET-UG',
    subject: 'Biology',
    testType: 'Sectional Assessment',
    totalQuestions: 90,
    durationMinutes: 80,
    totalMarks: 360,
    description: 'Verbatim NCERT statement-reason, assertion-evaluation, and diagrammatic matching across Botany & Zoology units.',
    overview: 'A rapid 90-question biology drill mapped strictly to Class 11 and 12 NCERT curriculum. Designed to evaluate factual retention, diagrammatic interpretation, and assertion-reason elimination under high-speed timing constraints.',
    syllabusTopics: [
      'Diversity in the Living World & Plant Kingdom',
      'Structural Organisation in Animals & Plants',
      'Cell Structure, Biomolecules & Cell Division Cycle',
      'Genetics, Molecular Basis of Inheritance & Evolution',
      'Human Physiology & Plant Physiology Core Processes',
      'Ecology, Biodiversity Conservation & Environmental Cycles',
    ],
    scoringScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
      format: 'Botany Section A & B (+4/-1) · Zoology Section A & B (+4/-1)',
    },
    targetAudience: 'NEET-UG medical aspirants targeting 340+ marks in the Biology section.',
    instructionsSummary: [
      'Total duration is 80 minutes dedicated to high-density biology recall.',
      'Section A contains 35 questions per discipline (all mandatory).',
      'Section B contains 15 questions per discipline (candidates attempt any 10).',
      'All questions strictly adhere to rationalized NCERT textbook lines.',
    ],
    previewFeatures: [
      'High-density 90-question NCERT line-by-line question items',
      'OMR-modeled timed sectional pace calibration',
      'Direct NCERT textbook page references in answer explanations',
    ],
    gatedFeatures: [
      'Recall latency analysis: identify factual memory decay in seconds',
      'Assertion-Reason elimination accuracy & common trap analysis',
      'Bifurcated Botany vs Zoology syllabus mastery diagnostics',
      'Peer accuracy benchmark on tricky high-confusion questions',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2026,
    patternNotice: 'Botany (45 Questions) + Zoology (45 Questions)',
  },
  {
    id: 'test-jee-main-chem-01',
    title: 'JEE Main Chemistry Speed & Precision Mock',
    examId: 'jee-main',
    examinationName: 'JEE Main',
    subject: 'Chemistry',
    testType: 'Sectional Assessment',
    totalQuestions: 30,
    durationMinutes: 45,
    totalMarks: 100,
    description: 'High-speed drill balancing physical chemistry calculations, organic reaction mechanisms, and inorganic factual recall under tight time limits.',
    overview: 'A precision speed test designed to benchmark the critical first 45 minutes of a JEE Main paper. Tests instantaneous recognition of inorganic trends, reaction intermediate stability, and physical chemistry stoichiometry.',
    syllabusTopics: [
      'Chemical Thermodynamics, Thermochemistry & Hess Law',
      'Chemical Kinetics, Arrhenius Equations & Order of Reactions',
      'Coordination Compounds & IUPAC Nomenclature',
      'Aldehydes, Ketones, Carboxylic Acids & Reaction Intermediates',
      'Periodic Table Trends & p-Block Elements',
    ],
    scoringScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
      format: '20 MCQs (+4/-1) + 10 Numerical Integer Items (+4/-1, attempt any 5)',
    },
    targetAudience: 'Aspirants wanting to optimize their Chemistry scoring speed to save time for Mathematics.',
    instructionsSummary: [
      'Total duration is 45 minutes.',
      'Immediate answer key and reaction step mechanisms displayed upon completion.',
      'Calculations require numerical rounding off to nearest integer.',
    ],
    previewFeatures: [
      'Balanced distribution: Physical, Organic, and Inorganic questions',
      'NTA numerical integer rounding constraint checks',
      'Immediate answer verification and reaction step diagrams',
    ],
    gatedFeatures: [
      'Calculation vs memory recall speed bifurcation diagnostics',
      'Inorganic memory decay alerts with spaced repetition schedule',
      'Personalized formula and reaction mechanism revision checklist',
      'Question skipping strategy efficiency and negative marks prevented',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2027,
    patternNotice: '30 Questions · 45-Minute Speed Drill',
  },
  {
    id: 'test-fnd-olympiad-math-01',
    title: 'Foundation Mathematics Olympiad Benchmark',
    examId: 'foundation',
    examinationName: 'Foundation (9-10)',
    subject: 'Mathematics',
    testType: 'Diagnostic Test',
    totalQuestions: 25,
    durationMinutes: 60,
    totalMarks: 75,
    description: 'Non-routine mathematical challenges focusing on elementary number theory, Euclidean geometry lemmas, and combinatorial counting.',
    overview: 'A 25-problem challenge designed for Class 9 and 10 students targeting national and regional mathematical olympiads (PRMO, NSEJS). Demands elegant combinatorial proofs and arithmetic insight rather than formulaic brute force.',
    syllabusTopics: [
      'Divisibility, Greatest Common Divisor & Euclidean Algorithm',
      'Modular Arithmetic & Congruence Relations',
      'Euclidean Geometry Lemmas, Circles & Cyclic Quadrilaterals',
      'Permutations, Combinations & Pigeonhole Principle',
      'Algebraic Inequalities (AM-GM, Cauchy-Schwarz Basics)',
    ],
    scoringScheme: {
      correct: 3,
      incorrect: 0,
      unattempted: 0,
      format: 'Olympiad Integer Answer (00 to 99) · No Negative Marking',
    },
    targetAudience: 'Early secondary students preparing for PRMO, RMO, and junior science olympiads.',
    instructionsSummary: [
      'Total duration is 60 minutes.',
      'Every question requires an integer answer between 00 and 99.',
      'No negative marking; thorough mathematical steps and lemmas provided in post-test analysis.',
    ],
    previewFeatures: [
      'Olympiad-tier non-standard problem designs without computational rote',
      'Stage-wise problem difficulty progression',
      'Structured pedagogical hint progression in answer keys',
    ],
    gatedFeatures: [
      'Mathematical proof formulation & logic step-gap diagnostics',
      'PRMO / NSEJS readiness readiness index and percentile projection',
      'Recommended Olympiad bridge topics and foundational problem sets',
      'Automated progression pathways for competitive secondary exams',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2027,
    patternNotice: '25 Non-Routine Mathematical Problems',
  },
  {
    id: 'test-jee-adv-math-calculus',
    title: 'JEE Advanced Calculus & Analysis Diagnostic',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Mathematics',
    testType: 'Diagnostic Test',
    totalQuestions: 20,
    durationMinutes: 60,
    totalMarks: 80,
    description: 'Rigorous diagnostic testing differentiability, Mean Value Theorems, definite integral transformations, and non-standard functional inequalities.',
    overview: 'A diagnostic assessment targeting one of the highest-weightage yet conceptually demanding areas of JEE Advanced: Differential and Integral Calculus. Evaluates root-finding theorems, asymptotic curve behavior, and Leibniz integration.',
    syllabusTopics: [
      'Limits, Continuity & Intermediate Value Theorem',
      'Differentiability of Composite & Modulus Functions',
      'Rolle Theorem & Lagrange Mean Value Theorem Bounds',
      'Definite Integrals & King Property Transformations',
      'Differential Equations with Integrating Factors',
    ],
    scoringScheme: {
      correct: 4,
      incorrect: -1,
      unattempted: 0,
      format: 'Multi-Correct (+4/-2 with partial marks) + Non-negative Integer (+4/0)',
    },
    targetAudience: 'JEE Advanced scholars refining their calculus stamina and proof-level intuition.',
    instructionsSummary: [
      'Total duration is 60 minutes.',
      'Focuses exclusively on calculus problem-solving depth.',
      'Detailed algebraic and geometric step derivations provided in solution breakdown.',
    ],
    previewFeatures: [
      'Functional equations, modulus bounds, and calculus transformations',
      'Multi-correct and non-negative integer answer evaluation',
      'Complete derivation proofs in answer explanations',
    ],
    gatedFeatures: [
      'Derivation step breakdown: identify exact algebraic vs conceptual failure points',
      'Calculus solving speed vs analytical stamina diagnostic curves',
      'Algorithmic recommendation for similar high-rigor problem archetypes',
      'Automated synchronization with Student Mistake Notebook',
    ],
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    targetYear: 2026,
    patternNotice: '20 High-Rigor Calculus Problems · 60 Mins',
  },
  // --- The following tests intentionally violate visibility rules to demonstrate strict exclusion ---
  {
    id: 'test-inst-restricted-pune-01',
    title: 'Internal Pune Central Branch Weekly Sunday CBT Mock',
    examId: 'jee-adv',
    examinationName: 'JEE Advanced',
    subject: 'Full Syllabus',
    testType: 'Full Mock Test',
    totalQuestions: 54,
    durationMinutes: 180,
    description: 'Classroom proctored test restricted to enrolled Pune branch cohort.',
    managedBy: 'INSTITUTE_ADMIN',
    visibility: 'INSTITUTE_RESTRICTED',
    status: 'PUBLISHED',
    previewFeatures: [],
    gatedFeatures: [],
  },
  {
    id: 'test-draft-super-admin-01',
    title: 'Unpublished Physical Chemistry Milestone Draft',
    examId: 'jee-main',
    examinationName: 'JEE Main',
    subject: 'Chemistry',
    testType: 'Sectional Assessment',
    totalQuestions: 25,
    durationMinutes: 45,
    description: 'Draft assessment awaiting syllabus audit by academic director.',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'DRAFT',
    previewFeatures: [],
    gatedFeatures: [],
  },
];

/**
 * Strict Public Sample Test Visibility Predicate
 *
 * IF:
 *   Test is managed by Super Admin
 *   AND Test visibility = Public / Guest Accessible
 *   AND Test status = Published
 * THEN:
 *   Test may appear in the Public Sample Test Listing
 * Otherwise:
 *   DO NOT show it.
 */
export const isPublicSampleTest = (test: PublicSampleTest): boolean => {
  return (
    test.managedBy === 'SUPER_ADMIN' &&
    (test.visibility === 'PUBLIC' || test.visibility === 'GUEST_ACCESSIBLE') &&
    test.status === 'PUBLISHED'
  );
};

/**
 * Returns filtered list of public sample tests strictly compliant with visibility rules
 */
export const getPublicSampleTests = (): PublicSampleTest[] => {
  return RAW_PUBLIC_SAMPLE_TESTS.filter(isPublicSampleTest);
};

/**
 * Retrieves a public sample test by ID, strictly enforcing visibility rules.
 * Returns undefined if test does not exist or fails public visibility criteria.
 */
export const getPublicSampleTestById = (id: string): PublicSampleTest | undefined => {
  const test = RAW_PUBLIC_SAMPLE_TESTS.find((t) => t.id === id);
  if (!test || !isPublicSampleTest(test)) {
    return undefined;
  }
  return test;
};

/**
 * Retrieves related public sample tests sharing the same examination or subject,
 * excluding the currently viewed test.
 */
export const getRelatedPublicSampleTests = (currentTest: PublicSampleTest, limit = 2): PublicSampleTest[] => {
  return getPublicSampleTests()
    .filter(
      (t) =>
        t.id !== currentTest.id &&
        (t.examId === currentTest.examId || t.subject.toLowerCase() === currentTest.subject.toLowerCase())
    )
    .slice(0, limit);
};

/**
 * Super Admin-Managed Public Course Resources Dataset.
 * Includes relevant academic resources tied directly to courses.
 * Also includes restricted/draft items to demonstrate strict exclusion.
 */
export const RAW_COURSE_RESOURCES: CourseResource[] = [
  // --- Vectors, Kinematics & Coordinate Dynamics (pub-phy-kinematics) ---
  {
    id: 'res-kin-01',
    title: 'Vectors & Coordinate Invariance Formula Sheet',
    type: 'Formula Sheet',
    courseId: 'pub-phy-kinematics',
    courseTitle: 'Vectors, Kinematics & Coordinate Dynamics',
    examinationName: 'JEE Main',
    subject: 'Physics',
    yearRange: '2026 Edition',
    description: 'Compact reference guide covering Cartesian transformations, vector cross products, and relative motion frames.',
    pageCount: 4,
    fileSize: '1.2 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-kin-02',
    title: 'Chapter 1 Daily Practice Problem (DPP) with Step Solutions',
    type: 'DPP',
    courseId: 'pub-phy-kinematics',
    courseTitle: 'Vectors, Kinematics & Coordinate Dynamics',
    examinationName: 'JEE Main',
    subject: 'Physics',
    yearRange: '2026 Batch',
    description: '15 analytical derivations and multi-concept kinematic problems with full step-by-step mathematical proofs.',
    pageCount: 8,
    fileSize: '2.4 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-kin-03',
    title: '5-Year JEE Main Kinematics Previous Year Questions (PYQs)',
    type: 'Previous Paper',
    courseId: 'pub-phy-kinematics',
    courseTitle: 'Vectors, Kinematics & Coordinate Dynamics',
    examinationName: 'JEE Main',
    subject: 'Physics',
    yearRange: '2020–2025',
    description: 'Chronologically classified NTA questions with conceptual traps, error autopsy notes, and weightage distribution.',
    pageCount: 16,
    fileSize: '3.8 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-kin-04',
    title: 'Projectile on Incline & Constrained Dynamics Primer',
    type: 'PDF',
    courseId: 'pub-phy-kinematics',
    courseTitle: 'Vectors, Kinematics & Coordinate Dynamics',
    examinationName: 'JEE Main',
    subject: 'Physics',
    yearRange: '2026 Edition',
    description: 'Deep-dive reference note exploring non-inertial reference systems, rotating frames, and pseudo-force resolution.',
    pageCount: 6,
    fileSize: '1.8 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },

  // --- Chemical Bonding, Molecular Geometry & Orbital Theory (pub-chem-bonding) ---
  {
    id: 'res-chem-01',
    title: 'Molecular Orbital Energy Diagrams & VSEPR Cheatsheet',
    type: 'Formula Sheet',
    courseId: 'pub-chem-bonding',
    courseTitle: 'Chemical Bonding, Molecular Geometry & Orbital Theory',
    examinationName: 'JEE Advanced',
    subject: 'Chemistry',
    yearRange: '2026 Edition',
    description: 'Homonuclear & heteronuclear diatomic orbital schemes, bond order quick formulas, and steric number matrix.',
    pageCount: 6,
    fileSize: '1.5 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-chem-02',
    title: 'Back-Bonding & Hyperconjugation Diagnostic DPP',
    type: 'DPP',
    courseId: 'pub-chem-bonding',
    courseTitle: 'Chemical Bonding, Molecular Geometry & Orbital Theory',
    examinationName: 'JEE Advanced',
    subject: 'Chemistry',
    yearRange: '2026 Batch',
    description: 'High-rigor practice set focusing on p-pi d-pi orbital overlaps, Lewis acidity trends, and dipole moment vectors.',
    pageCount: 10,
    fileSize: '2.1 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-chem-03',
    title: 'JEE Advanced Chemical Bonding PYQ Solutions & Traps',
    type: 'Previous Paper',
    courseId: 'pub-chem-bonding',
    courseTitle: 'Chemical Bonding, Molecular Geometry & Orbital Theory',
    examinationName: 'JEE Advanced',
    subject: 'Chemistry',
    yearRange: '2018–2025',
    description: 'Complete breakdown of multi-correct and matrix match bonding questions with examiner commentary.',
    pageCount: 22,
    fileSize: '4.2 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },

  // --- Real Functions, Continuity & Differential Calculus (pub-math-calculus) ---
  {
    id: 'res-math-01',
    title: 'Calculus Invariants & Leibniz Rule Transformation Sheet',
    type: 'Formula Sheet',
    courseId: 'pub-math-calculus',
    courseTitle: 'Real Functions, Continuity & Differential Calculus',
    examinationName: 'JEE Advanced',
    subject: 'Mathematics',
    yearRange: '2026 Edition',
    description: 'Essential standard limits expansions, differentiation under the integral sign, and mean value theorem bounds.',
    pageCount: 8,
    fileSize: '1.9 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-math-02',
    title: 'Continuity, IVP & Non-Standard Differentiability DPP',
    type: 'DPP',
    courseId: 'pub-math-calculus',
    courseTitle: 'Real Functions, Continuity & Differential Calculus',
    examinationName: 'JEE Advanced',
    subject: 'Mathematics',
    yearRange: '2026 Batch',
    description: '20 proof-oriented problems on discontinuous mappings, Darboux theorem, and piecewise functional extrema.',
    pageCount: 14,
    fileSize: '2.6 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },

  // --- Molecular Genetics & Inheritance Principles (pub-bio-genetics) ---
  {
    id: 'res-bio-01',
    title: 'NCERT Molecular Genetics Line-by-Line Revision Notes',
    type: 'PDF',
    courseId: 'pub-bio-genetics',
    courseTitle: 'Molecular Genetics & Inheritance Principles',
    examinationName: 'NEET-UG',
    subject: 'Biology',
    yearRange: '2026 Edition',
    description: 'Point-wise synthesis of DNA replication enzymes, lac operon regulatory genes, and Mendelian deviations.',
    pageCount: 14,
    fileSize: '3.1 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },
  {
    id: 'res-bio-02',
    title: 'Human Pedigree Analysis & Inheritance Ratios DPP',
    type: 'DPP',
    courseId: 'pub-bio-genetics',
    courseTitle: 'Molecular Genetics & Inheritance Principles',
    examinationName: 'NEET-UG',
    subject: 'Biology',
    yearRange: '2026 Batch',
    description: '25 diagnostic pedigree charts and recombinant frequency questions with NCERT-referenced explanations.',
    pageCount: 10,
    fileSize: '2.2 MB',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'PUBLISHED',
    accessType: 'FREE',
  },

  // --- Negative Test Items to strictly verify non-exposure of private/draft resources ---
  {
    id: 'res-inst-pune-restricted',
    title: 'Internal Pune Central Offline Cohort Kinematics Sheet',
    type: 'DPP',
    courseId: 'pub-phy-kinematics',
    managedBy: 'INSTITUTE_ADMIN',
    visibility: 'INSTITUTE_RESTRICTED',
    status: 'PUBLISHED',
    accessType: 'PAID',
    description: 'Confidential classroom problem set for Pune central students.',
  },
  {
    id: 'res-draft-superadmin',
    title: 'Draft Unaudited Kinematics Invariant Notes',
    type: 'PDF',
    courseId: 'pub-phy-kinematics',
    managedBy: 'SUPER_ADMIN',
    visibility: 'PUBLIC',
    status: 'DRAFT',
    accessType: 'FREE',
    description: 'Unpublished draft notes awaiting academic verification.',
  },
];

/**
 * Strict Public Course Resource Visibility Predicate
 *
 * IF:
 *   Resource is managed by Super Admin
 *   AND Resource visibility = Public / Guest Accessible
 *   AND Resource status = Published
 *   AND Resource accessType = Free
 * THEN:
 *   Resource may appear in the Public Free Course Details
 * Otherwise:
 *   DO NOT show it.
 */
export const isPublicCourseResource = (resource: CourseResource): boolean => {
  return (
    resource.managedBy === 'SUPER_ADMIN' &&
    (resource.visibility === 'PUBLIC' || resource.visibility === 'GUEST_ACCESSIBLE') &&
    resource.status === 'PUBLISHED' &&
    resource.accessType === 'FREE'
  );
};

/**
 * Retrieves public course resources strictly compliant with visibility rules
 * and associated with the specified courseId.
 */
export const getCourseResources = (courseId: string): CourseResource[] => {
  return RAW_COURSE_RESOURCES.filter(
    (res) => res.courseId === courseId && isPublicCourseResource(res)
  );
};

/**
 * Super Admin-Managed About Page Structured Content.
 * Completely CMS-driven: sections, highlights, and CTAs can be dynamically updated.
 */
export const RAW_ABOUT_PAGE_DATA: AboutPageData = {
  title: 'About Aura Sanctuary',
  subtitle: 'A Quiet Workspace for Serious Academic Preparation',
  introduction:
    'Aura Sanctuary was established on a single educational conviction: competitive entrance preparation in India has been distorted by gamified dopamine loops, casino sounds, and superficial shortcut formulas. We restore intellectual composure through first-principles derivations, structured institute affiliations, and diagnostic error autopsies.',
  sections: [
    {
      id: 'sec-derivation',
      heading: 'First-Principles Derivation Over Rote Memorization',
      badge: 'Academic Pedagogy',
      order: 1,
      content: [
        'Most edtech portals encourage passive consumption of thousands of hours of video lectures and emphasize memorized formula tricks. When an examination paper presents an unfamiliar coordinate system or a non-standard compound, students who rely on pattern matching freeze.',
        'At Aura, every formula is mathematically derived from foundational physical and mathematical invariants. We preserve the cognitive struggle required to understand why laws hold true, transforming students from formula memorizers into analytical problem solvers.',
      ],
    },
    {
      id: 'sec-institute-model',
      heading: 'The Institute & Branch Educational Relationship',
      badge: 'Institutional Structure',
      order: 2,
      content: [
        'Aura is not an open marketplace of disembodied online courses. Courses are created, maintained, and delivered in coordination with accredited partner Institutes and their localized physical Branches.',
        'This architectural relationship preserves the irreplaceable guidance of experienced classroom faculty and physical CBT testing discipline, while providing candidates with the platform’s advanced diagnostics, derivation notes, and mistake remediation.',
      ],
    },
    {
      id: 'sec-closed-loop',
      heading: 'The Closed-Loop Diagnostic System',
      badge: 'Diagnostic Engineering',
      order: 3,
      content: [
        'The difference between a 95th percentile and a 99.8th percentile rank is not intelligence—it is the systematic elimination of careless errors and cognitive blind spots.',
        'Our diagnostic engine decomposes test mistakes into three distinct failure modes: Careless Calculation, Misread Question Stem, and Fundamental Conceptual Gap. Missed questions flow directly into a personalized Mistake Notebook, automatically scheduling re-derivation at calibrated 3, 7, and 21-day spaced intervals.',
      ],
    },
    {
      id: 'sec-sanctuary',
      heading: 'Digital Quiet & Cognitive Sanctuary',
      badge: 'Glacial Philosophy',
      order: 4,
      content: [
        'High-rigor problem solving requires sustained, uninterrupted concentration. We intentionally reject flashing leaderboard streaks, casino sounds, social feeds, and hyperactive notifications.',
        'The Glacial Sanctuary design system provides an uncluttered visual atmosphere: calm blues, generous white space, restrained typography, and a deliberate absence of artificial urgency.',
      ],
    },
  ],
  highlights: [
    {
      id: 'hl-1',
      title: 'First-Principles Rigor',
      description: 'Complete mathematical proofs and physical coordinate invariance over formulaic rote learning.',
      icon: 'functions',
    },
    {
      id: 'hl-2',
      title: 'Institute Affiliation',
      description: 'Structured cohorts anchored by accredited coaching institutes and physical examination centers.',
      icon: 'domain',
    },
    {
      id: 'hl-3',
      title: 'Diagnostic Autopsy',
      description: 'Item-level failure classification identifying whether marks were lost to calculation or concept.',
      icon: 'analytics',
    },
    {
      id: 'hl-4',
      title: 'Distraction-Free Workspace',
      description: 'Zero gamified badges, zero dopamine feeds—pure academic composure and intellectual clarity.',
      icon: 'spa',
    },
  ],
  ctaTitle: 'Ready to Experience Calm Academic Preparation?',
  ctaDescription: 'Explore accredited examination pathways, access open study resources, and join a serious academic community.',
  ctaButtonLabel: 'Explore Examination Paths',
  status: 'PUBLISHED',
  lastUpdated: 'October 2026',
};

/**
 * Super Admin-Managed About Page Content Retrieval.
 * Returns null if the page content is unpublished or unavailable.
 */
export const getPublishedAboutContent = (): AboutPageData | null => {
  if (RAW_ABOUT_PAGE_DATA.status !== 'PUBLISHED') {
    return null;
  }
  return RAW_ABOUT_PAGE_DATA;
};

/**
 * Super Admin-Managed Public FAQs with categories and display order.
 */
export const RAW_SUPER_ADMIN_FAQS: FAQItem[] = [
  {
    id: 'faq-pub-1',
    question: 'How do Courses work on Aura Sanctuary?',
    answer:
      'Courses on Aura Sanctuary are not generic platform-wide video catalogues. Each Course is created and delivered by an Institute and its specific Branch. To enrol in and participate in a Course, a student selects their affiliated Institute and Branch during onboarding.',
    category: 'enrollment',
    status: 'PUBLISHED',
    order: 1,
  },
  {
    id: 'faq-pub-2',
    question: 'How does Aura Sanctuary differ from traditional coaching apps?',
    answer:
      'Traditional platforms deploy passive video libraries, gamified leaderboards, and dopamine triggers that produce a false sense of preparedness. Aura operates as a calm academic sanctuary: lectures emphasize unhurried mathematical and physical proofs, problem solving preserves cognitive struggle through progressive hints, and mock tests deliver diagnostic error autopsies rather than hollow rank scores.',
    category: 'pedagogy',
    status: 'PUBLISHED',
    order: 2,
  },
  {
    id: 'faq-pub-3',
    question: 'Which examinations and cohort years are currently supported?',
    answer:
      'We support complete preparation tracks for JEE Advanced, JEE Main, NEET-UG, and Class 9–10 Foundation Olympiad tracks. Each stream is mapped to 2026 and 2027 examination cycles as well as dedicated repeater/dropper intensive tracks through participating centers.',
    category: 'examinations',
    status: 'PUBLISHED',
    order: 3,
  },
  {
    id: 'faq-pub-4',
    question: 'Can I register on the platform before selecting my courses?',
    answer:
      'Yes. Registration as a Student is completely free. Once you set up your account, you can select your Institute and Branch to explore available courses, academic schedules, and diagnostic assessments with no credit card required.',
    category: 'enrollment',
    status: 'PUBLISHED',
    order: 4,
  },
  {
    id: 'faq-pub-5',
    question: 'What is the "Closed-Loop Preparation System"?',
    answer:
      'Most students use one app for videos, a separate book for questions, and separate test PDFs—meaning test mistakes are never systematically fixed. In Aura, a question missed in Sunday’s CBT mock automatically tags your error archetype (conceptual, algebraic, or pacing stall) and schedules relevant derivation practice into your revision deck for spaced re-attempts.',
    category: 'pedagogy',
    status: 'PUBLISHED',
    order: 5,
  },
  {
    id: 'faq-pub-6',
    question: 'How are mock exam cohort percentiles and Gaussian distributions calculated?',
    answer:
      'Every national mock takes place across calibrated testing windows where verified students sit simultaneously. Our engine generates a continuous Gaussian distribution that compares your score, topic accuracy, and second-by-second pacing against authentic historical marks curves from recent IIT and NTA examinations without artificial inflation.',
    category: 'testing',
    status: 'PUBLISHED',
    order: 6,
  },
  {
    id: 'faq-pub-7',
    question: 'Are free study resources and past year questions accessible without enrollment?',
    answer:
      'Yes. Our Open Study Vault hosts companion formula compendiums, authentic past papers (2014–2025), and chapter-level invariant summaries that are completely open-access to uphold academic dignity for all aspirants.',
    category: 'resources',
    status: 'PUBLISHED',
    order: 7,
  },
  {
    id: 'faq-pub-8',
    question: 'How does the Mistake Notebook help recover lost marks?',
    answer:
      'When you submit an assessment, incorrect responses are analyzed by error cause. These problems automatically populate your Mistake Notebook, which schedules re-attempts at 3, 7, and 21 days following the proven SM-2 spaced repetition protocol.',
    category: 'pedagogy',
    status: 'PUBLISHED',
    order: 8,
  },
  // Draft FAQ example to demonstrate strict Super Admin publication filtering
  {
    id: 'faq-draft-internal',
    question: 'Internal unreviewed draft question on upcoming fee structures',
    answer: 'This answer is under review by academic directors and should never be shown publicly.',
    category: 'enrollment',
    status: 'DRAFT',
    order: 99,
  },
];

/**
 * Super Admin-Managed Public FAQs Retrieval.
 * Only returns items with status === 'PUBLISHED', sorted by order.
 */
export const getPublishedFAQs = (category?: string): FAQItem[] => {
  return RAW_SUPER_ADMIN_FAQS.filter((f) => {
    if (f.status !== 'PUBLISHED') return false;
    if (category && category !== 'all') {
      return f.category === category;
    }
    return true;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
};
