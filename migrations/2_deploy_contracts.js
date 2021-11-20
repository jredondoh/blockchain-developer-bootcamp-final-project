var NFF = artifacts.require("./NFF");
var NFTsForFriends = artifacts.require("./NFTsForFriends");

module.exports = async (deployer) => {
  await deployer.deploy(NFF);
  await deployer.deploy(NFTsForFriends, NFF.address);
  const instance = await NFF.deployed();
  await instance.setApprovalForAll(instance.address, true);
  await instance.transferOwnership(NFTsForFriends.address);
};