import type { EvidenceStackId } from '../types/site';

export const en = {
  meta: {
    title: 'Armando Rojas — System Architect',
    description:
      'Senior Backend Engineer & Tech Lead specializing in Python, FastAPI & Odoo. Architecting high-concurrency systems and leading engineering teams at AVANTEC.DS.'
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    blog: 'Blog & Cases',
    contact: 'Contact Me',
    menuOpen: 'Open menu',
    menuClose: 'Close menu'
  },
  hero: {
    badge: 'Senior Backend Engineer | Tech Lead',
    titleName: 'Armando Rojas',
    titleRole: 'System Architect',
    subtitlePrefix: 'Specializing in ',
    subtitleHighlight: 'Python, FastAPI & Odoo',
    subtitleSuffix:
      '. Architecting high-concurrency systems and leading engineering teams at AVANTEC.DS.',
    watchShowcase: 'Watch Showcase',
    linkedin: 'LinkedIn',
    stats: {
      years: 'Years Exp',
      deployments: 'Deployments',
      level: 'Tech Level'
    },
    showcaseLabel: 'Terminal profile of Armando Rojas',
    certLabel: 'Expert Certification',
    certValue: 'Odoo v18 Functional & Tech',
    evidence: {
      label: 'Evidence stack',
      verified: 'verified',
      learning: 'learning',
      partial: 'partial',
      separator: '·'
    }
  },
  evidenceStack: {
    eyebrow: 'Stack',
    title: 'Evidence Stack',
    subtitle:
      'What I have shipped in production versus what I am still learning. Honesty over decoration.',
    cards: {
      core: 'Core Backend',
      erp: 'ERP Solutions',
      cloud: 'Cloud & Infra',
      ai: 'AI Automation'
    },
    years: 'yrs'
  },
  showcase: {
    eyebrow: 'Portfolio',
    title: 'Featured Work',
    subtitle:
      'Public repos, anonymized case studies, and the next thing on my roadmap. Every entry has a status badge so you know what is production-ready and what is still in motion.',
    viewCase: 'Read case study',
    viewRepo: 'Open repo',
    viewDemo: 'Open live demo',
    viewRoadmap: 'See learning roadmap',
    placeholder: 'Case study content coming soon',
    briefView: 'Brief view — full case study pending',
    prev: 'Previous',
    next: 'Next',
    metrics: 'Key metrics',
    decision: 'Technical decision',
    tradeoff: 'Tradeoff',
    outcome: 'Measured outcome',
    problem: 'Problem',
    cards: {
      odooRetailFiscalization: {
        title: 'Odoo Retail Fiscalization Sync',
        description:
          'Real-time fiscal invoice synchronization for a 50-store retail chain, replacing a nightly batch with sub-minute propagation.'
      },
      odooMigration: {
        title: 'Odoo Migration V14 → V18',
        description:
          'Full-version migration of a 60-GB production database across four major Odoo versions with zero downtime.'
      },
      botRouter: {
        title: 'bot-router',
        description:
          'A small Python service that fans a single inbound webhook out to multiple bot platforms with retry and backoff.'
      },
      thisPortafolio: {
        title: 'This Portafolio',
        description:
          'The site you are reading right now — Astro 5, TypeScript strict, Tailwind v4, content collections, bilingual.'
      },
      goApiService: {
        title: 'Go API Service (roadmap)',
        description:
          'Next focus: rewriting a high-traffic REST endpoint in Go to compare end-to-end latency against the Python baseline.'
      }
    }
  },
  trajectory: {
    title: 'Professional Trajectory',
    currentBadge: 'CURRENTLY LEADING',
    scopeLabel: 'Scope',
    outcomesLabel: 'Key outcomes',
    stackLabel: 'Stack',
    items: [
      {
        role: 'Technical Leader',
        scope:
          'Orchestrate the backend strategy for high-availability enterprise applications. Direct a team of developers delivering scalable Odoo and Python-based solutions.',
        description:
          'Orchestrate the backend strategy for high-availability enterprise applications. Direct a team of developers delivering scalable Odoo and Python-based solutions.',
        outcomes: [
          'Migrated two large retail clients from Odoo V14 to V18 with zero data loss',
          'Cut integration sync latency from hours to minutes across 50k+ invoices',
          'Mentored 4 mid-level engineers into senior roles'
        ],
        stack: ['Python', 'Odoo', 'PostgreSQL', 'Docker']
      },
      {
        role: 'Semi Senior Developer',
        scope:
          'Focused on ERP migration strategies and localized fiscal modules. Optimized database queries for large-scale retail environments.',
        description:
          'Focused on ERP migration strategies and localized fiscal modules. Optimized database queries for large-scale retail environments.',
        outcomes: [
          'Owned the Costa Rica fiscal compliance module end-to-end',
          'Reduced average report generation time by 60% through query tuning'
        ],
        stack: ['Odoo V14-V16', 'PostgreSQL', 'Python']
      },
      {
        role: 'Senior Technical Developer',
        scope:
          'Backend implementation of custom business logic and third-party API integrations, ensuring data consistency across platforms.',
        description:
          'Backend implementation of custom business logic and third-party API integrations, ensuring data consistency across platforms.',
        outcomes: [
          'Shipped the bidirectional Odoo ↔ QuickBooks sync in production',
          'Authored the internal API gateway used by every internal team'
        ],
        stack: ['Python', 'FastAPI', 'REST APIs']
      }
    ]
  },
  // Deprecated aliases removed in WU-10.
  blog: {
    eyebrow: 'Writing',
    title: 'Blog & Case Studies',
    subtitle:
      'Anonymized technical write-ups on real production work — what I chose, why, and what I would change next time.',
    readMore: 'Read more',
    publishedOn: 'Published on',
    minutes: 'min read',
    noPosts: 'No posts yet — check back soon.',
    backToBlog: 'Back to all posts'
  },
  cta: {
    title: "Let's Build Something Robust",
    availability:
      'Available for Senior Architecture consulting and Technical Leadership roles.',
    getInTouch: 'Get in Touch',
    linkedinProfile: 'LinkedIn Profile'
  },
  footer: {
    tagline: '© 2024. Senior Backend Engineer & Technical Leader.',
    statusLabel: 'SYSTEM_STATUS:',
    statusValue: 'ACTIVE_STABLE'
  }
};

export type EvidenceStackCards = Record<EvidenceStackId, string>;

export default en;