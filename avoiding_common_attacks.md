# Avoiding common attacks

These are the design decisions taken to avoid common attacks:

## Avoiding solidity pitfalls and attacks

- To use **specific compiler pragma** (0.8.2) instead of inferior threshold.
- To use **modifiers only for function validations**.
- To never change a state after a contract call (**check-effect-interaction**).

## Avoiding attack vectors and smart-contract pitfalls

- To avoid **forcibly sending ether (SWC-132)**, I implemented a payable fallback function that reverts the transaction. To fund the contract, I included a receive function.
- As the contract does not execute any transfer, no possibility of **reentrancy(SWC-107)**.
- To use msg.sender instead of tx.origin to avoid the **Tx.Origin Authentication attack (SWC-115)**. 