pragma solidity ^0.4.13;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract XdacToken is StandardToken, Ownable {
    string public name = "XDAC COIN";
    string public symbol = "XDAC";
    uint8 public decimals = 18;
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    function XdacToken(uint256 _initial_supply) public {
        totalSupply_ = _initial_supply;
        balances[msg.sender] = _initial_supply;
        Transfer(0x0, msg.sender, _initial_supply);
    }
}
