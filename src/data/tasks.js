import { daysFromNow } from '../utils/dateUtils';
import { meetings } from './meetings';

// Flatten action items across meetings into a single task list, tagging
// each with the meeting it came from so Tasks <-> Meetings can cross-link.
const tasksFromMeetings = meetings.flatMap((meeting) =>
  (meeting.actionItems || []).map((item) => ({
    ...item,
    meetingId: meeting.id,
    meetingTitle: meeting.title,
  }))
);

const standaloneTasks = [
  {
    id: 't-extra-1',
    text: 'Renew SOC 2 audit documentation',
    owner: 'Aayush Patel',
    dueDate: daysFromNow(14),
    priority: 'low',
    status: 'open',
    meetingId: null,
    meetingTitle: null,
  },
  {
    id: 't-extra-2',
    text: 'Review Q2 AI inference cost projections',
    owner: 'Rohan Mehta',
    dueDate: daysFromNow(4),
    priority: 'medium',
    status: 'open',
    meetingId: null,
    meetingTitle: null,
  },
];

export const tasks = [...tasksFromMeetings, ...standaloneTasks];

export const tasksByStatus = (status) => tasks.filter((t) => t.status === status);
export const tasksByOwner = (owner) => tasks.filter((t) => t.owner === owner);
