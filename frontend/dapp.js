// contract address on blockchain:
const scAddress = '0xa918d380b258865e5553ff9bfd27074C707Eda9f'

const scAbi= [
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

const NFT1hash = 1

// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

window.addEventListener('load', function() {
  
  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Is Available!'

      // add in web3 here
      var web3 = new Web3(window.ethereum)

    } else {
      console.log('MetaMask is not available')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
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
  await ethereum.request({ method: 'eth_requestAccounts'})
}

// grab the button for input to a contract:

/* const ssSubmit = document.getElementById('sc-register-in');

ssSubmit.onclick = async () => {
  // grab value from input
  
  const ssInputValue = document.getElementById('ss-input-box').value;
  console.log(ssInputValue)

  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  await smartContract.methods.registerIn().send({from: ethereum.selectedAddress})

}
 */
const scRegisterIn = document.getElementById('sc-register-in')
const bcStateRead = document.getElementById('bc-state-read')

scRegisterIn.onclick = async () => {
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  await smartContract.methods.registerIn().send({from: ethereum.selectedAddress})
}

const nft1Acquire = document.getElementById('nft1-acquire')
const nft1AcquireShared = document.getElementById('nft1-acquire-shared')
const nft1AcquireSharedInput = document.getElementById('nft1-acquire-shared-input')

bcStateRead.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  var registered = await smartContract.methods.isAddressRegistered(ethereum.selectedAddress).call()

  if (registered){
    scRegisterIn.innerHTML  = "REGISTERED"
    scRegisterIn.disabled = true
  } else{
    scRegisterIn.innerHTML  = "Register in Dapp"
    scRegisterIn.disabled = false
  }

  var nft1Id = await smartContract.methods.getNFTId(NFT1hash).call()
  var nft1Price = await smartContract.methods.getNFTPrice(NFT1hash).call()
  var isNft1Mine = await smartContract.methods.amIOwnerOf(NFT1hash).call({from: ethereum.selectedAddress})
  const nft1Info = document.getElementById('nft1-info')
  nft1Info.innerHTML = "<b>NFT1</b> Hash =" + NFT1hash + "<br>Price = " + nft1Price +"wei"
  if (isNft1Mine){
    nft1Info.innerHTML = nft1Info.innerHTML + "<br><b>IS YOURS!!</b> Congratulations!!!"

  }

  var nft1Available = await smartContract.methods.isNFTAvailable(nft1Id).call()
  if (nft1Available){
    nft1Acquire.disabled = false
    nft1AcquireShared.disabled = false
    nft1AcquireSharedInput.disabled = false
  } else{
    nft1Acquire.disabled = true
    nft1AcquireShared.disabled = true
    nft1AcquireSharedInput.disabled = true
  }

}

nft1Acquire.onclick = async () => {
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const smartContract = new web3.eth.Contract(scAbi, scAddress)
  smartContract.setProvider(window.ethereum)

  var nft1Id = await smartContract.methods.getNFTId(NFT1hash).call()
  var nft1Price = await smartContract.methods.getNFTPrice(NFT1hash).call()

  const tx = await smartContract.methods.acquireNFT(nft1Id).send({from: ethereum.selectedAddress, value: nft1Price})
  console.log(tx)
}