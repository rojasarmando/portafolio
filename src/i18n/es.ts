import type { EvidenceStackId } from '../types/site';

export const es = {
  meta: {
    title: 'Armando Rojas — Arquitecto de Sistemas',
    description:
      'Ingeniero de Backend Senior y Líder Técnico especializado en Python, FastAPI y Odoo. Arquitectura de sistemas de alta concurrencia y liderazgo de equipos de ingeniería en AVANTEC.DS.'
  },
  nav: {
    about: 'Acerca de',
    experience: 'Experiencia',
    skills: 'Conocimientos',
    projects: 'Proyectos',
    blog: 'Blog y Casos',
    contact: 'Contáctame',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú'
  },
  hero: {
    badge: 'Ingeniero de Backend Senior | Líder Técnico',
    titleName: 'Armando Rojas',
    titleRole: 'Arquitecto de Sistemas',
    subtitlePrefix: 'Especializado en ',
    subtitleHighlight: 'Python, FastAPI y Odoo',
    subtitleSuffix:
      '. Arquitecto de sistemas de alta concurrencia y líder de equipos de ingeniería en AVANTEC.DS.',
    watchShowcase: 'Ver presentación',
    linkedin: 'LinkedIn',
    stats: {
      years: 'Años de Exp.',
      deployments: 'Despliegues',
      level: 'Nivel Técnico'
    },
    showcaseLabel: 'Perfil de terminal de Armando Rojas',
    certLabel: 'Certificación Experto',
    certValue: 'Odoo v18 Funcional y Técnico',
    evidence: {
      label: 'Stack con evidencia',
      verified: 'verificado',
      learning: 'aprendiendo',
      partial: 'parcial',
      separator: '·'
    }
  },
  evidenceStack: {
    eyebrow: 'Stack',
    title: 'Stack con Evidencia',
    subtitle:
      'Lo que ya está en producción frente a lo que todavía estoy aprendiendo. Honestidad por encima de decoración.',
    cards: {
      core: 'Backend Principal',
      erp: 'Soluciones ERP',
      cloud: 'Nube e Infraestructura',
      ai: 'Automatización con IA'
    },
    years: 'años'
  },
  showcase: {
    eyebrow: 'Portafolio',
    title: 'Trabajo Destacado',
    subtitle:
      'Repos públicos, casos de estudio anonimizados y lo próximo en mi roadmap. Cada entrada tiene una insignia de estado para que sepas qué está listo en producción y qué sigue en movimiento.',
    viewCase: 'Leer caso de estudio',
    viewRepo: 'Abrir repositorio',
    viewDemo: 'Abrir demo en vivo',
    viewRoadmap: 'Ver roadmap de aprendizaje',
    placeholder: 'Contenido del caso de estudio próximamente',
    briefView: 'Vista breve — caso de estudio completo pendiente',
    prev: 'Anterior',
    next: 'Siguiente',
    metrics: 'Métricas clave',
    decision: 'Decisión técnica',
    tradeoff: 'Tradeoff',
    outcome: 'Resultado medido',
    problem: 'Problema',
    cards: {
      odooRetailFiscalization: {
        title: 'Sincronización Fiscal Retail en Odoo',
        description:
          'Sincronización fiscal de facturas en tiempo real para una cadena retail de 50 tiendas, reemplazando un batch nocturno por propagación en menos de un minuto.'
      },
      odooMigration: {
        title: 'Migración Odoo V14 → V18',
        description:
          'Migración completa de una base de datos productiva de 60 GB a través de cuatro versiones mayores de Odoo con cero downtime.'
      },
      botRouter: {
        title: 'bot-router',
        description:
          'Un servicio Python pequeño que distribuye un único webhook entrante a múltiples plataformas de bots con reintentos y backoff.'
      },
      thisPortafolio: {
        title: 'Este Portafolio',
        description:
          'El sitio que estás leyendo ahora — Astro 5, TypeScript estricto, Tailwind v4, content collections, bilingüe.'
      },
      goApiService: {
        title: 'Servicio API en Go (roadmap)',
        description:
          'Próximo foco: reescribir un endpoint REST de alto tráfico en Go para comparar latencia end-to-end frente a la línea base en Python.'
      }
    }
  },
  trajectory: {
    title: 'Trayectoria Profesional',
    currentBadge: 'LIDERANDO ACTUALMENTE',
    scopeLabel: 'Alcance',
    outcomesLabel: 'Resultados clave',
    stackLabel: 'Stack',
    items: [
      {
        role: 'Líder Técnico',
        scope:
          'Orquestar la estrategia de backend para aplicaciones empresariales de alta disponibilidad. Dirigir un equipo de desarrolladores entregando soluciones escalables basadas en Odoo y Python.',
        description:
          'Orquestar la estrategia de backend para aplicaciones empresariales de alta disponibilidad. Dirigir un equipo de desarrolladores entregando soluciones escalables basadas en Odoo y Python.',
        outcomes: [
          'Migré dos clientes retail grandes de Odoo V14 a V18 sin pérdida de datos',
          'Reduje la latencia de sincronización de horas a minutos en más de 50k facturas',
          'Lideré la mentoría de 4 ingenieros semi senior hacia roles senior'
        ],
        stack: ['Python', 'Odoo', 'PostgreSQL', 'Docker']
      },
      {
        role: 'Desarrollador Semi Senior',
        scope:
          'Enfocado en estrategias de migración ERP y módulos fiscales localizados. Optimización de consultas de base de datos para entornos retail de gran escala.',
        description:
          'Enfocado en estrategias de migración ERP y módulos fiscales localizados. Optimización de consultas de base de datos para entornos retail de gran escala.',
        outcomes: [
          'Lideré de extremo a extremo el módulo de cumplimiento fiscal de Costa Rica',
          'Reduje el tiempo medio de generación de reportes en un 60% ajustando consultas'
        ],
        stack: ['Odoo V14-V16', 'PostgreSQL', 'Python']
      },
      {
        role: 'Desarrollador Técnico Senior',
        scope:
          'Implementación de backend con lógica de negocio personalizada e integraciones con API de terceros, garantizando consistencia de datos entre plataformas.',
        description:
          'Implementación de backend con lógica de negocio personalizada e integraciones con API de terceros, garantizando consistencia de datos entre plataformas.',
        outcomes: [
          'Llevé a producción la sincronización bidireccional Odoo ↔ QuickBooks',
          'Diseñé el API gateway interno usado por todos los equipos'
        ],
        stack: ['Python', 'FastAPI', 'APIs REST']
      }
    ]
  },
  // Deprecated aliases removed in WU-10.
  blog: {
    eyebrow: 'Escritura',
    title: 'Blog y Casos de Estudio',
    subtitle:
      'Escritos técnicos anonimizados sobre trabajo real en producción — qué elegí, por qué y qué cambiaría la próxima vez.',
    readMore: 'Leer más',
    publishedOn: 'Publicado el',
    minutes: 'min de lectura',
    noPosts: 'Aún no hay publicaciones — vuelve pronto.',
    backToBlog: 'Volver a todas las publicaciones'
  },
  cta: {
    title: 'Construyamos algo robusto',
    availability:
      'Disponible para consultoría de Arquitectura Senior y roles de Liderazgo Técnico.',
    getInTouch: 'Ponte en contacto',
    linkedinProfile: 'Perfil de LinkedIn'
  },
  footer: {
    tagline: '© 2024. Ingeniero de Backend Senior y Líder Técnico.',
    statusLabel: 'ESTADO_SISTEMA:',
    statusValue: 'ACTIVO_ESTABLE'
  }
};

export type EvidenceStackCards = Record<EvidenceStackId, string>;

export default es;