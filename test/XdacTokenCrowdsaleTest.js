import ether from '../node_modules/zeppelin-solidity/test/helpers/ether'
import { advanceBlock } from '../node_modules/zeppelin-solidity/test/helpers/advanceToBlock'
import EVMRevert from '../node_modules/zeppelin-solidity/test/helpers/EVMRevert'

const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const XdacTokenCrowdsale = artifacts.require('XdacTokenCrowdsale')
const XdacToken = artifacts.require('XdacToken')

contract('XdacTokenCrowdsale', function ([owner, wallet, investor]) {

  const goals = [
    ether(0.05),
    ether(0.10),
    ether(0.15),
    ether(0.20),
    ether(0.25)
  ]

  const rates = [
    new BigNumber(12500),
    new BigNumber(12000),
    new BigNumber(11500),
    new BigNumber(11000),
    new BigNumber(10500)
  ]

  const minContribution = 0.001

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock()
  })

  beforeEach(async function () {
    this.crowdsale = await XdacTokenCrowdsale.new(
      wallet, goals, rates, ether(minContribution)
    )
  })

  it('should create crowdsale with correct parameters', async function () {

    this.crowdsale.should.exist
    const rate = await this.crowdsale.rate()
    const walletAddress = await this.crowdsale.wallet()
    const cap = await this.crowdsale.cap()
    rate.should.be.bignumber.equal(rates[0])
    walletAddress.should.be.equal(wallet)
    cap.should.be.bignumber.equal(goals[4])
  })

  it('should not accept less then '+minContribution+' ether', async function () {
    await this.crowdsale.send(ether(minContribution-minContribution/2)).should.be.rejectedWith(EVMRevert)
    await this.crowdsale.buyTokens(investor, { from: investor, value: ether(minContribution-minContribution/2) }).should.be.rejectedWith(EVMRevert)
  })

  it('should reject payments over cap', async function () {
    await this.crowdsale.send(goals[4])
    await this.crowdsale.send(1).should.be.rejectedWith(EVMRevert)
  })

  it('check round pre ICO rate', async function () {
    await this.crowdsale.send(goals[0].minus(1));
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[0])
  })
  it('check round 1 rate', async function () {
    await this.crowdsale.send(goals[0].plus(1));
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[1])
  })
  it('check round 2 rate', async function () {
    await this.crowdsale.send(goals[1].plus(1))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[2])
  })
  it('check round 3 rate', async function () {
    await this.crowdsale.send(goals[2].plus(1))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[3])
  })
  it('check round 4 rate', async function () {
    await this.crowdsale.send(goals[3].plus(1))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[4])
  })

  it('should accept payments during the sale', async function () {
    const investmentAmount = ether(0.01);
    const expectedTokenAmount = rates[0].mul(investmentAmount);
    await this.crowdsale.buyTokens(investor, { value: investmentAmount, from: investor }).should.be.fulfilled;
    (await this.crowdsale.balanceOf(investor)).should.be.bignumber.equal(expectedTokenAmount);
  });

  it('should allow withdraw tokens after cap is reached', async function () {
    await this.crowdsale.buyTokens(investor, { value: goals[4], from: investor }).should.be.fulfilled;
    await this.crowdsale.withdrawTokens({ from: investor }).should.be.fulfilled;
    let token = await this.crowdsale.getToken();
    let balance = await XdacToken.at(token).balanceOf(investor)
    balance.should.be.bignumber.equal(rates[0].mul(goals[4]));
  });

})
