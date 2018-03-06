import ether from '../node_modules/zeppelin-solidity/test/helpers/ether'
import { advanceBlock } from '../node_modules/zeppelin-solidity/test/helpers/advanceToBlock'
import { increaseTimeTo, duration } from '../node_modules/zeppelin-solidity/test/helpers/increaseTime'
import latestTime from '../node_modules/zeppelin-solidity/test/helpers/latestTime'
import EVMRevert from '../node_modules/zeppelin-solidity/test/helpers/EVMRevert'

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const XdacToken = artifacts.require('XdacToken')
const XdacTokenCrowdsale = artifacts.require('XdacTokenCrowdsale')
const RefundVault = artifacts.require('RefundVault')

contract('XdacTokenCrowdsale', function ([owner, wallet, investor]) {

  const goals = [
    ether(5),
    ether(10),
    ether(15),
    ether(20),
    ether(25)
  ]

  const rates = [
    new BigNumber(12500),
    new BigNumber(12000),
    new BigNumber(11500),
    new BigNumber(11000),
    new BigNumber(10500),
  ]
  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {

    this.token = await XdacToken.new({ from: owner });
    this.vault = await RefundVault.new(wallet, { from: owner });
    this.crowdsale = await XdacTokenCrowdsale.new(
      wallet, this.token.address, goals, rates
    );
    await this.token.transferOwnership(this.crowdsale.address);
    await this.vault.transferOwnership(this.crowdsale.address);
  });

  it('should create crowdsale with correct parameters', async function () {
    this.crowdsale.should.exist;
    this.token.should.exist;
    const rate = await this.crowdsale.rate();
    const walletAddress = await this.crowdsale.wallet();
    const cap = await this.crowdsale.cap();
    rate.should.be.bignumber.equal(rates[0]);
    walletAddress.should.be.equal(wallet);
    cap.should.be.bignumber.equal(goals[4]);
  });

  it('should not accept less then 0.1 ether', async function () {
    await this.crowdsale.send(ether(0.09)).should.be.rejectedWith(EVMRevert);
    await this.crowdsale.buyTokens(investor, { from: investor, value: ether(0.09) }).should.be.rejectedWith(EVMRevert);
  });

  it('check rounds rates', async function () {
    (await this.crowdsale.getCurrentRate()).should.be.bignumber.equal(rates[0])
    await this.crowdsale.send(goals[1]);
    (await this.crowdsale.getCurrentRate()).should.be.bignumber.equal(rates[1]);
    await this.crowdsale.send(goals[2]-goals[1]);
    (await this.crowdsale.getCurrentRate()).should.be.bignumber.equal(rates[2]);
    await this.crowdsale.send(goals[3]-goals[2]);
    (await this.crowdsale.getCurrentRate()).should.be.bignumber.equal(rates[3]);
    await this.crowdsale.send(goals[4]-goals[3]);
    (await this.crowdsale.getCurrentRate()).should.be.bignumber.equal(rates[4]);
  });

  it('should reject payments over cap', async function () {
    await this.crowdsale.send(goals[4]);
    await this.crowdsale.send(1).should.be.rejectedWith(EVMRevert);
  });
  //
  // it('should allow withdraw tokens after cap is reached', async function () {
  //
  // });
  //
  //
  // it('should accept payments during the sale', async function () {
  //
  // });

});
