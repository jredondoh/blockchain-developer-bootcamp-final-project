let BN = web3.utils.BN;
let NFTsForFriends = artifacts.require("NFTsForFriends");
let NFF = artifacts.require("NFF");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("NFTsForFriends", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const price = "1000";
  const excessAmount = "2000";
  const NFTHash = "0x12345678";

  let instance;

  beforeEach(async () => {
    instanceNFF = await NFF.new({from: _owner});
    instance = await NFTsForFriends.new(instanceNFF.address, {from: _owner});
    await instanceNFF.setApprovalForAll(instance.address,true, {from: _owner});
    await instanceNFF.transferOwnership(instance.address, {from: _owner});
  });

  describe("Variables", () => {
    it("should have an owner", async () => {
      const instanceOwner = await instance.owner.call();
      assert.equal(instanceOwner, _owner, "the contract has no owner");
    });
  });

  describe("Use cases", () => {
    it("should emit a LogAddressRegistered event when we register an user", async () => {
      let eventEmitted = false;
      const tx = await instance.registerIn({ from: alice });

      if (tx.logs[0].event == "LogAddressRegistered") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "registering an user should emit a AddressRegistered event",
      );
    });

    it("should emit a LogNFTPublished event when an NFT is published", async () => {
      let eventEmitted = false;
      const tx = await instance.publishNFT(NFTHash, price, { from: _owner });

      if (tx.logs[0].event == "LogNFTPublished") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "publishing an NFT should emit a LogNFTPublished event",
      );
    });

    it("should allow someone to publish a NFT and its owner must be coherent", async () => {
      const NFTId = 1
      await instance.publishNFT(NFTHash, price, { from: _owner });
      const available = await instance.isNFTAvailable.call(NFTId);

      assert.equal(
        available,
        true,
        'the NFT should be available',
      );

      const contractOwnerNftOwner = await instance.amIOwnerOf.call(NFTId, { from: _owner });

      assert.equal(
        contractOwnerNftOwner,
        true,
        'the contract owner should be the NFT owner',
      );

      
      const aliceNotNftOwner = await instance.amIOwnerOf.call(NFTId, { from: alice });

      assert.equal(
        aliceNotNftOwner,
        false,
        'alice should not be the NFT owner',
      );

      const actualNftOwner = await instanceNFF.ownerOf.call(NFTId, { from: alice });

      assert.equal(
        actualNftOwner,
        _owner,
        'the owner of the NFT ERC 721 token should be coherent',
      );
    });

    it("should allow someone to acquire a published NFT and its owner must be coherent", async () => {
      const NFTId = 1
      await instance.publishNFT(NFTHash, price, { from: _owner });
      await instance.registerIn({ from: alice });
      await instance.acquireNFT(NFTId, { from: alice, value: excessAmount })

      const aliceNftOwner = await instance.amIOwnerOf.call(NFTId, { from: alice });

      assert.equal(
        aliceNftOwner,
        true,
        'alice should be the NFT owner',
      );

      const actualNftOwner = await instanceNFF.ownerOf.call(NFTId);

      assert.equal(
        actualNftOwner,
        alice,
        'the owner of the NFT ERC 721 token should be coherent',
      );

    });

    it("should allow someone to acquire a published NFT for them and their friends, and its owner must be coherent", async () => {
      const NFTId = 1
      await instance.publishNFT(NFTHash, price, { from: _owner });
      await instance.registerIn({ from: alice });
      await instance.acquireSharedNFT(NFTId, [1, 1], [alice, bob], { from: alice, value: excessAmount })

      const aliceNftOwner = await instance.amIOwnerOf.call(NFTId, { from: alice });

      assert.equal(
        aliceNftOwner,
        true,
        'alice should be the NFT owner',
      );

      const bobNftOwner = await instance.amIOwnerOf.call(NFTId, { from: bob });

      assert.equal(
        bobNftOwner,
        true,
        'bob should be the NFT owner',
      );

      const actualNftOwner = await instanceNFF.ownerOf.call(NFTId);

      assert.equal(
        actualNftOwner,
        _owner,
        'the owner of the NFT ERC 721 token should still be the contract owner',
      );

    });

    it("should only allow the owner to pause the contract", async () => {
      const PREFIX = "Returned error: VM Exception while processing transaction:";
      const expectedMsg =" revert Ownable: caller is not the owner";
      try{
        await instance.pause({ from: alice})
      } catch (e) {
        assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
      }
    });

    it("should not allow someone to register in a paused contract", async () => {
      await instance.pause({ from: _owner})
      const PREFIX = "Returned error: VM Exception while processing transaction:";
      const expectedMsg =" revert Pausable: paused";
      try{
        await instance.registerIn({ from: alice });
      } catch (e) {
        assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
      }
      await instance.unpause({ from: _owner})
      await instance.registerIn({ from: alice });
    });

    it("should not allow someone to acquire a NFT in a paused contract", async () => {
      const NFTId = 1
      await instance.publishNFT(NFTHash, price, { from: _owner });
      await instance.registerIn({ from: alice });

      await instance.pause({ from: _owner})

      const PREFIX = "Returned error: VM Exception while processing transaction:";
      const expectedMsg =" revert Pausable: paused";
      try{
        await instance.acquireNFT(NFTId, { from: alice, value: excessAmount })
      } catch (e) {
        assert(e.message.startsWith(PREFIX + expectedMsg),"expected an error");
      }
    });
  });
});
