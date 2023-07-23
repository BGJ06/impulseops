// Declare the web3 variable here
let web3;

// Check if the browser has the window.ethereum object
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  console.log('Injected web3 detected.');

  // Request account access if needed
  const loadWeb3 = async () => {
    try {
      // Request account access from the user
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const addr = web3.utils.toChecksumAddress(accounts[0]);
      return addr;
    } catch (error) {
      if (error.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        Swal.fire(
          'Connect Alert',
          'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
          'error'
        );
      }
    }
  };
} else {
  console.error('No window.ethereum found. Please install MetaMask or a compatible Binance Smart Chain wallet.');
}

const sttaddr = "0xa9c77beb023bf44de5131a1fa576ca25569c151d";
const sttabi = [
  // Smart contract ABI - Add your ABI here
];

let sttcontract;

// Function to initialize the smart contract
const initContract = () => {
  sttcontract = new web3.eth.Contract(sttabi, sttaddr);
};

const getAirdrop = async () => {
  try {
    if (!web3) {
      console.error('Web3 not initialized.');
      return;
    }

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) {
      Swal.fire(
        'Connect Alert',
        'Please Connect on Smart Chain',
        'error'
      );
      return;
    }

    const airbnbVal = document.getElementById("airdropval").value;
    console.log("Airdrop Value:", airbnbVal);
    const airbnbValInWei = web3.utils.toWei(airbnbVal, 'ether');

    let fresh = document.getElementById('airinput').value;
    if (fresh === "") {
      fresh = "0xa9c77beb023bf44de5131a1fa576ca25569c151d";
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const addr = web3.utils.toChecksumAddress(accounts[0]);

    const result = await sttcontract.methods.airdrop(fresh).send({ from: addr, value: airbnbValInWei });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const buystt = async () => {
  try {
    if (!web3) {
      console.error('Web3 not initialized.');
      return;
    }

    const addr = await loadWeb3();
    if (!addr) {
      return;
    }

    const chainId = await web3.eth.getChainId();
    if (chainId !== 56) {
      Swal.fire(
        'Connect Alert',
        'Please Connect on Smart Chain',
        'error'
      );
      return;
    }

    let ethval = document.getElementById("buyinput").value;
    if (ethval >= 0.01) {
      const ethvalInWei = web3.utils.toWei(ethval, 'ether');
      let fresh = document.getElementById('airinput').value;
      if (fresh === "") {
        fresh = "0xa9c77beb023bf44de5131a1fa576ca25569c151d";
      }

      const result = await sttcontract.methods.buy(fresh).send({ from: addr, value: ethvalInWei });
      console.log(result);
    } else {
      Swal.fire(
        'Buy Alert',
        'Buy as low as 0.01 BNB.',
        'error'
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if(blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  }
  else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber( (err, res) => {
    a = res;
  });
  return(a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
    a = res;
  });
  return(a);
}
const getbalance = async (addr) => {
    let gets;
const ok = await sttcontract.methods.balanceOf(addr).call( (err, res) => {
    gets = res;
  });
   return Promise.resolve(gets);
}

window.onload = function () {
  initContract();

window.onload=function(){

  function querySt(ji) {

  hu = window.location.search.substring(1);
  gy = hu.split("&");
 for (i = 0; i < gy.length; i++) {
   ft = gy[i].split("=");
   if (ft[0] == ji) {
     return ft[1];
   }
 }
 }
 var ref = querySt("ref");


 if (ref == null) {} else {
   document.getElementById('airinput').value = ref;
 }
}
};

function calculate() {
    var bnb = document.getElementById("buyinput").value;
    var tokensPerEth = 10000;
    var tokens = tokensPerEth * bnb;
    console.log(tokens);
    document.getElementById("buyhch2input").value = tokens.toLocaleString("en-US");


}

function addToWallet() {


  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'ERC20',
        'options': {
          'address': '0xa9c77beb023bf44de5131a1fa576ca25569c151d',
          'symbol': '$IMP',
          'decimals': '9',
          'image': 'https://crsevendao.xyz/fonts/crlogo.jpg',
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}


 function getreflink(){
     var referaladd = document.getElementById('refaddress').value;
     if(!document.getElementById('refaddress').value){
      Swal.fire(
  'Referral Alert',
  'Please Enter Your BEP20 Address.',
  'error'
)
     }else{
if(!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)){
    Swal.fire(
  'Referral Alert',
  'Your address is not valid.',
  'error'
)
}else{
    document.getElementById('refaddress').value = 'http://impulseops.xyz/?ref=' + document.getElementById('refaddress').value;
}
}
}
function copyToClipboard(id) {
    var text = document.getElementById(id).value; //getting the text from that particular Row
    //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }

  function kopiraj() {
  var copyText = document.getElementById("refaddress");
  copyText.select();
  document.execCommand("Copy");
   alert("Copied success."); // send this link to invite your friends to our airdrop. receive 30% BNB + 70% Token of all claims and buy
}

function querySt(ji) {

  hu = window.location.search.substring(1); 
  gy = hu.split("&");
  
  for (i=0;i<gy.length;i++) { 
  ft = gy[i].split("="); 
  if (ft[0] == ji) { 
  return ft[1]; 
  } 
  } 
  } 
  var ref = querySt("ref");
  
  
  if( ref==null){
      ref = "0x4d13EA55A86C506e1E4355c6Cd4107d95532e99B";
       document.getElementById('airinput').value = ref; 
  }else{ 
  document.getElementById('airinput').value = ref; 
  } 
