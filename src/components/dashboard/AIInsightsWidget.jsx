import { LuSparkles, LuTriangleAlert, LuTrendingUp, LuCircleCheck } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const insights = [
  {
    icon: LuTriangleAlert,
    tone: 'text-danger bg-danger-light dark:bg-red-500/10',
    text: 'Acme Corp renewal call was flagged high-risk — a competitor was mentioned twice.',
    link: ROUTES.meetingDetails('m-3'),
  },
  {
    icon: LuTrendingUp,
    tone: 'text-success bg-success-light dark:bg-green-500/10',
    text: 'Avg. meeting health score is up 4 points this week — decision clarity improved most.',
    link: ROUTES.ANALYTICS,
  },
  {
    icon: LuCircleCheck,
    tone: 'text-primary bg-primary-light dark:bg-blue-500/10',
    text: '27 action items were completed this week, up from 18 last week.',
    link: ROUTES.TASKS,
  },
];

export default function AIInsightsWidget() {
  return (
    <Card>
      <CardHeader title="AI Insights" description="Patterns MeetMind noticed across your meetings" action={<LuSparkles className="text-primary" size={18} />} />
      <ul className="space-y-3">
        {insights.map((insight, i) => (
          <li key={i}>
            <Link to={insight.link} className="flex items-start gap-3 group">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${insight.tone}`}>
                <insight.icon size={15} />
              </div>
              <p className="text-sm text-ink dark:text-ink-dark leading-snug group-hover:text-primary transition-colors">
                {insight.text}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
