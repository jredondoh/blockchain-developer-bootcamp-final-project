pragma solidity ^0.8;

contract NFTsForFriends {
    modifier isRegistered(){
        // checks that the sender is registered
    }

    modifier isNFTPublished(uint256 _NFTId){
        // checks that the NFT is published
    }

    modifier isNFTNotYetAcquired(uint256 _NFTId){
        // checks that the NFT has not been acquired yet
    }

    function registerIn() public {
        // registers the sender in the marketplace
    }

    function publishNFT(uint256 hashNFT, uint256 price)
        public
        returns (uint256 _NFTId){
        // publishes the NFT in the marketplace
    }

    function acquireNFT(uint256 _NFTId) public payable {
        // acquires solely the NFT property
    }

    function isNFTAvailable(uint256 _NFTId) public view {
        // returns if the NFT is available to acquire
    }

    function acquireSharedNFT(
        uint256 _NFTId,
        uint256[] memory _propertyPoints,
        address[] memory _buyers
    ) public payable {
        // acquires the NFT as a shared property
    }
}
