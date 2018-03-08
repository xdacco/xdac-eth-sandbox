pragma solidity ^0.4.13;

import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./XdacToken.sol";
/**
 * @title XdacTokenCrowdsale
 * CappedCrowdsale - sets a max boundary for raised funds
  * _goal - 1400 ether soft cap
 * _cap - 35400 ether hard cap
 */
contract XdacTokenCrowdsale is CappedCrowdsale {

    using SafeMath for uint256;
    uint256[] roundGoals;
    uint256[] roundRates;
    uint256 minContribution;
    mapping(address => uint256) public balances;
    event TokenWithdraw(address indexed purchaser, uint256 amount);
    event TokenCalculate(uint curRound, uint256 weiRaised, uint256 weiAmount, uint256 calculatedTokenAmount);

    function XdacTokenCrowdsale(
        address _wallet,
        uint256[] _roundGoals,
        uint256[] _roundRates,
        uint256 _minContribution
    ) public
    Crowdsale(_roundRates[0], _wallet, new XdacToken())
    CappedCrowdsale(_roundGoals[4])
    {
        require(_roundRates.length == 5);
        require(_roundGoals.length == 5);
        require(_roundGoals.length == 5);
        roundGoals = _roundGoals;
        roundRates = _roundRates;
        minContribution = _minContribution;
    }


    function getCurrentRate() public view returns (uint256) {
        return roundRates[getCurrentRound()];
    }

    function getCurrentRound() public view returns (uint) {
        for (uint i = 0; i < 5; i++) {
            if(weiRaised < roundGoals[i]) {
                return i;
            }
        }

    }

    function getWeiRaised() public view returns (uint256) {
        return weiRaised;
    }

    function getToken() public view returns (ERC20) {
        return token;
    }

    /**
     * @dev Withdraw tokens only after crowdsale ends.
     */
    function withdrawTokens() public {
        require(capReached());
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        balances[msg.sender] = 0;
        TokenWithdraw(msg.sender, amount);
        _deliverTokens(msg.sender, amount);
    }

    /**
    * Gets the balance of the specified address.
    * @param _owner The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    /**
     * Minimum Contribution amount per Contributor is 0.1 ETH.
     *
     * @param _beneficiary Address performing the token purchase
     * @param _weiAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        require(_weiAmount > minContribution);
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }

    /**
     * @dev the way in which ether is converted to tokens.
     * @param _weiAmount Value in wei to be converted into tokens
     * @return Number of tokens that can be purchased with the specified _weiAmount
     */
    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        uint curRound = getCurrentRound();
        uint256 calculatedTokenAmount = 0;
        uint256 roundWei = 0;
        uint256 weiRaisedIntermediate = weiRaised;
        uint256 weiAmount = _weiAmount;

        for (curRound; curRound < 5; curRound++) {
            if(weiRaisedIntermediate.add(weiAmount) > roundGoals[curRound]) {
                roundWei = roundGoals[curRound].sub(weiRaisedIntermediate);
                weiRaisedIntermediate = weiRaisedIntermediate.add(roundWei);
                weiAmount = weiAmount.sub(roundWei);
                calculatedTokenAmount = calculatedTokenAmount.add(roundWei.mul(roundRates[curRound]));
            }
            else {
                calculatedTokenAmount = calculatedTokenAmount.add(weiAmount.mul(roundRates[curRound]));
                break;
            }
            TokenCalculate(curRound, weiRaisedIntermediate, weiAmount, calculatedTokenAmount);
        }

        return calculatedTokenAmount;
    }

    function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
        balances[_beneficiary] = balances[_beneficiary].add(_tokenAmount);
    }
}
