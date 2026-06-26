import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card, { CardHeader } from '../common/Card';

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 10,
  fontSize: 12,
};

export default function TaskCompletionChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card>
      <CardHeader title="Task completion" description={`${total} action items tracked this quarter`} />
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="font-display font-bold text-2xl text-ink dark:text-ink-dark">{total}</p>
          <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark">total</p>
        </div>
      </div>
    </Card>
  );
}
