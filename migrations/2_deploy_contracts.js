var NFTsForFriends = artifacts.require("./NFTsForFriends.sol");

module.exports = function(deployer) {
    deployer.deploy(NFTsForFriends);
  };
