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
      const NFTId = 0
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
      const NFTId = 0
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
      const NFTId = 0
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
    it("should allow someone to acquire a published NFT for them and their friends, and its owner must be coherent", async () => {
      await instance.pause({ from: _owner})
      const tx = await instance.registerIn({ from: alice });
      console.log(tx);
    });
  });
  /*

    

    it("should allow someone to purchase an item and update state accordingly", async () => {
      await instance.addItem(name, price, { from: alice });
      var aliceBalanceBefore = await web3.eth.getBalance(alice);
      var bobBalanceBefore = await web3.eth.getBalance(bob);

      await instance.buyItem(0, { from: bob, value: excessAmount });

      var aliceBalanceAfter = await web3.eth.getBalance(alice);
      var bobBalanceAfter = await web3.eth.getBalance(bob);

      const result = await instance.fetchItem.call(0);
-
      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Sold,
        'the state of the item should be "Sold"',
      );

      assert.equal(
        result[5],
        bob,
        "the buyer address should be set bob when he purchases an item",
      );

      assert.equal(
        new BN(aliceBalanceAfter).toString(),
        new BN(aliceBalanceBefore).add(new BN(price)).toString(),
        "alice's balance should be increased by the price of the item",
      );

      assert.isBelow(
        Number(bobBalanceAfter),
        Number(new BN(bobBalanceBefore).sub(new BN(price))),
        "bob's balance should be reduced by more than the price of the item (including gas costs)",
      );
    });

    it("should error when not enough value is sent when purchasing an item", async () => {
      await instance.addItem(name, price, { from: alice });
      await catchRevert(instance.buyItem(0, { from: bob, value: 1 }));
    });

    it("should emit LogSold event when and item is purchased", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      const tx = await instance.buyItem(0, { from: bob, value: excessAmount });

      if (tx.logs[0].event == "LogSold") {
        eventEmitted = true;
      }

      assert.equal(eventEmitted, true, "adding an item should emit a Sold event");
    });

    it("should revert when someone that is not the seller tries to call shipItem()", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: price });
      await catchRevert(instance.shipItem(0, { from: bob }));
    });

    it("should allow the seller to mark the item as shipped", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Shipped,
        'the state of the item should be "Shipped"',
      );
    });

    it("should emit a LogShipped event when an item is shipped", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      const tx = await instance.shipItem(0, { from: alice });

      if (tx.logs[0].event == "LogShipped") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding an item should emit a Shipped event",
      );
    });

    it("should allow the buyer to mark the item as received", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });
      await instance.receiveItem(0, { from: bob });

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Received,
        'the state of the item should be "Received"',
      );
    });

    it("should revert if an address other than the buyer calls receiveItem()", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });

      await catchRevert(instance.receiveItem(0, { from: alice }));
    });

    it("should emit a LogReceived event when an item is received", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });
      const tx = await instance.receiveItem(0, { from: bob });

      if (tx.logs[0].event == "LogReceived") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding an item should emit a Shipped event",
      );
    });

 */

});
