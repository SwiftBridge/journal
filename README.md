# Journal DApp

Your personal journal on the blockchain. Write entries, track your mood, and control privacy with on-chain storage on Base.

## Features

- **Journal Entries**: Write and store personal journal entries permanently
- **Mood Tracking**: Select from 8 mood emojis (happy, excited, grateful, calm, neutral, sad, anxious, angry)
- **Privacy Control**: Toggle entries between private and public
- **Timestamps**: Full date display with relative time
- **Entry Fee**: Only 0.0000001 ETH per entry
- **Dark Mode**: Pink/rose-themed UI
- **WalletConnect**: Support for all major Web3 wallets

## Tech Stack

- Next.js 15, React 19
- Tailwind CSS (dark mode)
- Wagmi v2, Viem, Web3Modal v5
- Solidity 0.8.27
- Base mainnet
- Hardhat

## Getting Started

### Installation

```bash
git clone https://github.com/winsznx/journal.git
cd journal
pnpm install
```

### Environment Setup

Create `.env.local`:
```bash
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
```

Get your Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Smart Contract

### Deploy

```bash
cd contract
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network base
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

Update `app/contracts/Journal.js` with deployed address.

## Contract Functions

- `addEntry()` - Create journal entry (payable)
- `togglePrivacy()` - Switch between private/public (free)
- `getUserEntries()` - Fetch user's entries (respects privacy)
- `getEntry()` - Get single entry (respects privacy)

## Privacy

- Private entries are only visible to the entry owner
- Public entries are visible to anyone
- Privacy can be toggled anytime by the owner (free transaction)

## License

MIT
