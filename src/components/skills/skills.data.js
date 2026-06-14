import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiJavascript,
  SiPython, SiFastapi, SiDjango, SiNestjs, SiSpring, SiNodedotjs,
  SiPostgresql, SiMongodb, SiRedis,
  SiAmazonwebservices, SiDocker, SiJenkins, SiGitlab,
  SiOpenai, SiHuggingface, SiAnthropic,
} from 'react-icons/si';
import {
  FaCode, FaServer, FaDatabase, FaCloud, FaBrain, FaCogs,
  FaGithub, FaNetworkWired,
} from 'react-icons/fa';

export const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    CategoryIcon: FaCode,
    accent: '#61DAFB',
    skills: [
      { name: 'React',       Icon: SiReact,      color: '#61DAFB' },
      { name: 'Next.js',     Icon: SiNextdotjs,  color: '#ffffff' },
      { name: 'Vue',         Icon: SiVuedotjs,   color: '#4FC08D' },
      { name: 'TypeScript',  Icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript',  Icon: SiJavascript, color: '#F7DF1E' },
    ],
  },
  {
    category: 'Backend',
    CategoryIcon: FaServer,
    accent: '#339933',
    skills: [
      { name: 'Node.js',     Icon: SiNodedotjs,  color: '#339933' },
      { name: 'Python',      Icon: SiPython,     color: '#3776AB' },
      { name: 'NestJS',      Icon: SiNestjs,     color: '#E0234E' },
      { name: 'FastAPI',     Icon: SiFastapi,    color: '#009688' },
      { name: 'Django',      Icon: SiDjango,     color: '#092E20' },
      { name: 'Spring Boot', Icon: SiSpring,     color: '#6DB33F' },
      { name: 'SQL',         Icon: FaDatabase,   color: '#0077cc' },
    ],
  },
  {
    category: 'Database',
    CategoryIcon: FaDatabase,
    accent: '#47A248',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
      { name: 'Redis',      Icon: SiRedis,      color: '#FF4438' },
    ],
  },
  {
    category: 'DevOps',
    CategoryIcon: FaCloud,
    accent: '#FF9900',
    skills: [
      { name: 'AWS',         Icon: SiAmazonwebservices, color: '#FF9900' },
      { name: 'Docker',      Icon: SiDocker,            color: '#2496ED' },
      { name: 'Jenkins',     Icon: SiJenkins,           color: '#D33833' },
      { name: 'GitLab CI/CD',Icon: SiGitlab,            color: '#FC6D26' },
    ],
  },
  {
    category: 'AI & ML',
    CategoryIcon: FaBrain,
    accent: '#412991',
    skills: [
      { name: 'Claude Code',      Icon: SiAnthropic,   color: '#D97757' },
      { name: 'GitHub Copilot',   Icon: FaGithub,      color: '#f0f0f0' },
      { name: 'OpenAI / Gemini',  Icon: SiOpenai,      color: '#412991' },
      { name: 'Hugging Face',     Icon: SiHuggingface, color: '#FFD21E' },
      { name: 'Prompt Engineering',Icon: FaBrain,      color: '#61DAFB' },
    ],
  },
  {
    category: 'Engineering',
    CategoryIcon: FaCogs,
    accent: '#0077cc',
    skills: [
      { name: 'Microservices',      Icon: FaNetworkWired, color: '#0077cc' },
      { name: 'Event-Driven',       Icon: FaCode,         color: '#FF9900' },
      { name: 'REST API Design',    Icon: FaServer,       color: '#4FC08D' },
      { name: 'TDD',                Icon: FaCogs,         color: '#E0234E' },
      { name: 'Agile / Scrum',      Icon: FaNetworkWired, color: '#6DB33F' },
    ],
  },
];
