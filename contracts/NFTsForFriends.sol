pragma solidity 0.8.2;

import "./NFTForFriendsERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTsForFriends is Ownable{
    NFF public _nffERC721 = new NFF();

    mapping (address => bool) private _registeredAddresses;
    mapping (uint256 => bool) private _acquiredNFTs;
    mapping (uint256 => uint256) private _publishedNFTs;
    mapping (uint256 => uint256) private _NFTPrices;
    mapping (uint256 => mapping (address => uint256)) private _NFTShares;

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

    constructor() Ownable () {}

    function registerIn() public {
        // registers the sender in the marketplace
        _registeredAddresses[msg.sender] = true;
    }

    function publishNFT(uint256 hashNFT, uint256 price)
        public
        returns (uint256 _NFTId){
        // publishes the NFT in the marketplace
        uint256 NFTId = _nffERC721.safeMint(this.owner());
        _publishedNFTs[hashNFT] = NFTId;
        _NFTPrices[NFTId] = price;
        return NFTId;
    }

    function acquireNFT(uint256 _NFTId) public payable 
        isRegistered(msg.sender)
        isNFTPublished(_NFTId)
        hasNFTNotYetBeenAcquired(_NFTId)
        paidEnough(_NFTPrices[_NFTId])
    {
        // acquires solely the NFT property
        _acquiredNFTs[_NFTId] = true;
        _nffERC721.safeTransferFrom(this.owner(), msg.sender, _NFTId);
    }

    function isNFTAvailable(uint256 _NFTId) public view returns (bool){
        // returns if the NFT is available to acquire
        return (_nffERC721.ownerOf(_NFTId)!=address(0) && _nffERC721.ownerOf(_NFTId)==this.owner());
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
    }
}
