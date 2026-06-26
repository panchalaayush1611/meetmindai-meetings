export const meetingHoursByWeek = [
  { week: 'W1', hours: 18.5, meetings: 22 },
  { week: 'W2', hours: 21.0, meetings: 26 },
  { week: 'W3', hours: 16.2, meetings: 19 },
  { week: 'W4', hours: 23.8, meetings: 29 },
  { week: 'W5', hours: 19.4, meetings: 24 },
  { week: 'W6', hours: 14.6, meetings: 17 },
  { week: 'W7', hours: 20.1, meetings: 25 },
  { week: 'W8', hours: 17.3, meetings: 21 },
];

export const productivityTrend = [
  { week: 'W1', score: 68 },
  { week: 'W2', score: 71 },
  { week: 'W3', score: 75 },
  { week: 'W4', score: 70 },
  { week: 'W5', score: 78 },
  { week: 'W6', score: 82 },
  { week: 'W7', score: 79 },
  { week: 'W8', score: 85 },
];

export const taskCompletion = [
  { name: 'Completed', value: 142, color: '#22C55E' },
  { name: 'In progress', value: 38, color: '#2563EB' },
  { name: 'Open', value: 26, color: '#F59E0B' },
  { name: 'Overdue', value: 9, color: '#EF4444' },
];

export const riskTrend = [
  { week: 'W1', low: 14, medium: 5, high: 1 },
  { week: 'W2', low: 17, medium: 6, high: 2 },
  { week: 'W3', low: 12, medium: 4, high: 1 },
  { week: 'W4', low: 19, medium: 7, high: 3 },
  { week: 'W5', low: 16, medium: 5, high: 2 },
  { week: 'W6', low: 11, medium: 4, high: 1 },
  { week: 'W7', low: 18, medium: 5, high: 2 },
  { week: 'W8', low: 15, medium: 4, high: 1 },
];

export const attendanceByTeam = [
  { team: 'Engineering', attendanceRate: 94 },
  { team: 'Product', attendanceRate: 91 },
  { team: 'Sales', attendanceRate: 86 },
  { team: 'HR', attendanceRate: 97 },
  { team: 'Leadership', attendanceRate: 89 },
];

export const weeklyReport = {
  totalMeetingHours: 17.3,
  meetingsHeld: 21,
  actionItemsCreated: 34,
  actionItemsCompleted: 27,
  avgHealthScore: 81,
  avgHealthScoreDelta: 4,
  topRiskAccount: 'Acme Corp',
  hoursSavedEstimate: 6.5,
};

export const summaryStats = [
  { label: 'Meeting hours this week', value: '17.3h', delta: '-13%', trend: 'down', good: true },
  { label: 'Avg. health score', value: '81', delta: '+4', trend: 'up', good: true },
  { label: 'Action items completed', value: '27', delta: '+9', trend: 'up', good: true },
  { label: 'Open risks', value: '3', delta: '-2', trend: 'down', good: true },
];
