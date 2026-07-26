'use client';

import { useCallback, useState } from 'react';
import { NETWORK_PASSPHRASE } from '@/lib/stellar';

export interface WalletState {
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      if (typeof window === 'undefined') throw new Error('Wallet connection is only available in a browser.');
      // Dynamic import keeps the Freighter browser bridge out of server rendering.
      const freighter = await import('@stellar/freighter-api');

      // Do not gate this behind isConnected(): some Freighter versions only expose
      // themselves after the access request. requestAccess is the canonical prompt.
      const access = await freighter.requestAccess();
      if (access.error) throw new Error(formatFreighterError(access.error));
      if (!access.address) throw new Error('Freighter returned no account. Unlock it, choose an account, and try again.');

      const network = await freighter.getNetwork();
      if (network.error) throw new Error(formatFreighterError(network.error));
      if (network.networkPassphrase !== NETWORK_PASSPHRASE) {
        throw new Error('Switch Freighter to Testnet, then reconnect. This prototype does not use Mainnet.');
      }
      setPublicKey(access.address);
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setError(null);
  }, []);

  return { publicKey, connecting, error, connect, disconnect };
}

function formatFreighterError(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return 'Freighter did not respond. Confirm it is installed, unlocked, and allowed for this site, then reload.';
}
