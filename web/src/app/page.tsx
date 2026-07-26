'use client';

import { useCallback, useState } from 'react';
import ConnectWallet from '@/components/ConnectWallet';
import DonationPanel from '@/components/DonationPanel';
import ProposalBoard from '@/components/ProposalBoard';
import TreasuryOverview from '@/components/TreasuryOverview';
import { useWallet } from '@/hooks/useWallet';

export default function Home() {
  const wallet = useWallet();
  const [refresh, setRefresh] = useState(0);
  const refreshTreasury = useCallback(() => setRefresh((value) => value + 1), []);
  return <main className="min-h-screen bg-[#f5f7f1] text-stone-900">
    <header className="border-b border-stone-200 bg-[#f5f7f1]/90"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5"><a href="#top" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-lg font-bold text-white">BS</span><span><span className="block font-bold">Barangay Sports Fund</span><span className="text-xs text-stone-500">Transparent community treasury</span></span></a><ConnectWallet {...wallet} /></div></header>
    <div id="top" className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">BUILT ON STELLAR TESTNET</p><h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">Every peso of support should have a public trail.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">A community-managed sports fund where donations go to a protected Stellar treasury and spending requires multiple officials to approve.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#donate" className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800">Donate to the fund</a><a href="#proposals" className="rounded-xl border border-stone-300 bg-white px-5 py-3 font-semibold text-stone-800 hover:bg-stone-50">View proposals</a></div></div><TreasuryOverview key={refresh} /></section>
      <section className="mt-12 grid gap-6 lg:grid-cols-2"><DonationPanel publicKey={wallet.publicKey} onDonated={refreshTreasury} /><ProposalBoard /></section>
      <section className="mt-12 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200 sm:p-8"><p className="text-sm font-semibold text-emerald-700">How funds stay protected</p><div className="mt-5 grid gap-6 md:grid-cols-3"><Step number="01" title="Donate directly" text="Residents sign an XLM payment from their own wallet to the public treasury." /><Step number="02" title="Review the proposal" text="Every expense has a proposal ID, purpose, amount, and receipt reference." /><Step number="03" title="Two officials sign" text="The treasury's 2-of-3 Stellar multisig threshold prevents one-person withdrawals." /></div></section>
      <footer className="mt-12 border-t border-stone-200 py-7 text-sm text-stone-500"><p>Testnet prototype. Never use real funds until the signer policy, recovery plan, and security review are complete.</p></footer>
    </div>
  </main>;
}

function Step({ number, title, text }: { number: string; title: string; text: string }) { return <div><p className="font-mono text-sm font-bold text-emerald-700">{number}</p><h2 className="mt-2 text-lg font-bold text-stone-900">{title}</h2><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></div>; }
