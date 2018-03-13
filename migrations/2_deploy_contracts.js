const XdacTokenCrowdsale = artifacts.require("./XdacTokenCrowdsale.sol")
const BigNumber = web3.BigNumber;

function ether(n) {
  return new BigNumber(web3.toWei(n, 'ether'));
}

module.exports = function(deployer, network, accounts) {

  // const goals = [
  //   ether(1400),
  //   ether(9900),
  //   ether(18400),
  //   ether(26900),
  //   ether(35400)
  // ]
  // const minContribution = 0.1
  //
  // const rates = [
  //   new BigNumber(12500),
  //   new BigNumber(12000),
  //   new BigNumber(11500),
  //   new BigNumber(11000),
  //   new BigNumber(10500),
  // ]

  const goals = [
    ether(0.5),
    ether(1),
    ether(1.5),
    ether(2),
    ether(2.5)
  ]

  const rates = [
    new BigNumber(12500),
    new BigNumber(12000),
    new BigNumber(11500),
    new BigNumber(11000),
    new BigNumber(10500)
  ]

  const minContribution = 0.001

  const wallet = accounts[0]

  deployer.deploy(
    XdacTokenCrowdsale, wallet, goals, rates, ether(minContribution)
  );

};
