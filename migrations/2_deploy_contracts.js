const XdacTokenCrowdsale = artifacts.require("./XdacTokenCrowdsale.sol")
const XdacToken = artifacts.require("./XdacToken.sol")
const BigNumber = web3.BigNumber;

function ether(n) {
  return new BigNumber(web3.toWei(n, 'ether'));
}

module.exports = function(deployer, network, accounts) {

  const goals = [
    ether(1400),
    ether(9900),
    ether(18400),
    ether(26900),
    ether(35400)
  ]

  const rates = [
    new BigNumber(12500),
    new BigNumber(12000),
    new BigNumber(11500),
    new BigNumber(11000),
    new BigNumber(10500),
  ]

  const wallet = accounts[0]
  deployer.deploy(XdacToken)

  deployer.deploy(
    XdacTokenCrowdsale,
    wallet,
    XdacToken.address,
    goals,
    rates
  )

  XdacToken.deployed().then(function (instance) {
    instance.transferOwnership(XdacTokenCrowdsale.address)
  })

};
