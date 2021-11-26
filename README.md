# NFTs shared with friends

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

## Installation steps

You need to install open-zeppelin contracts, that smart-contracts inherits from.

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

You can test locally the complete Dapp.

First, start with the contracts migration using:
```bash
truffle migrate --network local
```

Then you perform the setup actions (publishing the needed NFTs) with:
```bash
truffle exec setup/setup_dapp.js --network local
```

Then you set a Live Server for `docs/index.html`. You need Live Server as Metamask connects only to a server, not an static file (took me long time!).

## Frontend address

https://jredondoh.github.io/blockchain-developer-bootcamp-final-project/

##

All in Goerli testnet:
- NFF at 0x645652b1C4544c86436b6760d74121540E0A0A98
- NFTsForFriends at 0x4E3bB98424D42A400dBD8a2A7300766501c2752d


