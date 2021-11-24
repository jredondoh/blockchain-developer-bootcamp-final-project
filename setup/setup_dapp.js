var NFTsForFriends = artifacts.require(".build/contracts/NFTsForFriends");

module.exports = async function(callback) {
  const owner = "0x8435Cc4C5dFF66BDD66b79A45fc4Df8a7a1de704"
  const hash1 = 1
  const hash1Price = 101
  const hash2 = 2
  const hash2Price = 102
  const hash3 = 3
  const hash3Price = 103
  const hash4 = 4
  const hash4Price = 104
  const cakeToken = await NFTsForFriends.deployed()
  console.log(cakeToken.address)

  await cakeToken.publishNFT(hash1,hash1Price, {from: owner});
  const i1 = await cakeToken.getNFTId.call(hash1);
  console.log(i1);
  await cakeToken.publishNFT(hash2,hash2Price, {from: owner});
  const i2 = await cakeToken.getNFTId.call(hash2);
  console.log(i2);

  await cakeToken.publishNFT(hash3,hash3Price, {from: owner});
  const i3 = await cakeToken.getNFTId.call(hash3);
  console.log(i3);

  await cakeToken.publishNFT(hash4,hash4Price, {from: owner});
  const i4 = await cakeToken.getNFTId.call(hash4);
  console.log(i4);

  console.log("SETUP FINISHED. Press Ctrl+C to continue.");
}