# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Journal DApp is an on-chain personal journal built on Base. Users connect wallets to write journal entries with mood tracking and privacy controls.

Entry fee: 0.0000001 ETH per entry.

## Architecture

**Web3 Stack**: Web3ModalProvider (app/context/Web3Modal.jsx) configures Wagmi with Base chain. Contract config in app/contracts/Journal.js exports JOURNAL_ABI and CONTRACT_ADDRESS.

**Smart Contract** (contract/contracts/Journal.sol):
- Entry: id, owner, title, content, mood, isPrivate, timestamp, exists

**Key Functions**:
- addEntry() - Payable, stores journal entry with mood and privacy flag
- togglePrivacy() - Free, switches isPrivate flag (owner only)
- getUserEntries() - Returns entries respecting privacy (if requesting own entries, returns all; if requesting others', only returns public ones)
- getEntry() - Returns single entry if permitted (reverts if private and not owner)

**Moods**: happy 😊, excited 🤩, grateful 🙏, calm 😌, neutral 😐, sad 😢, anxious 😰, angry 😠

## Components

**EntriesSection** (app/components/EntriesSection.jsx):
- Form with title, content (textarea), mood selector (8 buttons), privacy checkbox
- Display entries in reverse chronological order
- Show mood emoji, title, content, timestamp
- Privacy toggle button for owner (🔒/🔓)
- Private entries show "🔒 Private" badge

## Development

**Frontend**: `pnpm dev` (localhost:3000), `pnpm build`, `pnpm start`
**Contract**: `cd contract && npx hardhat compile && npx hardhat run scripts/deploy.js --network base`

**Environment**: NEXT_PUBLIC_PROJECT_ID (WalletConnect), PRIVATE_KEY + BASESCAN_API_KEY (contract deployment)

## Constraints

- Base mainnet only (chainId 8453)
- Entry fee: 0.0000001 ETH
- Privacy toggle is free (no fee)
- No editing entries (permanent on-chain)
- Dark mode only (pink/rose theme)
- getUserEntries respects privacy automatically
