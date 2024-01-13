// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiSender {
    address public owner;
    IERC20 public token; // ERC20 token to send

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function sendTokens(address[] memory _recipients, uint256[] memory _amounts) external onlyOwner {
        require(_recipients.length == _amounts.length, "Arrays length mismatch");

        for (uint256 i = 0; i < _recipients.length; i++) {
            token.transfer(_recipients[i], _amounts[i]);
        }
    }

    function withdrawTokens(uint256 _amount) external onlyOwner {
        token.transfer(owner, _amount);
    }
}
