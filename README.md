# ARC-21
1. Project Setup
Tools Required:

Python: algokit-utils, py-algorand-sdk, beaker

TypeScript: algokit-utils, algosdk

Local Development: AlgoKit CLI, Docker (for localnet)

Directory Structure:

arc21-oracle/
├── contracts/
│   ├── oracle.py           # Python (Beaker) contract
│   └── oracle.teal         # Compiled TEAL code

├── tests/
│   ├── test_oracle.py      # Python tests
│   └── test_oracle.ts      # TypeScript tests

├── src/
│   ├── client.py           # Python client SDK
│   └── client.ts           # TypeScript client SDK

├── docs/
│   └── README.md           # Usage guide

└── scripts/
    └── deploy.py           # Deployment script
    
