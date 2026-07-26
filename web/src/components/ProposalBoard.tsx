'use client';

import { FormEvent, useState } from 'react';

type Proposal = { id: string; title: string; category: string; amount: string; status: 'Awaiting signatures' | 'Open for review' | 'Paid'; };
const initial: Proposal[] = [
  { id: 'BSF-2026-004', title: 'Basketball uniforms for youth league', category: 'Uniforms', amount: '4,500 XLM', status: 'Awaiting signatures' },
  { id: 'BSF-2026-003', title: 'Court lighting repair', category: 'Facilities', amount: '2,100 XLM', status: 'Paid' },
];

export default function ProposalBoard() {
  const [proposals, setProposals] = useState(initial); const [title, setTitle] = useState(''); const [amount, setAmount] = useState('');
  const submit = (event: FormEvent) => { event.preventDefault(); if (!title.trim() || !amount) return; const id = `BSF-2026-${String(proposals.length + 5).padStart(3, '0')}`; setProposals([{ id, title: title.trim(), category: 'Community sports', amount: `${amount} XLM`, status: 'Open for review' }, ...proposals]); setTitle(''); setAmount(''); };
  return <section id="proposals" className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-emerald-700">Public spending queue</p><h2 className="mt-1 text-xl font-bold text-stone-900">Expense proposals</h2></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Auditable</span></div><div className="mt-5 space-y-3">{proposals.map((proposal) => <article key={proposal.id} className="rounded-2xl border border-stone-100 p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold text-stone-900">{proposal.title}</p><p className="mt-1 text-xs text-stone-500">{proposal.id} · {proposal.category}</p></div><p className="whitespace-nowrap font-semibold text-stone-900">{proposal.amount}</p></div><p className="mt-3 text-xs font-medium text-emerald-700">{proposal.status}</p></article>)}</div><form onSubmit={submit} className="mt-6 border-t border-stone-100 pt-5"><p className="text-sm font-semibold text-stone-800">Create a demo proposal</p><div className="mt-3 grid gap-2 sm:grid-cols-[1fr_130px_auto]"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Purpose, e.g. volleyball nets" className="rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900" /><input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" placeholder="XLM" className="rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900" /><button className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white">Add proposal</button></div><p className="mt-2 text-xs text-stone-500">This local demo form becomes a database-backed officer workflow in the production phase.</p></form></section>;
}
