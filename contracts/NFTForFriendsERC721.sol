// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title NFTs for friends - ERC721
/// @author Jose Redondo
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract NFF is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTForFriends", "NFF") {}

    /// @notice Pause the contract. Only the contract owner can call it.
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause the contract. Only the contract owner can call it.
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Safely mint an ERC721 token owned by "to".
    /// @param to Owner of the minted token.
    /// @return Minted token id.
    function safeMint(address to) public 
        onlyOwner 
        returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    /// @notice Transfer token to a different owner.
    /// @param from Original owner of the token.
    /// @param to New owner of the minted token.
    /// @param tokenId Identifier of token to transfer.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}