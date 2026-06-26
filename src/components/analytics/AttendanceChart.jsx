import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Card, { CardHeader } from '../common/Card';

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 10,
  fontSize: 12,
};

const barColor = (rate) => (rate >= 92 ? '#22C55E' : rate >= 85 ? '#2563EB' : '#F59E0B');

export default function AttendanceChart({ data }) {
  return (
    <Card>
      <CardHeader title="Attendance by team" description="Share of invited participants who joined" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="#E5E7EB" strokeDasharray="4 4" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="team" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={90} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Attendance']} />
            <Bar dataKey="attendanceRate" radius={[0, 6, 6, 0]} maxBarSize={18}>
              {data.map((entry) => (
                <Cell key={entry.team} fill={barColor(entry.attendanceRate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
