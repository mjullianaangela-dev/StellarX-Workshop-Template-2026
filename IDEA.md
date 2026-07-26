Project Name

Barangay Sports Fund

One-Line Description

A transparent Stellar-based community fund that helps barangay members track contributions toward sports equipment and activities.

Track

Track 5 Social Impact

Problem It Solves

Barangay sports programs often rely on informal collections, making it difficult for residents to see how much has been raised for equipment, uniforms, tournaments, or court improvements. Barangay Sports Fund provides a transparent digital record of contributions and fundraising progress. It serves barangay officials, youth leaders, players, and community supporters.

How It Uses Stellar

The app runs on Stellar Testnet and uses Freighter for wallet connection and transaction signing. Users can fund test accounts through Friendbot, view balances, and submit on-chain XLM payment transactions.

A Rust Soroban SavingsGoalContract records the fund target and total contributed amount in contract instance storage. The Next.js frontend reads the fund state and submits signed init(target) and contribute(amount) interactions through Stellar’s Soroban RPC flow.

GitHub Repository

[https://github.com/mjullianaangela-dev/StellarX-Workshop-Template-2026.git]

Network & Deployment

Network: testnet
Live app URL: runs locally — see README
Contract IDs / asset issuers: N/A — add the Testnet contract ID after deployment

Team

 @[mjullianaangela-dev]

Novelty Note

Barangay Sports Fund applies Stellar payments and Soroban state tracking to a hyperlocal, community-led fundraising use case. It focuses on transparent support for youth sports rather than individual savings or generic donations.

Anything Else

Current limitation: contributions are recorded by the contract but do not yet transfer or custody real XLM/USDC. Next, we would add per-contributor records, real asset transfers, and a public transaction history for barangay fund accountability.