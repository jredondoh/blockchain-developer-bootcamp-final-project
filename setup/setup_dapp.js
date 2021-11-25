var NFTsForFriends = artifacts.require(".build/contracts/NFTsForFriends");

module.exports = async function(callback) {
  const owner = "0x76c9143276Db0aE539c115dc43f02D760A168C49"
  const nft1hash = 1
  const nft1Price = 101000000
  const nft2hash = 2
  const nft2Price = 102000000
  const nft3hash = 3
  const nft3Price = 103000000
  const nft4hash = 4
  const nft4Price = 104000000
  const cakeToken = await NFTsForFriends.at("0xa918d380b258865e5553ff9bfd27074C707Eda9f")
  console.log(cakeToken.address)

  await cakeToken.publishNFT(nft1hash,nft1Price, {from: owner});
  const i1 = await cakeToken.getNFTId.call(nft1hash);
  console.log(i1);
  await cakeToken.publishNFT(nft2hash,nft2Price, {from: owner});
  const i2 = await cakeToken.getNFTId.call(nft2hash);
  console.log(i2);

  await cakeToken.publishNFT(nft3hash,nft3Price, {from: owner});
  const i3 = await cakeToken.getNFTId.call(nft3hash);
  console.log(i3);

  await cakeToken.publishNFT(nft4hash,nft4Price, {from: owner});
  const i4 = await cakeToken.getNFTId.call(nft4hash);
  console.log(i4);

  console.log("SETUP FINISHED. Press Ctrl+C to continue.");
}