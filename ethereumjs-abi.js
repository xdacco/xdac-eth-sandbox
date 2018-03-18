const abi = require('ethereumjs-abi')
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
const BigNumber = web3.BigNumber;

function  ether (n) {
  return new BigNumber(web3.toWei(n, 'ether'));
}


var res = abi.rawEncode(
  [
    'address',
    'uint256[]',
    'uint256[]',
    'uint256'
  ],
  [
    '0x315F5Ea9f407e386b45796856012c0e07068C18a',
    [
      ether('5').toString(),
      ether('10').toString(),
      ether('15').toString(),
      ether('20').toString(),
      ether('25').toString()
    ],
    [
      12500,
      12000,
      11500,
      11000,
      10500
    ],
    0.001
  ]
)
console.log(res.toString('hex'))
