import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowRight, LuPlay, LuSparkles, LuCircleCheck, LuClock } from 'react-icons/lu';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { ROUTES } from '../../constants/routes';
import { heroStats } from '../../data/landing';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-5">
      <div
        className="absolute inset-x-0 top-0 h-[480px] -z-10 opacity-60"
        style={{
          background: 'radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.10) 0%, rgba(248,250,252,0) 70%)',
        }}
      />
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge tone="primary" icon={LuSparkles} className="mx-auto">AI Meeting Intelligence Platform</Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display font-bold text-[2.5rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-ink dark:text-ink-dark mt-5"
        >
          Transform meetings <br className="hidden sm:block" />
          into <span className="text-primary">action.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-ink-subtle dark:text-ink-subtle-dark text-lg mt-5 max-w-xl mx-auto"
        >
          MeetMind AI turns every recorded meeting into a structured summary, tracked action items, and searchable
          team knowledge — automatically.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="lg" iconRight={LuArrowRight}>Start for free</Button>
          </Link>
          <a href="#demo">
            <Button variant="outline" size="lg" icon={LuPlay}>Watch demo</Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 relative"
        >
          <TranscriptToSummaryDemo />
        </motion.div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-ink-dark">{stat.value}</p>
              <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TranscriptToSummaryDemo() {
  return (
    <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto rounded-2xl border border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark shadow-popover p-3 sm:p-4 text-left">
      <div className="rounded-xl bg-surface-muted dark:bg-surface-muted-dark p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-subtle dark:text-ink-subtle-dark mb-3">Raw transcript</p>
        <div className="space-y-2.5 font-mono text-[11.5px] text-ink-subtle dark:text-ink-subtle-dark leading-relaxed">
          <p><span className="text-ink dark:text-ink-dark font-medium">Priya:</span> we need the usage-based pricing tier ready by Friday for Acme...</p>
          <p><span className="text-ink dark:text-ink-dark font-medium">Vikram:</span> got it, I'll send the proposal once finance confirms margins...</p>
          <p><span className="text-ink dark:text-ink-dark font-medium">Aayush:</span> also flag this as at-risk for Friday's leadership sync...</p>
        </div>
      </div>
      <div className="rounded-xl bg-surface dark:bg-surface-dark border border-surface-border dark:border-surface-border-dark p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <LuSparkles size={14} className="text-primary" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">MeetMind summary</p>
        </div>
        <div className="flex items-start gap-2">
          <LuCircleCheck size={14} className="text-success mt-0.5 shrink-0" />
          <p className="text-[12px] text-ink dark:text-ink-dark">Send usage-based pricing proposal to Acme — <span className="text-ink-subtle dark:text-ink-subtle-dark">Vikram, due Friday</span></p>
        </div>
        <div className="flex items-start gap-2">
          <LuClock size={14} className="text-warning mt-0.5 shrink-0" />
          <p className="text-[12px] text-ink dark:text-ink-dark">Flagged as <span className="font-medium text-danger">high risk</span> for leadership review</p>
        </div>
        <div className="flex items-start gap-2">
          <LuCircleCheck size={14} className="text-success mt-0.5 shrink-0" />
          <p className="text-[12px] text-ink dark:text-ink-dark">Confirm margins with finance before sending</p>
        </div>
      </div>
    </div>
  );
}
