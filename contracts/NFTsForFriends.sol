// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "./NFTForFriendsERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/// @title NFTs for friends
/// @author Jose Redondo
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract NFTsForFriends is Ownable, Pausable{
    NFF private _nffERC721;

    mapping (address => bool) private _registeredAddresses;
    mapping (uint256 => bool) private _acquiredNFTs;
    mapping (uint256 => uint256) private _publishedNFTs;
    mapping (uint256 => uint256) private _NFTPrices;
    mapping (uint256 => mapping (address => uint256)) private _NFTShares;

    /* 
   * Events
   */

    /// @param _address Address registered in the contract.
    event LogAddressRegistered(address _address);

    /// @param _NFTId Identifier of the published NFT.
    event LogNFTPublished(uint256 _NFTId);

    /// @param _NFTId Identifier of the acquired NFT.
    /// @param _buyer Address of the NFT buyer.
    event LogNFTSolelyAcquired(uint256 _NFTId, address _buyer);

    /// @param _NFTId Identifier of the acquired NFT.
    /// @param _propertyPoints Property shares for any of the NFT buyers.
    /// @param _buyers Addresses of the NFT buyers.
    event LogNFTAcquired(uint256 _NFTId, uint256[] _propertyPoints, address[] _buyers);

    modifier isRegistered(address _address){
        // checks that the sender is registered
        require(_registeredAddresses[_address]);
        _;
    }

    modifier isNFTPublished(uint256 _NFTId){
        // checks that the NFT is published
        require(_nffERC721.ownerOf(_NFTId)!=address(0));
        _;
    }

    modifier hasNFTNotYetBeenAcquired(uint256 _NFTId){
        // checks that the NFT has not been acquired yet
        require(!_acquiredNFTs[_NFTId]);
        _;
    }

    modifier paidEnough(uint _price) { 
        require(msg.value >= _price); 
        _;
    }

    constructor(address _nffAddress) 
        Ownable () 
        Pausable ()
    {
        _nffERC721 = NFF(_nffAddress);
    }

    /// @notice Pause the contract. Only the contract owner can call it.
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause the contract. Only the contract owner can call it.
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Registers the caller in the contract.
    function registerIn() public 
        whenNotPaused 
    {
        _registeredAddresses[msg.sender] = true;
        emit LogAddressRegistered(msg.sender);
    }

    /// @notice Publishes an NFT, minting an ERC721 token and associating it with the NFT hash. Only the contract owner can call it.
    /// @param _hashNFT NFT hash value.
    /// @param _price NFT price.
    /// @return NFT identifier.
    function publishNFT(uint256 _hashNFT, uint256 _price)
        public
        onlyOwner()
        returns (uint256)
    {
        uint256 NFTId = _nffERC721.safeMint(this.owner());
        _publishedNFTs[_hashNFT] = NFTId;
        _NFTPrices[NFTId] = _price;
        emit LogNFTPublished(NFTId);
         
        return NFTId;
    }

    /// @notice Transfers the NFT to the caller if the message value is superior or equal to the NFT price.
    /// @param _NFTId Identifier of the NFT to acquire.
    function acquireNFT(uint256 _NFTId) public payable 
        whenNotPaused
        isRegistered(msg.sender)
        isNFTPublished(_NFTId)
        hasNFTNotYetBeenAcquired(_NFTId)
        paidEnough(_NFTPrices[_NFTId])
    {
        _acquiredNFTs[_NFTId] = true;
        _nffERC721.transferFrom(this.owner(), msg.sender, _NFTId);
        emit LogNFTSolelyAcquired(_NFTId, msg.sender);
    }

    /// @notice Returns if the NFT is still available to acquire.
    /// @param _NFTId Identifier of the NFT.
    /// @return If the NFT is still available to acquire.
    function isNFTAvailable(uint256 _NFTId) public view returns (bool){
        return ((!_acquiredNFTs[_NFTId])&&(_nffERC721.ownerOf(_NFTId)==this.owner()));
    }

    /// @notice Returns if the caller is the NFT owner.
    /// @param _NFTId Identifier of the NFT.
    /// @return If the NFT is owned by the caller.
    function amIOwnerOf(uint256 _NFTId) public view returns (bool){
        if (_nffERC721.ownerOf(_NFTId)==msg.sender){
            return true;
        }
        return (_NFTShares[_NFTId][msg.sender] > 0);
    }

    /// @notice Transfers the NFT ownership to several buyers according to the property points sent as parameter.
    /// @param _NFTId Identifier of the NFT to acquire.
    /// @param _propertyPoints Property shares of the several buyers.
    /// @param _buyers Buyers to share the NFT ownership.
    function acquireSharedNFT(
        uint256 _NFTId,
        uint256[] memory _propertyPoints,
        address[] memory _buyers
    ) public payable 
        whenNotPaused
        isRegistered(msg.sender)
        isNFTPublished(_NFTId)
        hasNFTNotYetBeenAcquired(_NFTId)
        paidEnough(_NFTPrices[_NFTId])
    {
        // acquires the NFT as a shared property
        require(_propertyPoints.length==_buyers.length);

        _acquiredNFTs[_NFTId] = true;

        for(uint i = 0 ; i<_buyers.length; i++) {
            _NFTShares[_NFTId][_buyers[i]] = _propertyPoints[i];
        }
        emit LogNFTAcquired(_NFTId, _propertyPoints, _buyers);
    }

    receive() external payable {}

    fallback() external payable {
        revert();
    }
}
