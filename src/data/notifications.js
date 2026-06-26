import { daysFromNow } from '../utils/dateUtils';

export const notifications = [
  {
    id: 'n-1',
    type: 'risk',
    title: 'Risk detected in Acme Corp — Renewal Call',
    description: 'Client mentioned evaluating a competitor. Review the risk summary.',
    createdAt: daysFromNow(-1, 14, 40),
    read: false,
    link: '/meetings/m-3',
  },
  {
    id: 'n-2',
    type: 'task',
    title: 'Task due tomorrow',
    description: 'Loop in support lead on SLA escalation — due tomorrow.',
    createdAt: daysFromNow(-1, 15, 0),
    read: false,
    link: '/tasks',
  },
  {
    id: 'n-3',
    type: 'summary',
    title: 'Summary ready: Design Review — Onboarding Flow',
    description: 'AI summary and 3 action items have been generated.',
    createdAt: daysFromNow(-2, 16, 55),
    read: true,
    link: '/meetings/m-4',
  },
  {
    id: 'n-4',
    type: 'mention',
    title: 'Priya Sharma mentioned you in a comment',
    description: '"Added this to the at-risk accounts list for Friday leadership sync."',
    createdAt: daysFromNow(0, 9, 0),
    read: false,
    link: '/meetings/m-3',
  },
  {
    id: 'n-5',
    type: 'workspace',
    title: 'Vikram Nair accepted their invite',
    description: 'Vikram joined the Team Codeverse workspace.',
    createdAt: daysFromNow(-4, 10, 0),
    read: true,
    link: '/workspace',
  },
  {
    id: 'n-6',
    type: 'summary',
    title: 'Summary ready: Q2 All-Hands',
    description: 'AI summary and 2 action items have been generated.',
    createdAt: daysFromNow(-6, 18, 5),
    read: true,
    link: '/meetings/m-6',
  },
];

export const suggestedPrompts = [
  'What decisions were made about Acme Corp this month?',
  'List all open action items assigned to me',
  'Summarize every meeting tagged "Engineering" this week',
  'Which meetings had a risk score above medium?',
  'What did we decide about the onboarding flow?',
];

export const chatHistory = [
  {
    id: 'chat-1',
    title: 'Acme Corp risk summary',
    updatedAt: daysFromNow(-1, 17, 0),
    messages: [
      { id: 'msg-1', role: 'user', text: 'What decisions were made about Acme Corp this month?', createdAt: daysFromNow(-1, 17, 0) },
      {
        id: 'msg-2',
        role: 'assistant',
        text: "In the Acme Corp — Renewal Call on Tuesday, the team decided to offer a usage-based pricing tier instead of flat enterprise pricing, and to escalate the support SLA complaint internally before re-engaging the client. The call was flagged as high risk after the client mentioned evaluating a competitor.",
        createdAt: daysFromNow(-1, 17, 0),
        sources: [{ meetingId: 'm-3', meetingTitle: 'Acme Corp — Renewal Call' }],
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'My open action items',
    updatedAt: daysFromNow(-2, 9, 0),
    messages: [
      { id: 'msg-3', role: 'user', text: 'List all open action items assigned to me', createdAt: daysFromNow(-2, 9, 0) },
      {
        id: 'msg-4',
        role: 'assistant',
        text: 'You have 2 open action items: "Prepare churn-risk summary for leadership review" (due in 5 days, from Acme Corp — Renewal Call) and "Renew SOC 2 audit documentation" (due in 14 days).',
        createdAt: daysFromNow(-2, 9, 0),
        sources: [{ meetingId: 'm-3', meetingTitle: 'Acme Corp — Renewal Call' }],
      },
    ],
  },
];
