export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" // UPDATE AFTER DEPLOYMENT

export const JOURNAL_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "title", "type": "string"},
      {"indexed": false, "internalType": "bool", "name": "isPrivate", "type": "bool"}
    ],
    "name": "EntryAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
      {"indexed": false, "internalType": "bool", "name": "isPrivate", "type": "bool"}
    ],
    "name": "EntryUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_content", "type": "string"},
      {"internalType": "string", "name": "_mood", "type": "string"},
      {"internalType": "bool", "name": "_isPrivate", "type": "bool"}
    ],
    "name": "addEntry",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "entryFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_entryId", "type": "uint256"}
    ],
    "name": "getEntry",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "entryOwner", "type": "address"},
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "content", "type": "string"},
      {"internalType": "string", "name": "mood", "type": "string"},
      {"internalType": "bool", "name": "isPrivate", "type": "bool"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "bool", "name": "exists", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_user", "type": "address"}
    ],
    "name": "getUserEntries",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "content", "type": "string"},
          {"internalType": "string", "name": "mood", "type": "string"},
          {"internalType": "bool", "name": "isPrivate", "type": "bool"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "exists", "type": "bool"}
        ],
        "internalType": "struct Journal.Entry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_entryId", "type": "uint256"}
    ],
    "name": "togglePrivacy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
