// contract address on blockchain:
const scAddress = '0x6fE8866acE74735466E14A89Fc76dD73f65590bE'

const scAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_nffAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "LogAddressRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_propertyPoints",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "_buyers",
        "type": "address[]"
      }
    ],
    "name": "LogNFTAcquired",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      }
    ],
    "name": "LogNFTPublished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_buyer",
        "type": "address"
      }
    ],
    "name": "LogNFTSolelyAcquired",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback",
    "payable": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registerIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isAddressRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hashNFT",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "publishNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hashNFT",
        "type": "uint256"
      }
    ],
    "name": "getNFTId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hashNFT",
        "type": "uint256"
      }
    ],
    "name": "getNFTPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      }
    ],
    "name": "acquireNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      }
    ],
    "name": "isNFTAvailable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      }
    ],
    "name": "amIOwnerOf",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_NFTId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_propertyPoints",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "_buyers",
        "type": "address[]"
      }
    ],
    "name": "acquireSharedNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
]

const NFT1hash = 11
const NFT2hash = 22
const NFT3hash = 33
const NFT4hash = 44

// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

window.addEventListener('load', function () {

  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
    } else {
      console.log('window.ethereum.isMetaMask != true')
      alert('MetaMask is not available')
    }
  } else {
    console.log('window.ethereum is not found')
    alert('MetaMask is not available')
  }
})



// Grabbing the button object,  

const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account. 
// 
// typically we only request access to MetaMask when we
// need the user to do something, but this is just for
// an example

mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts' })
}

const scRegisterIn = document.getElementById('sc-register-in')
const bcStateRead = document.getElementById('bc-state-read')

scRegisterIn.onclick = async () => {
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  await smartContract.methods.registerIn().send({ from: ethereum.selectedAddress })
}

const nft1Acquire = document.getElementById('nft1-acquire')
const nft1AcquireShared = document.getElementById('nft1-acquire-shared')
const nft1AcquireSharedInput = document.getElementById('nft1-acquire-shared-input')

const nft2Acquire = document.getElementById('nft2-acquire')
const nft2AcquireShared = document.getElementById('nft2-acquire-shared')
const nft2AcquireSharedInput = document.getElementById('nft2-acquire-shared-input')

const nft3Acquire = document.getElementById('nft3-acquire')
const nft3AcquireShared = document.getElementById('nft3-acquire-shared')
const nft3AcquireSharedInput = document.getElementById('nft3-acquire-shared-input')

const nft4Acquire = document.getElementById('nft4-acquire')
const nft4AcquireShared = document.getElementById('nft4-acquire-shared')
const nft4AcquireSharedInput = document.getElementById('nft4-acquire-shared-input')

bcStateRead.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  var registered = await smartContract.methods.isAddressRegistered(ethereum.selectedAddress).call()

  if (registered) {
    scRegisterIn.innerHTML = "REGISTERED"
    scRegisterIn.disabled = true
  } else {
    scRegisterIn.innerHTML = "Register in Dapp"
    scRegisterIn.disabled = false
  }

  var nft1Id = await smartContract.methods.getNFTId(NFT1hash).call()
  var nft1Price = await smartContract.methods.getNFTPrice(NFT1hash).call()
  var isNft1Mine = await smartContract.methods.amIOwnerOf(nft1Id).call({ from: ethereum.selectedAddress })

  const nft1Info = document.getElementById('nft1-info')
  nft1Info.innerHTML = "<b>NFT1</b> Hash =" + NFT1hash + "<br>Price = " + nft1Price + "wei"
  if (isNft1Mine) {
    nft1Info.innerHTML = nft1Info.innerHTML + "<br><b>IS YOURS!!</b> Congratulations!!!"

  }

  var nft1Available = await smartContract.methods.isNFTAvailable(nft1Id).call()
  if (nft1Available) {
    nft1Acquire.disabled = false
    nft1AcquireShared.disabled = false
    nft1AcquireSharedInput.disabled = false
  } else {
    nft1Acquire.disabled = true
    nft1AcquireShared.disabled = true
    nft1AcquireSharedInput.disabled = true
  }

  var nft2Id = await smartContract.methods.getNFTId(NFT2hash).call()
  var nft2Price = await smartContract.methods.getNFTPrice(NFT2hash).call()
  var isNft2Mine = await smartContract.methods.amIOwnerOf(nft2Id).call({ from: ethereum.selectedAddress })

  const nft2Info = document.getElementById('nft2-info')
  nft2Info.innerHTML = "<b>NFT2</b> Hash =" + NFT2hash + "<br>Price = " + nft2Price + "wei"
  if (isNft2Mine) {
    nft2Info.innerHTML = nft2Info.innerHTML + "<br><b>IS YOURS!!</b> Congratulations!!!"

  }

  var nft2Available = await smartContract.methods.isNFTAvailable(nft2Id).call()
  if (nft2Available) {
    nft2Acquire.disabled = false
    nft2AcquireShared.disabled = false
    nft2AcquireSharedInput.disabled = false
  } else {
    nft2Acquire.disabled = true
    nft2AcquireShared.disabled = true
    nft2AcquireSharedInput.disabled = true
  }

  var nft3Id = await smartContract.methods.getNFTId(NFT3hash).call()
  var nft3Price = await smartContract.methods.getNFTPrice(NFT3hash).call()
  var isNft3Mine = await smartContract.methods.amIOwnerOf(nft3Id).call({ from: ethereum.selectedAddress })

  const nft3Info = document.getElementById('nft3-info')
  nft3Info.innerHTML = "<b>NFT3</b> Hash =" + NFT3hash + "<br>Price = " + nft3Price + "wei"
  if (isNft3Mine) {
    nft3Info.innerHTML = nft3Info.innerHTML + "<br><b>IS YOURS!!</b> Congratulations!!!"

  }

  var nft3Available = await smartContract.methods.isNFTAvailable(nft3Id).call()
  if (nft3Available) {
    nft3Acquire.disabled = false
    nft3AcquireShared.disabled = false
    nft3AcquireSharedInput.disabled = false
  } else {
    nft3Acquire.disabled = true
    nft3AcquireShared.disabled = true
    nft3AcquireSharedInput.disabled = true
  }

  var nft4Id = await smartContract.methods.getNFTId(NFT4hash).call()
  var nft4Price = await smartContract.methods.getNFTPrice(NFT4hash).call()
  var isNft4Mine = await smartContract.methods.amIOwnerOf(nft4Id).call({ from: ethereum.selectedAddress })

  const nft4Info = document.getElementById('nft4-info')
  nft4Info.innerHTML = "<b>NFT4</b> Hash =" + NFT4hash + "<br>Price = " + nft4Price + "wei"
  if (isNft4Mine) {
    nft4Info.innerHTML = nft4Info.innerHTML + "<br><b>IS YOURS!!</b> Congratulations!!!"

  }

  var nft4Available = await smartContract.methods.isNFTAvailable(nft4Id).call()
  if (nft4Available) {
    nft4Acquire.disabled = false
    nft4AcquireShared.disabled = false
    nft4AcquireSharedInput.disabled = false
  } else {
    nft4Acquire.disabled = true
    nft4AcquireShared.disabled = true
    nft4AcquireSharedInput.disabled = true
  }

}

nft1Acquire.onclick = async () => {
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  var nft1Id = await smartContract.methods.getNFTId(NFT1hash).call()
  var nft1Price = await smartContract.methods.getNFTPrice(NFT1hash).call()

  await smartContract.methods.acquireNFT(nft1Id).send({ from: ethereum.selectedAddress, value: nft1Price })
}

nft1AcquireShared.onclick = async () => {
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  var nft1Id = await smartContract.methods.getNFTId(NFT1hash).call()
  var nft1Price = await smartContract.methods.getNFTPrice(NFT1hash).call()

  const friendToShare = nft1AcquireSharedInput.value;
  if (friendToShare == "") {
    alert("Please, provide friend's address to acquired shared NFT.")
  } else {
    let propertyPoints = [1, 1]
    let nftSharedOwners = [ethereum.selectedAddress, friendToShare]

    await smartContract.methods.acquireSharedNFT(nft1Id, propertyPoints, nftSharedOwners).send({ from: ethereum.selectedAddress, value: nft1Price })
  }
  nft1AcquireSharedInput.value = ""
}