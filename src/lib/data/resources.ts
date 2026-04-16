export interface Resource {
  title: string;
  source: string;
  type: 'video' | 'pdf' | 'article' | 'tool';
  url: string;
  description: string;
  moduleSlug: string;
  stepIndex?: number;
}

export const resources: Resource[] = [
  {
    title: 'Why PBL?',
    source: 'HTH GSE',
    type: 'video',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: 'Foundational overview of project-based learning and its impact.',
    moduleSlug: 'what-is-pbl',
  },
  {
    title: 'The Kaleidoscope Framework',
    source: 'HTH GSE',
    type: 'pdf',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: '9-component visual design system for transformative PBL.',
    moduleSlug: 'learning-narrative',
  },
  {
    title: 'Gold Standard PBL Design Elements',
    source: 'PBLWorks',
    type: 'article',
    url: 'https://www.pblworks.org/what-is-pbl/gold-standard-project-design',
    description: 'The 7 essential project design elements from the Buck Institute.',
    moduleSlug: 'gold-standard',
  },
  {
    title: 'HTH Unboxed: Project Design',
    source: 'HTH GSE',
    type: 'video',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: 'Video collection on effective project design and implementation.',
    moduleSlug: 'gold-standard',
  },
  {
    title: 'Design Thinking for Educators',
    source: 'IDEO',
    type: 'tool',
    url: 'https://designthinking.ideo.com/',
    description: 'Free toolkit for applying design thinking in education.',
    moduleSlug: 'design-thinking',
  },
  {
    title: 'Inkwire Kaleidoscope Tool',
    source: 'HTH GSE',
    type: 'tool',
    url: 'https://inkwire.co/kaleidoscope',
    description: 'AI-powered PBL design tool using the Kaleidoscope framework.',
    moduleSlug: 'design-thinking',
  },
  {
    title: 'Understanding PBL Approaches',
    source: 'Edutopia',
    type: 'article',
    url: 'https://www.edutopia.org/project-based-learning',
    description: 'Understanding the spectrum of project and problem-based approaches.',
    moduleSlug: 'alphabet-soup',
  },
  {
    title: 'AI in PBL: Getting Started',
    source: 'HTH GSE',
    type: 'article',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: 'How to integrate AI tools thoughtfully into project-based learning.',
    moduleSlug: 'pbl-and-ai',
  },
  {
    title: 'PBL Planning Template',
    source: 'PBLWorks',
    type: 'tool',
    url: 'https://www.pblworks.org/what-is-pbl',
    description: 'Structured template for planning your first PBL unit.',
    moduleSlug: 'toolkit',
  },
  {
    title: 'Tuning Protocol Guide',
    source: 'School Reform Initiative',
    type: 'article',
    url: 'https://www.schoolreforminitiative.org/protocols/',
    description: 'Step-by-step guide for running tuning protocol feedback sessions.',
    moduleSlug: 'toolkit',
  },
  {
    title: 'HTH Unboxed Video Library',
    source: 'HTH GSE',
    type: 'video',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: 'Full collection of PBL practice videos from High Tech High.',
    moduleSlug: 'toolkit',
  },
  {
    title: 'PBL Rubric Examples',
    source: 'PBLWorks',
    type: 'pdf',
    url: 'https://www.pblworks.org/what-is-pbl',
    description: 'Sample rubrics for assessing PBL projects across subjects.',
    moduleSlug: 'toolkit',
  },
  {
    title: 'Critique Protocol Handout',
    source: 'HTH GSE',
    type: 'pdf',
    url: 'https://hthgse.edu/professional-development/pbl/',
    description: 'Printable guide for facilitating student critique sessions.',
    moduleSlug: 'toolkit',
  },
];

export function getResourcesForModule(slug: string, stepIndex?: number): Resource[] {
  return resources.filter(
    (r) =>
      r.moduleSlug === slug &&
      (stepIndex === undefined || r.stepIndex === undefined || r.stepIndex === stepIndex)
  );
}
