# Barangay Sports Fund MVP

This prototype uses a **native Stellar Classic multisig account** as the treasury. Native multisig is the money-control layer; the app displays the fund and produces donation transactions. Do not place private keys in the app or database.

## Run the app

```powershell
cd web
npm run dev
```

The app starts in demo mode. To connect it to a funded Testnet treasury, create `web/.env.local`:

```dotenv
NEXT_PUBLIC_TREASURY_ADDRESS=G...your-funded-testnet-treasury
NEXT_PUBLIC_SOROBAN_RPC=https://soroban-testnet.stellar.org
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
```

Restart the development server after changing environment variables. A donor can then connect Freighter, enter an XLM amount, and sign a payment directly to the treasury. The payment carries the memo `DONATION:SPORTS`.

## Treasury setup: 2-of-3 policy

Create three separate Testnet signer accounts for the Treasurer, SK Chairperson, and Sports Coordinator. Fund the treasury account, then submit a `Set Options` transaction signed by its current controller that:

1. Adds the three public keys as signers with weight `1` each.
2. Sets `med_threshold` to `2` for payments.
3. Sets `high_threshold` to `2` for signer/threshold changes.
4. Sets `master_weight` to `0` only after confirming all three signer keys can sign and have recovery procedures.

After that, a payment from the treasury needs two signer approvals. The team should create one unsigned XDR, verify its recipient/amount/memo against the proposal, collect two wallet signatures, and only then submit it. Use a memo such as `BSF-2026-004` to bind a payment to a proposal.

## What is implemented

- Public treasury balance and threshold display from Horizon when configured.
- XLM donation construction, wallet signing, submission, and confirmation.
- Proposal-board prototype with IDs and spending states.
- Explorer-verifiable payment conventions through Stellar transaction memos.

## Production milestones

The proposal board is intentionally local-only in this MVP. Before launch, add authenticated officer roles, PostgreSQL persistence, receipt storage with cryptographic hashes, an idempotent Horizon transaction indexer, XDR sharing between signers, and an audit/security review. A Soroban governance contract is optional and should complement—not replace—the native multisig treasury.
