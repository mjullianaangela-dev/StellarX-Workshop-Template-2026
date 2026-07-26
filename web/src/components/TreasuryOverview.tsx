'use client';

import { useEffect, useState } from 'react';
import { getTreasurySnapshot, type TreasurySnapshot } from '@/lib/treasury';
import { TREASURY_ADDRESS } from '@/lib/stellar';

const demo: TreasurySnapshot = { xlmBalance: '24,850.00', signerCount: 3, paymentThreshold: 2, configured: false };

export default function TreasuryOverview() {
  const [snapshot, setSnapshot] = useState<TreasurySnapshot>(demo);
  const [message, setMessage] = useState('Demo figures are shown until a treasury address is configured.');
  useEffect(() => {
    getTreasurySnapshot().then((value) => {
      if (value) { setSnapshot(value); setMessage('Live Testnet data, read from Stellar Horizon.'); }
    }).catch((error: unknown) => setMessage(error instanceof Error ? error.message : 'Unable to load treasury.'));
  }, []);
  return <section className="rounded-3xl bg-[#123b2d] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-medium text-emerald-200">Barangay Sports Fund</p><h2 className="mt-2 text-3xl font-bold tracking-tight">{snapshot.xlmBalance} <span className="text-lg font-medium text-emerald-200">XLM</span></h2><p className="mt-2 text-sm text-emerald-100">Available for youth leagues, equipment, uniforms, and facilities.</p></div><span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-200/30">{snapshot.configured ? 'LIVE TESTNET' : 'DEMO MODE'}</span></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-3"><Stat label="Treasury signers" value={`${snapshot.signerCount}`} /><Stat label="Payment threshold" value={`${snapshot.paymentThreshold} of ${snapshot.signerCount}`} /><Stat label="Fund protection" value="Multi-signature" /></div>
    <p className="mt-5 text-xs text-emerald-100/75">{message}</p>{TREASURY_ADDRESS && <p className="mt-2 break-all font-mono text-xs text-emerald-100/75">{TREASURY_ADDRESS}</p>}
  </section>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-emerald-100/70">{label}</p><p className="mt-1 font-semibold">{value}</p></div>; }
