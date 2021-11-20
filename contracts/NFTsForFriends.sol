pragma solidity 0.8.2;

import "./NFTForFriendsERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTsForFriends is Ownable{
    NFF private _nffERC721;

    mapping (address => bool) private _registeredAddresses;
    mapping (uint256 => bool) private _acquiredNFTs;
    mapping (uint256 => uint256) private _publishedNFTs;
    mapping (uint256 => uint256) private _NFTPrices;
    mapping (uint256 => address) private _NFTOwners;
    mapping (uint256 => mapping (address => uint256)) private _NFTShares;

    /* 
   * Events
   */

    event LogAddressRegistered(address _address);

    event LogNFTPublished(uint256 _NFTId);

    event LogNFTPreAcquired(uint256 _NFTId, address _buyer);

    event LogNFTSolelyAcquired(uint256 _NFTId, address _buyer);

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

    modifier hasNFTBeenPreAcquired(uint256 _NFTId, address _buyer){
    // checks that the NFT has not been acquired yet
        require(_NFTOwners[_NFTId]==_buyer);
        _;
    }
    modifier paidEnough(uint _price) { 
        require(msg.value >= _price); 
        _;
    }

    constructor(address _nffAddress) Ownable () {
        _nffERC721 = NFF(_nffAddress);
    }

    function registerIn() public {
        // registers the sender in the marketplace
        _registeredAddresses[msg.sender] = true;
        emit LogAddressRegistered(msg.sender);
    }

    function publishNFT(uint256 hashNFT, uint256 price)
        public
        onlyOwner()
        returns (uint256 _NFTId)
    {
        // publishes the NFT in the marketplace
        uint256 NFTId = _nffERC721.safeMint(this.owner());
        _publishedNFTs[hashNFT] = NFTId;
        _NFTPrices[NFTId] = price;
        emit LogNFTPublished(NFTId);
         
        return NFTId;
    }

    function acquireNFT(uint256 _NFTId) public payable 
        isRegistered(msg.sender)
        isNFTPublished(_NFTId)
        hasNFTNotYetBeenAcquired(_NFTId)
        paidEnough(_NFTPrices[_NFTId])
    {
        // step previous to acquiring solely the NFT property
        _NFTOwners[_NFTId] = msg.sender;
        emit LogNFTPreAcquired(_NFTId, msg.sender);
    }

    function transferNFT(uint256 _NFTId, address _buyer) public   
        onlyOwner()
        isNFTPublished(_NFTId)
        hasNFTNotYetBeenAcquired(_NFTId)
        hasNFTBeenPreAcquired(_NFTId, _buyer)
    {
        // acquires solely the NFT property
        _acquiredNFTs[_NFTId] = true;
        _nffERC721.transferFrom(this.owner(), _buyer, _NFTId);
        emit LogNFTSolelyAcquired(_NFTId, _buyer);
    }

    function isNFTAvailable(uint256 _NFTId) public view returns (bool){
        // returns if the NFT is available to acquire
        return (_nffERC721.ownerOf(_NFTId)==this.owner());
    }

    function ownerOfERC721Token(uint256 _NFTId) public view returns (address){
        // returns the owner of the ERC721 token associated with the NFT
        return _nffERC721.ownerOf(_NFTId);
    }

    function amIOwnerOf(uint256 _NFTId) public view returns (bool){
        // returns if the message sender is owner of the NFT
        if (_nffERC721.ownerOf(_NFTId)==msg.sender){
            return true;
        }
        return (_NFTShares[_NFTId][msg.sender] > 0);
    }

    function acquireSharedNFT(
        uint256 _NFTId,
        uint256[] memory _propertyPoints,
        address[] memory _buyers
    ) public payable 
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
}
