import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card, { CardHeader } from '../common/Card';

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 10,
  fontSize: 12,
  boxShadow: '0 4px 12px -2px rgba(17,24,39,0.08)',
};

export default function MeetingHoursChart({ data }) {
  return (
    <Card>
      <CardHeader title="Meeting hours" description="Total hours spent in meetings per week" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="4 4" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#2563EB', opacity: 0.05 }} />
            <Bar dataKey="hours" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
