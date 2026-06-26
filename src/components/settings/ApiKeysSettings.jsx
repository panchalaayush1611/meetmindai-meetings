import { useState } from 'react';
import { LuKey, LuCopy, LuEye, LuEyeOff, LuTrash2, LuPlus, LuCheck } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';

const initialKeys = [
  { id: 'k1', name: 'Production', value: 'mm_live_8f3k2hd92jak0sl1pqz7vx4n', createdAt: 'Created Mar 12, 2026', revealed: false },
  { id: 'k2', name: 'Staging', value: 'mm_test_a91kd0sl3jak2hf8pqz9vy2m', createdAt: 'Created Jan 28, 2026', revealed: false },
];

const mask = (key) => `${key.slice(0, 8)}${'•'.repeat(16)}${key.slice(-4)}`;

export default function ApiKeysSettings() {
  const [keys, setKeys] = useState(initialKeys);
  const [copiedId, setCopiedId] = useState(null);

  const toggleReveal = (id) => setKeys((k) => k.map((key) => (key.id === id ? { ...key, revealed: !key.revealed } : key)));
  const revoke = (id) => setKeys((k) => k.filter((key) => key.id !== id));
  const copy = (key) => {
    navigator.clipboard?.writeText(key.value);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 1500);
  };
  const generate = () => {
    const id = `k${Date.now()}`;
    setKeys((k) => [
      { id, name: `Key ${k.length + 1}`, value: `mm_live_${Math.random().toString(36).slice(2, 26)}`, createdAt: 'Created just now', revealed: true },
      ...k,
    ]);
  };

  return (
    <Card>
      <CardHeader
        title="API Keys"
        description="Use these to integrate MeetMind with your own tools"
        action={<Button variant="primary" size="sm" icon={LuPlus} onClick={generate}>Generate key</Button>}
      />
      <ul className="divide-y divide-surface-border dark:divide-surface-border-dark">
        {keys.map((key) => (
          <li key={key.id} className="flex items-center justify-between gap-4 py-3.5 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-lg bg-surface-muted dark:bg-surface-muted-dark flex items-center justify-center shrink-0">
                <LuKey size={15} className="text-ink-subtle dark:text-ink-subtle-dark" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{key.name}</p>
                <p className="text-xs font-mono text-ink-subtle dark:text-ink-subtle-dark truncate">
                  {key.revealed ? key.value : mask(key.value)}
                </p>
                <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{key.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={() => toggleReveal(key.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark">
                {key.revealed ? <LuEyeOff size={15} /> : <LuEye size={15} />}
              </button>
              <button onClick={() => copy(key)} className="h-8 w-8 flex items-center justify-center rounded-lg text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark">
                {copiedId === key.id ? <LuCheck size={15} className="text-success" /> : <LuCopy size={15} />}
              </button>
              <button onClick={() => revoke(key.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-danger hover:bg-danger-light dark:hover:bg-red-500/10">
                <LuTrash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {keys.length === 0 && <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark py-4 text-center">No API keys yet.</p>}
    </Card>
  );
}
