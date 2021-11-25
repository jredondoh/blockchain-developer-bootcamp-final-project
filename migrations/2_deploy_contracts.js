var NFF = artifacts.require("./NFF");
var NFTsForFriends = artifacts.require("./NFTsForFriends");

module.exports = async (deployer) => {
  await deployer.deploy(NFF);
  const instanceNFF = await NFF.deployed();
  await deployer.deploy(NFTsForFriends, instanceNFF.address);
  const instanceNFTsForFriends = await NFTsForFriends.deployed();
  await instanceNFF.setApprovalForAll(instanceNFTsForFriends.address, true);
  await instanceNFF.transferOwnership(NFTsForFriends.address);
};