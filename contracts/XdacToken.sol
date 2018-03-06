pragma solidity ^0.4.13;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract XdacToken is StandardToken, Ownable {
    string public name = "xDAC COIN";
    string public symbol = "XDAC";
    uint8 public decimals = 18;
    uint256 totalSupply_ = 1000000000;
}
