export interface Service {
  id: string
  index: string
  title: string
  /** Very short descriptor used in the hero service index. */
  short: string
  /** One-sentence positioning statement. */
  summary: string
  body: string
  includes: string[]
}

export const services: Service[] = [
  {
    id: 'service-custom-software',
    index: '01',
    title: 'Custom Software Development',
    short: 'Applications built around your requirements',
    summary: 'Purpose-built applications and systems designed around real business requirements.',
    body: 'When off-the-shelf tools force your team into workarounds, we build software that fits. Internal platforms, client portals and line-of-business applications, designed together with the people who use them and engineered to be maintained for years.',
    includes: [
      'Web applications and client portals',
      'Internal tools and back-office systems',
      'Data models, business rules and permissions',
      'Modernization of existing applications',
    ],
  },
  {
    id: 'service-ai-agents',
    index: '02',
    title: 'AI Agents & Intelligent Automation',
    short: 'AI connected to your processes and tools',
    summary: 'AI-powered workflows and agents connected to your business processes and tools.',
    body: 'We design AI agents and assisted workflows that work with your real data and systems, with clear boundaries, human review where decisions matter, and behavior you can trace and audit.',
    includes: [
      'Document, email and request processing',
      'Agents that act inside business systems',
      'Search and answers over internal knowledge',
      'Human-in-the-loop review and approval',
    ],
  },
  {
    id: 'service-process-automation',
    index: '03',
    title: 'Business Process Automation',
    short: 'Less repetitive, manual work',
    summary: 'Removing repetitive manual work and making operations more efficient and dependable.',
    body: 'We map how work actually moves through your organization, then automate the repetitive steps: data entry, reconciliation, notifications, approvals and reporting. People stay in control of the exceptions.',
    includes: [
      'Process mapping and analysis',
      'Rule-based and event-driven workflows',
      'Scheduled jobs and automated reporting',
      'Exception handling and monitoring',
    ],
  },
  {
    id: 'service-integration',
    index: '04',
    title: 'Systems & API Integration',
    short: 'Your applications working as one system',
    summary: 'Connecting applications, services and existing infrastructure.',
    body: 'We connect CRMs, ERPs, accounting platforms, databases and third-party services through reliable, documented APIs, so information moves where it is needed without copying it by hand.',
    includes: [
      'REST API design and development',
      'Third-party and legacy system integration',
      'Data synchronization and migration',
      'Webhooks and event-driven pipelines',
    ],
  },
]
