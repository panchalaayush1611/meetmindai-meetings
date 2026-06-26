import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { faqs } from '../../data/landing';
import { cn } from '../../utils/formatUtils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">FAQ</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3">Questions, answered.</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = i === openIndex;
            return (
              <div key={faq.question} className="border border-surface-border dark:border-surface-border-dark rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-ink dark:text-ink-dark">{faq.question}</span>
                  <LuChevronDown size={16} className={cn('text-ink-subtle dark:text-ink-subtle-dark transition-transform shrink-0', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-ink-subtle dark:text-ink-subtle-dark leading-relaxed">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
