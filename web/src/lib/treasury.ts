import { HORIZON_URL, TREASURY_ADDRESS } from './stellar';

export interface TreasurySnapshot {
  xlmBalance: string;
  signerCount: number;
  paymentThreshold: number;
  configured: boolean;
}

interface HorizonAccount {
  balances: Array<{ asset_type: string; balance: string }>;
  signers: unknown[];
  thresholds: { med_threshold: number };
}

/** Reads the public treasury configuration from Horizon. No key is required. */
export async function getTreasurySnapshot(): Promise<TreasurySnapshot | null> {
  if (!TREASURY_ADDRESS) return null;
  const response = await fetch(`${HORIZON_URL}/accounts/${TREASURY_ADDRESS}`);
  if (!response.ok) throw new Error('Treasury account is unavailable on Testnet.');
  const account = (await response.json()) as HorizonAccount;
  const native = account.balances.find((balance) => balance.asset_type === 'native');
  return {
    xlmBalance: native?.balance ?? '0',
    signerCount: account.signers.length,
    paymentThreshold: account.thresholds.med_threshold,
    configured: true,
  };
}
