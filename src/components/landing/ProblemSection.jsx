import { LuRepeat, LuUserX, LuFileX } from 'react-icons/lu';

const problems = [
  {
    icon: LuFileX,
    title: 'Decisions get lost',
    description: 'What was agreed in last week\'s call lives in one person\'s memory — or nowhere at all.',
  },
  {
    icon: LuUserX,
    title: 'No one owns the follow-up',
    description: 'Action items get mentioned out loud and then quietly forgotten by everyone in the room.',
  },
  {
    icon: LuRepeat,
    title: 'The same meeting happens twice',
    description: 'Half of every recap call is re-explaining what already got discussed last time.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 px-5 bg-surface-muted/60 dark:bg-surface-muted-dark/40">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">The problem</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3 max-w-2xl mx-auto">
          Meeting tools record everything. They just don't remember anything.
        </h2>
        <p className="text-ink-subtle dark:text-ink-subtle-dark mt-4 max-w-xl mx-auto">
          Recordings and transcripts pile up, but teams are still left to manually dig out decisions, owners, and
          deadlines — every single time.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mt-12 text-left">
          {problems.map((p) => (
            <div key={p.title} className="bg-surface-card dark:bg-surface-card-dark rounded-2xl border border-surface-border dark:border-surface-border-dark p-6">
              <div className="h-10 w-10 rounded-xl bg-danger-light dark:bg-red-500/10 text-danger flex items-center justify-center mb-4">
                <p.icon size={18} />
              </div>
              <p className="font-display font-semibold text-ink dark:text-ink-dark">{p.title}</p>
              <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1.5 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
