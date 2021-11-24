# Design pattern decisions

These are some of the design pattern decisions used in this final-project: 
- **Not to call an external contract** to reduce risks.
- **To inherit from a well-known library** (OpenZeppelin) instead of implementing an ERC721 contract from scratch.
- **To use a Pausable Contract pattern as circuit breaker**, in case we detect an unexpected behaviour. 
- To inherit from OpenZeppelin Pausable contract instead of implementing a Pausable Contract pattern from scratch.
- To use an **Ownable pattern as Access Control Design**.
- To inherit from OpenZeppelin Ownable contract instead of implementing a Ownable Contract pattern from scratch.
- **To use Inter-Contract Execution** in order to separate and encapsulate functionality.


