import { testimonials } from '../../data/landing';
import { getInitials, getAvatarColor } from '../../utils/formatUtils';

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Trusted by teams who hate wasted meetings</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3">What teams say after switching.</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-surface-border dark:border-surface-border-dark p-6 flex flex-col">
              <blockquote className="text-sm text-ink dark:text-ink-dark leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="flex items-center gap-3 mt-5">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold ${getAvatarColor(t.name)}`}>
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-ink-dark">{t.name}</p>
                  <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{t.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
