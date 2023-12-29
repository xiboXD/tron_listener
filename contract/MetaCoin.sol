// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MetaCoin {
    mapping(address => uint) balances;

    event TransferXibo(address _from, address _to, uint256 _value);
    event UpdateXibo(address _from, uint amount);

    address owner;

    constructor(uint initialBalance) {
        owner = msg.sender;
        balances[msg.sender] = initialBalance;
    }

    function sendCoin(address receiver, uint amount) public returns (bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit TransferXibo(msg.sender, receiver, amount);
        return true;
    }

    function getBalance(address addr) public view returns (uint) {
        return balances[addr];
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function sendBalance(address addr, uint amount) public returns (uint) {
        balances[addr] = 10;
        emit UpdateXibo(addr, amount);
        return balances[addr];
    }
}
