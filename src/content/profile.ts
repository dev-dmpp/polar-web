import type { Zone } from '../core/config';

export const PROFILE = {
  name: 'David M. Pollard P.',
  alias: 'Polar',
  location: 'San Cristóbal, Juan Díaz, Panamá',
  email: 'dmpp1920@gmail.com',
  phone: '+507 6608-5665',
  linkedin: 'https://www.linkedin.com/in/davidmpollardp',
  github: 'https://github.com/dev-dmpp',
  tagline: 'Full Stack Developer · Game Dev · IoT enthusiast',
  highlights: [
    'Meta Tech Provider',
    'Microsoft AI Cloud Partner Program',
  ],
} as const;

export const SUMMARY = `Desarrollador Full Stack con sólida base técnica en el desarrollo de aplicaciones web y de escritorio, APIs y gestión de bases de datos. Especialista en sistemas de inventario, facturación y gestión de clientes usando C#, Go, Node y Python. Miembro del Meta Tech Provider y Microsoft AI Cloud Partner Program. Apasionado por la robótica y el IoT.`;

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  zone: Zone;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'wohts',
    company: 'Independiente / WOHTS',
    role: 'Desarrollador Full Stack',
    period: '2020 – Actualidad',
    zone: 'estudio',
    bullets: [
      'Desarrollo de soluciones personalizadas para clientes externos (wohts.com).',
      'Tutorías especializadas en robótica y programación.',
      'PHP, JavaScript, contenedores Docker/Podman.',
      'Conversari — The AI OS for Business.',
    ],
  },
  {
    id: 'graphic',
    company: 'Graphic Service Express',
    role: 'Desarrollador y Analista de Transformación Digital',
    period: '2025',
    zone: 'taller',
    bullets: [
      'Análisis de requerimientos y programación para automatización de flujos.',
      'Soporte técnico especializado y mantenimiento de infraestructura.',
      'Migración y digitalización de datos empresariales.',
    ],
  },
  {
    id: 'posper',
    company: 'Posper Panamá',
    role: 'Desarrollador Full Stack',
    period: '2024 – 2025',
    zone: 'taller',
    bullets: [
      'Apps de gestión web y escritorio: inventarios, clientes, facturación.',
      'APIs robustas para integración de servicios.',
      'SQL Server, MariaDB — optimización de consultas SQL.',
      'Desarrollo multiplataforma con .NET.',
    ],
  },
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export const EDUCATION: Education[] = [
  { id: 'utp-lic', institution: 'Universidad Tecnológica de Panamá', degree: 'Licenciatura en Desarrollo de Software', year: '2025' },
  { id: 'utp-tec', institution: 'Universidad Tecnológica de Panamá', degree: 'Técnico en Ingeniería con especialización en Desarrollo de Software', year: '2024' },
  { id: 'cns',     institution: 'Colegio Nuestra Señora del Carmen', degree: 'Bachiller en Ciencias y Letras con Énfasis en Informática', year: '2018' },
];

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  { id: 'langs', title: 'Lenguajes', items: ['C#', 'C++', 'Python', 'Go', 'Java (Spring Boot)', 'PHP', 'JavaScript'] },
  { id: 'db',    title: 'Bases de Datos', items: ['SQL Server', 'MariaDB', 'MongoDB', 'PostgreSQL', 'Neon', 'SQLite'] },
  { id: 'devops',title: 'Infraestructura y DevOps', items: ['Docker', 'Podman', 'Git', 'Linux', 'k3s'] },
  { id: 'web',   title: 'Desarrollo Web', items: ['HTML5', 'CSS3', 'APIs REST', 'Node', 'CMS'] },
  { id: 'iot',   title: 'Hardware e IoT', items: ['Robótica', 'SBC (Raspberry Pi, Arduino, MicroBit, OrangePi)', 'Mantenimiento de equipos'] },
];

export interface Cert {
  id: string;
  title: string;
  issuer: string;
  year: string;
  focus: string;
}

export const CERTS: Cert[] = [
  { id: 'michigan', title: 'Web Design for Everybody (Capstone)',         issuer: 'University of Michigan',       year: '2024', focus: 'HTML5, CSS3, JavaScript, Responsive' },
  { id: 'slim',     title: 'Técnico en Sistemas Informáticos',            issuer: 'Fundación Carlos Slim',         year: '2023', focus: 'Mantenimiento, redes, soporte' },
  { id: 'google',   title: 'Google IT Support Professional',              issuer: 'Google / Coursera',             year: '2024', focus: 'Soporte técnico, redes, sistemas' },
  { id: 'python',   title: 'Crash Course on Python',                      issuer: 'Google / Coursera',             year: '2024', focus: 'Python, automatización' },
  { id: 'k8s',      title: 'Introducción a Kubernetes',                   issuer: 'Banco General / EdX',           year: '2024', focus: 'Orquestación de contenedores' },
  { id: 'msft',     title: 'Microsoft AI Classroom Certificate',          issuer: 'Microsoft',                     year: '2025', focus: 'AI, Azure OpenAI' },
  { id: 'ef',       title: 'EF SET English Certificate (B2)',             issuer: 'EF Standard English Test',      year: '2025', focus: 'B2 Upper Intermediate' },
  { id: 'cisco',    title: 'Cybersecurity Essentials',                    issuer: 'Cisco Networking Academy',      year: '2024', focus: 'Seguridad en redes' },
  { id: 'dell',     title: 'Project Management',                          issuer: 'Dell Technologies',             year: '2025', focus: 'Gestión de proyectos' },
  { id: 'unity',    title: 'Beginning C# Programming with Unity',         issuer: 'University of Colorado',        year: '2023', focus: 'Game Dev, C#' },
];

export interface Reference {
  id: string;
  name: string;
  role: string;
  contact: string;
  kind: 'phone' | 'email';
}

export const REFERENCES: Reference[] = [
  { id: 'kexy',   name: 'Kexy Rodríguez',       role: 'Universidad Tecnológica de Panamá',  contact: '+507 6607-8082', kind: 'phone' },
  { id: 'dixania',name: 'Dixania Valderrama',   role: 'Supervisora de Negocios',             contact: '+507 6670-4180', kind: 'phone' },
  { id: 'josmar', name: 'Josmar Barrios',      role: 'Gerente General — Posper Panamá',    contact: '+507 6154-5057', kind: 'phone' },
  { id: 'terr',   name: 'Terrence Bingham',    role: 'Director de Proyectos / Consultor IT',contact: '+507 6521-5773', kind: 'email' },
  { id: 'nico',   name: 'Nicolas Matute',       role: 'Fullstack Developer',                contact: '+507 6295-6628', kind: 'phone' },
  { id: 'chris',  name: 'Christopher Campusano',role: 'Especialista en Redes / Docente',   contact: '+507 6692-5910', kind: 'phone' },
];

export const REPOS = [
  { id: 'ptrans',  name: 'PolarTranslate', url: 'https://github.com/dev-dmpp/PolarTranslate', desc: 'Herramienta de traducción.' },
  { id: 'zplage',  name: 'ZPlage',          url: 'https://github.com/Polar1920/ZPlage',         desc: 'Juego / proyecto personal.' },
] as const;
