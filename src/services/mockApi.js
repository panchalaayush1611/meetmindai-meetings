import { meetings } from '../data/meetings';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Very small "AI assistant" simulation — looks for keyword overlap between
// the question and meeting titles/tags/summaries, then composes an answer
// that cites the most relevant meeting. This is intentionally simple; in a
// real build this call would hit an LLM with the transcript corpus as context.
export async function generateAssistantReply(question) {
  await wait(900 + Math.random() * 700);

  const lower = question.toLowerCase();
  const scored = meetings
    .filter((m) => m.status === 'completed')
    .map((m) => {
      const haystack = `${m.title} ${m.type} ${m.project} ${(m.tags || []).join(' ')} ${m.summary || ''}`.toLowerCase();
      const score = haystack.split(' ').filter((word) => lower.includes(word) && word.length > 3).length;
      return { meeting: m, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (!best || best.score === 0) {
    return {
      text: "I couldn't find a meeting that closely matches that — try mentioning a project name, team, or meeting type, and I'll search your meeting history for it.",
      sources: [],
    };
  }

  const m = best.meeting;
  const text = `Based on "${m.title}" (${m.type}${m.project ? `, ${m.project}` : ''}): ${m.summary || 'No summary is available for this meeting yet.'}`;

  return {
    text,
    sources: [{ meetingId: m.id, meetingTitle: m.title }],
  };
}

export async function simulateUploadProcessing() {
  await wait(2600 + Math.random() * 1200);
  return true;
}
