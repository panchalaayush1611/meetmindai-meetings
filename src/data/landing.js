export const features = [
  {
    title: 'AI summaries, not transcripts',
    description: 'Every meeting becomes a short, structured summary — what was decided, what changed, and why — instead of a wall of text nobody re-reads.',
    icon: 'summary',
  },
  {
    title: 'Action items, owners, deadlines',
    description: 'MeetMind detects who owns what and by when, and turns it into a tracked task automatically — no one has to write it down.',
    icon: 'tasks',
  },
  {
    title: 'Risk detection',
    description: 'Flags churn signals, blockers, and unresolved concerns as they happen, so they reach the right person before they become a surprise.',
    icon: 'risk',
  },
  {
    title: 'Searchable team knowledge',
    description: 'Ask a question in plain language and get an answer pulled from every meeting your team has ever had — with the source meeting linked.',
    icon: 'search',
  },
  {
    title: 'Meeting health score',
    description: 'A single score per meeting based on engagement, decision clarity, and follow-through risk — so you can tell a good meeting from a wasted one.',
    icon: 'health',
  },
  {
    title: 'Built for how teams already work',
    description: 'Upload a recording from any tool you already use. No new meeting software to adopt, no behavior change required.',
    icon: 'integration',
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'For small teams trying out AI meeting intelligence.',
    cta: 'Start for free',
    highlighted: false,
    features: [
      'Up to 10 meetings / month',
      'AI summaries & action items',
      '1 workspace, up to 5 members',
      '30-day meeting history',
    ],
  },
  {
    name: 'Team',
    price: 24,
    period: 'per user / month',
    description: 'For growing teams that run on meetings.',
    cta: 'Start 14-day trial',
    highlighted: true,
    features: [
      'Unlimited meetings',
      'Risk detection & health scores',
      'AI Assistant knowledge search',
      'Unlimited meeting history',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'custom pricing',
    description: 'For organizations with security, scale, and compliance needs.',
    cta: 'Talk to sales',
    highlighted: false,
    features: [
      'Everything in Team',
      'SSO & SCIM provisioning',
      'Custom data retention policy',
      'Dedicated success manager',
      'SOC 2 & audit log access',
    ],
  },
];

export const testimonials = [
  {
    quote: 'We used to spend the first ten minutes of every meeting re-explaining what happened last time. That problem just doesn\'t exist anymore.',
    name: 'Engineering Director',
    company: 'Series B SaaS company',
  },
  {
    quote: 'The risk detection caught a client churn signal two weeks before our account manager would have noticed it on her own.',
    name: 'VP of Customer Success',
    company: 'B2B software company',
  },
  {
    quote: 'Our PMs stopped writing meeting notes entirely. The action items show up in the task board before the call even ends.',
    name: 'Head of Product',
    company: 'Mid-market startup',
  },
];

export const faqs = [
  {
    question: 'Do we need to switch meeting tools?',
    answer: "No. MeetMind doesn't replace Zoom, Google Meet, or Teams — you keep using whatever you already run meetings on, and upload or sync the recording afterward.",
  },
  {
    question: 'How accurate are the AI-detected action items?',
    answer: 'Action item and owner detection is tuned for typical work meetings and continues to improve with usage. You can always edit or remove anything the AI gets wrong in one click.',
  },
  {
    question: 'Who can see our meeting transcripts?',
    answer: 'Only members of your workspace, based on the role permissions an admin sets. Transcripts are never used to train models for other customers.',
  },
  {
    question: 'Can we export our data?',
    answer: 'Yes — summaries, transcripts, and action items can be exported per meeting or in bulk at any time, on every plan.',
  },
  {
    question: 'Is there a limit to how far back we can search?',
    answer: 'On the Team and Enterprise plans, search covers your full meeting history with no time limit.',
  },
];

export const heroStats = [
  { value: '4.6h', label: 'avg. hours saved per employee / week' },
  { value: '94%', label: 'action items captured without manual entry' },
  { value: '2,400+', label: 'meetings processed daily' },
];
