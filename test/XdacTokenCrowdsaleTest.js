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
    await this.crowdsale.send(goals[0].minus(ether(0.01)));
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[0])
  })

  it('check round 1 rate', async function () {
    await this.crowdsale.send(goals[0].plus(ether(0.01)));
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[1])
  })
  it('check round 2 rate', async function () {
    await this.crowdsale.send(goals[1].plus(ether(0.01)))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[2])
  })
  it('check round 3 rate', async function () {
    await this.crowdsale.send(goals[2].plus(ether(0.01)))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[3])
  })
  it('check round 4 rate', async function () {
    await this.crowdsale.send(goals[3].plus(ether(0.01)))
    let rate = await this.crowdsale.getCurrentRate()
    rate.should.be.bignumber.equal(rates[4])
  })

  it('should accept payments during the sale', async function () {
    //ROUND 0
    const expectedTokenAmount1 = rates[0].mul(ether(0.01));
    await this.crowdsale.buyTokens(investor, { value: ether(0.01), from: investor }).should.be.fulfilled;
    const balance = await this.crowdsale.balanceOf(investor);
    balance.should.be.bignumber.equal(expectedTokenAmount1);


    //ROUND 1
    const expectedTokenAmount2 = rates[0].mul(ether(0.04)).add(rates[1].mul(ether(0.01))).add(expectedTokenAmount1);
    await this.crowdsale.buyTokens(investor, { value: ether(0.05), from: investor }).should.be.fulfilled;
    const balance2 = await this.crowdsale.balanceOf(investor);
    balance2.should.be.bignumber.equal(expectedTokenAmount2);


    //ROUND 2
    const expectedTokenAmount3 = rates[1].mul(ether(0.04)).add(rates[2].mul(ether(0.01))).add(expectedTokenAmount2);
    await this.crowdsale.buyTokens(investor, { value: ether(0.05), from: investor }).should.be.fulfilled;
    const balance3 = await this.crowdsale.balanceOf(investor);
    balance3.should.be.bignumber.equal(expectedTokenAmount3);

    //ROUND 3
    const expectedTokenAmount4 = rates[2].mul(ether(0.04)).add(rates[3].mul(ether(0.01))).add(expectedTokenAmount3);
    await this.crowdsale.buyTokens(investor, { value: ether(0.05), from: investor }).should.be.fulfilled;
    const balance4 = await this.crowdsale.balanceOf(investor);
    balance4.should.be.bignumber.equal(expectedTokenAmount4);

    //ROUND 4
    const expectedTokenAmount5 = rates[3].mul(ether(0.04)).add(rates[4].mul(ether(0.01))).add(expectedTokenAmount4);
    await this.crowdsale.buyTokens(investor, { value: ether(0.05), from: investor }).should.be.fulfilled;
    const balance5 = await this.crowdsale.balanceOf(investor);
    balance5.should.be.bignumber.equal(expectedTokenAmount5);

    //ROUND 4
    const expectedTokenAmount6 = rates[4].mul(ether(0.04)).add(expectedTokenAmount5);
    await this.crowdsale.buyTokens(investor, { value: ether(0.04), from: investor }).should.be.fulfilled;
    const balance6 = await this.crowdsale.balanceOf(investor);
    balance6.should.be.bignumber.equal(expectedTokenAmount6);

  });

  it('should allow withdraw tokens after cap is reached', async function () {
    await this.crowdsale.buyTokens(investor, { value: goals[4], from: investor }).should.be.fulfilled;
    await this.crowdsale.withdrawTokens({ from: investor }).should.be.fulfilled;
    let token = await this.crowdsale.getToken();
    let balance = await XdacToken.at(token).balanceOf(investor)
    let expectedTokenAmount = new BigNumber(0);
    for (let round = 0; round < 5; round++) {
      if(round === 0) {
        expectedTokenAmount = expectedTokenAmount.add(goals[round].mul(rates[round]));
      }
      else {
        expectedTokenAmount = expectedTokenAmount.add((goals[round].minus(goals[round-1])).mul(rates[round]));
      }
    }

    balance.should.be.bignumber.equal(expectedTokenAmount);
  });

})
