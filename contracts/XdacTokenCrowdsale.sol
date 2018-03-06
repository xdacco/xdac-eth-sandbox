pragma solidity ^0.4.13;

import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/distribution/PostDeliveryCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

/**
 * @title XdacTokenCrowdsale
 * CappedCrowdsale - sets a max boundary for raised funds
 * MintedCrowdsale - Extension of Crowdsale contract whose tokens are minted in each purchase.
 * _goal - 1400 ether soft cap
 * _cap - 35400 ether hard cap
 * _openingTime - March 15, 2018
 * _closingTime - August 31, 2018
 */
contract XdacTokenCrowdsale is CappedCrowdsale {

    using SafeMath for uint256;
    uint256[] roundGoals;
    uint256[] roundRates;
    mapping(address => uint256) public balances;

    function XdacTokenCrowdsale(
        address _wallet,
        StandardToken _token,
        uint256[] _roundGoals,
        uint256[] _roundRates
    ) public
    Crowdsale(_roundRates[0], _wallet, _token)
    CappedCrowdsale(_roundGoals[4])
    {
        require(_roundRates.length == 5);
        require(_roundGoals.length == 5);
        roundGoals = _roundGoals;
        roundRates = _roundRates;
    }

    /**
     * Minimum Contribution amount per Contributor is 0.1 ETH.
     *
     * @param _beneficiary Address performing the token purchase
     * @param _weiAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        require(_weiAmount > 0.1 ether);
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }


    function getCurrentRate() public view returns (uint256) {
        if(weiRaised <= roundGoals[0])
            return roundRates[0];
        if(weiRaised <= roundGoals[1])
            return roundRates[1];
        if(weiRaised <= roundGoals[2])
            return roundRates[2];
        if(weiRaised <= roundGoals[3])
            return roundRates[3];
        if(weiRaised <= roundGoals[4])
            return roundRates[4];
        else
            return roundRates[4];
    }

    function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
        balances[_beneficiary] = balances[_beneficiary].add(_tokenAmount);
    }

    /**
     * @dev Withdraw tokens only after crowdsale ends.
     */
    function withdrawTokens() public {
        require(capReached());
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        balances[msg.sender] = 0;
        _deliverTokens(msg.sender, amount);
    }

}
