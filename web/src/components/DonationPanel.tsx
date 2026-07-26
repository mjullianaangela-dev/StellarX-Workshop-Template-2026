'use client';

import { useState } from 'react';
import { buildPaymentXDR, pollTransaction, submitSignedXDR } from '@/lib/payment';
import { NETWORK_PASSPHRASE, TREASURY_ADDRESS } from '@/lib/stellar';

export default function DonationPanel({ publicKey, onDonated }: { publicKey: string | null; onDonated: () => void }) {
  const [amount, setAmount] = useState(''); const [status, setStatus] = useState(''); const [error, setError] = useState('');
  const donate = async () => {
    if (!publicKey || !TREASURY_ADDRESS) return;
    setStatus('Building your donation…'); setError('');
    try {
      const xdr = await buildPaymentXDR(publicKey, TREASURY_ADDRESS, amount, 'XLM', 'DONATION:SPORTS');
      setStatus('Approve the donation in Freighter…');
      const freighter = await import('@stellar/freighter-api');
      const signed = await freighter.signTransaction(xdr, { networkPassphrase: NETWORK_PASSPHRASE, address: publicKey });
      if (signed.error) throw new Error(typeof signed.error === 'string' ? signed.error : 'Signing was rejected');
      setStatus('Confirming on Stellar…'); const hash = await submitSignedXDR(signed.signedTxXdr); await pollTransaction(hash);
      setStatus(`Donation confirmed: ${hash.slice(0, 12)}…`); setAmount(''); onDonated();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Donation failed'); setStatus(''); }
  };
  return <section id="donate" className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-emerald-700">Community donations</p><h2 className="mt-1 text-xl font-bold text-stone-900">Support a local athlete</h2><p className="mt-2 text-sm text-stone-600">Every XLM donation is sent directly to the public treasury with a donation memo.</p>{!TREASURY_ADDRESS && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Set <code>NEXT_PUBLIC_TREASURY_ADDRESS</code> in <code>web/.env.local</code> to enable Testnet donations.</p>}<div className="mt-5 flex gap-2"><input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" step="0.1" placeholder="Amount in XLM" className="min-w-0 flex-1 rounded-xl border border-stone-300 px-3 py-3 text-stone-900" /><button onClick={donate} disabled={!publicKey || !TREASURY_ADDRESS || !amount || Boolean(status)} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40">Donate</button></div>{!publicKey && <p className="mt-3 text-xs text-stone-500">Connect a Testnet Freighter wallet to donate.</p>}{status && <p className="mt-3 text-sm text-emerald-700">{status}</p>}{error && <p className="mt-3 text-sm text-red-700">{error}</p>}</section>;
}
