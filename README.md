# NFTs shared with friends

## Frontend address

https://jredondoh.github.io/blockchain-developer-bootcamp-final-project/

## Initial description and goals

### Description:

To have a way of sharing a property of a NFT between several friends.

### Workflow:

The user will have to register themselves in the NFT marketplace.

The user selects the NFT to purchase.

The user specifies if the NFT property is shared.

If shared, the user specifies the different property percentages and the addresses of the different owners.

### Strech goal:

The different property percentage can be sold/transferred or split even more.

## Directory structure

At root folder:
- contracts, that contains the developed smart-contracts
- migrations, that contains the migration files
- test, with the smart-contract unit tests and helper files
- docs, that contains the frontend app

## Prerequisites

- npm
- truffle
- ganache-cli
- Live Server feature (I used VSCode one)

## Installation steps

Perform all actions from the project root folder.

You need to install open-zeppelin contracts, as my smart-contracts inherits from them.

```bash
npm install @openzeppelin/contracts
```

To compile, you run:
```bash
truffle compile
```

To run smart-contract unit tests, you run:
```bash
truffle test
```
You do not need local testnet for these unit tests.

### Local E2E tests

Perform all actions from the project root folder.

You can test locally the complete Dapp.

First, deploy a local testnet on default port 8545:
```bash
ganache-cli
```

Truffle `local` network configuration included in the project connects to this local testnet.

So start with the contracts migration using:
```bash
truffle migrate --network local
```

Copy the address of the deployed `NFTsForFriends` contract in the setup script (`setup/setup_dapp.js`).

Then you perform the setup actions (publishing the needed NFTs) with:
```bash
truffle exec setup/setup_dapp.js --network local
```

Modify the address of the deployed `NFTsForFriends` contract in `docs/dapp.js`.

Finally you set a Live Server for `docs/index.html`. You need Live Server as Metamask connects only to a server, not an static file (took me long time!).

And access to the frontend. For example, as I was running the live server at port 5500, I accessed to:
```
http://127.0.0.1:5500/docs/
```
