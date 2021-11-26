var NFTsForFriends = artifacts.require(".build/contracts/NFTsForFriends");

module.exports = async function(callback) {
  const owner = "0xa555b99039CF935b8ea5D7c1872d1956B8E04D86"
  const nft1hash = 11
  const nft1Price = 101000000
  const nft2hash = 22
  const nft2Price = 102000000
  const nft3hash = 33
  const nft3Price = 103000000
  const nft4hash = 44
  const nft4Price = 104000000
  const instance = await NFTsForFriends.at("0x6e28AC3b67a4aE5A38d643B1323465091cbF2f84")
  console.log(instance.address)

  await instance.publishNFT(nft1hash,nft1Price, {from: owner});
  const i1 = await instance.getNFTId.call(nft1hash);
  console.log("id:" + i1);
  console.log("hash:" + nft1hash);
  await instance.publishNFT(nft2hash,nft2Price, {from: owner});
  const i2 = await instance.getNFTId.call(nft2hash);
  console.log("id:" + i2);
  console.log("hash:" + nft2hash);
  
  await instance.publishNFT(nft3hash,nft3Price, {from: owner});
  const i3 = await instance.getNFTId.call(nft3hash);
  console.log("id:" + i3);
  console.log("hash:" + nft3hash);

  await instance.publishNFT(nft4hash,nft4Price, {from: owner});
  const i4 = await instance.getNFTId.call(nft4hash);
  console.log("id:" + i4);
  console.log("hash:" + nft4hash);
  

  console.log("SETUP FINISHED. Press Ctrl+C to continue.");
}