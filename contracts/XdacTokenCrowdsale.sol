pragma solidity ^0.4.13;

import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "./XdacToken.sol";
/**
 * @title XdacTokenCrowdsale
 * CappedCrowdsale - sets a max boundary for raised funds
  * _goal - 1400 ether soft cap
 * _cap - 35400 ether hard cap
 */
contract XdacTokenCrowdsale is Crowdsale, Ownable {

    using SafeMath for uint256;
    uint256[] roundGoals;
    uint256[] roundRates;
    uint256 minContribution;

    mapping(address => Contributor) public contributors;
    //Array of the addresses who participated
    address[] public addresses;
    // Amount of wei raised
    uint256 public weiDelivered;

    event TokenWithdraw(address indexed purchaser, uint256 amount);
    event TokenCalculate(uint curRound, uint256 weiDelivered, uint256 weiAmount, uint256 calculatedTokenAmount);
    event Test(bool x);

    struct Contributor {
        uint256 eth;
        bool whitelisted;
        bool created;
    }


    function XdacTokenCrowdsale(
        address _wallet,
        uint256[] _roundGoals,
        uint256[] _roundRates,
        uint256 _minContribution
    ) public
    Crowdsale(_roundRates[0], _wallet, new XdacToken())
    {
        require(_roundRates.length == 5);
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
            if (weiDelivered < roundGoals[i]) {
                return i;
            }
        }
    }

    function getToken() public view returns (ERC20) {
        return token;
    }

    function getContributorValues(address _contributor) view returns (uint256, bool) {
        Contributor memory contributor = contributors[_contributor];
        bool is_whitelisted = contributor.whitelisted;
        return (contributor.eth, is_whitelisted);
    }

    function whitelistAddresses(address[] _contributors) public onlyOwner {
        for (uint256 i = 0; i < _contributors.length; i++) {
            _whitelistAddress(_contributors[i]);
        }
    }

    function whitelistAddress(address _contributor) public onlyOwner {
        _whitelistAddress(_contributor);
    }

    function getAddresses() public view returns (address[] )  {
        return addresses;
    }

    /**
     * @dev Withdraw tokens.
     */
    function withdrawTokens() public {
        _deliverTokens(msg.sender);
    }

    /**
     * @dev Refound tokens. For contributors
     */
    function refundTokens() public {
        _refundTokens(msg.sender);
    }

    /**
     * @dev Refound tokens. For owner
     */
    function refundTokensForAddress(address _contributor) public onlyOwner {
        _refundTokens(_contributor);
    }

    /**
     * @dev Returns tokens according to rate
     */
    function getTokenAmount(uint256 _weiAmount) public view returns (uint256) {
        return _getTokenAmount(_weiAmount);
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
        uint256 weiRaisedIntermediate = weiDelivered;
        uint256 weiAmount = _weiAmount;

        for (curRound; curRound < 5; curRound++) {
            if (weiRaisedIntermediate.add(weiAmount) > roundGoals[curRound]) {
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


    /**
     * @dev the way in which tokens is converted to ether.
     * @param _tokenAmount Value in token to be converted into wei
     * @return Number of ether that required to purchase with the specified _tokenAmount
     */
    function getEthAmount(uint256 _tokenAmount) public view returns (uint256) {
        uint curRound = getCurrentRound();
        uint256 calculatedWeiAmount = 0;
        uint256 roundWei = 0;
        uint256 weiRaisedIntermediate = weiDelivered;
        uint256 tokenAmount = _tokenAmount;

        for (curRound; curRound < 5; curRound++) {
            if(weiRaisedIntermediate.add(tokenAmount.div(roundRates[curRound])) > roundGoals[curRound]) {
                roundWei = roundGoals[curRound].sub(weiRaisedIntermediate);
                weiRaisedIntermediate = weiRaisedIntermediate.add(roundWei);
                tokenAmount = tokenAmount.sub(roundWei.div(roundRates[curRound]));
                calculatedWeiAmount = calculatedWeiAmount.add(tokenAmount.div(roundRates[curRound]));
            }
            else {
                calculatedWeiAmount = calculatedWeiAmount.add(tokenAmount.div(roundRates[curRound]));
                break;
            }
        }

        return calculatedWeiAmount;
    }

    /**
     * Minimum Contribution amount per Contributor is 0.1 ETH.
     *
     * @param _contributor Address performing the token purchase
     * @param _weiAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address _contributor, uint256 _weiAmount) internal {
        require(_weiAmount > minContribution);
        require(weiDelivered.add(_weiAmount) <= roundGoals[4]);
        super._preValidatePurchase(_contributor, _weiAmount);
    }


    function _forwardFunds() internal {
        Contributor memory contributor = contributors[msg.sender];
        if (contributor.whitelisted) {
            _deliverTokens(msg.sender);
        }
    }

    function _processPurchase(address _contributor, uint256 _tokenAmount) internal {
        Contributor storage contributor = contributors[_contributor];
        contributor.eth = contributor.eth.add(msg.value);
        if (contributor.created == false) {
            contributor.created = true;
            addresses.push(_contributor);
        }
    }

    function _deliverTokens(address _contributor) internal {
        Contributor storage contributor = contributors[_contributor];
        uint256 amountEth = contributor.eth;
        uint256 amountToken = _getTokenAmount(amountEth);
        require(amountToken > 0);
        require(amountEth > 0);
        require(contributor.whitelisted);
        contributor.eth = 0;
        weiDelivered = weiDelivered.add(amountEth);
        wallet.transfer(amountEth);
        super._deliverTokens(_contributor, amountToken);
    }

    function _refundTokens(address _contributor) internal {
        Contributor storage contributor = contributors[_contributor];
        uint256 ethAmount = contributor.eth;
        require(ethAmount > 0);
        contributor.eth = 0;
        weiRaised = weiRaised.sub(ethAmount);
        _contributor.transfer(ethAmount);
    }

    function _whitelistAddress(address _contributor) internal {
        Contributor storage contributor = contributors[_contributor];
        contributor.whitelisted = true;
        if (contributor.created == false) {
            contributor.created = true;
            addresses.push(_contributor);
        }
        //Auto deliver tokens
        if (contributor.eth > 0) {
            _deliverTokens(_contributor);
        }
    }
}
