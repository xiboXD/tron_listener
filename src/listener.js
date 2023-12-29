// Connect to TronLink
const TronWeb = require('tronweb');

// Configuring TronWeb with Shasta testnet
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
});

// Contract details
const contractAddress = 'TNqxjGeThzzL1UZXLCsd7f4Y8qzyL8uTj3'; // Replace with the actual contract address
const contractAbi = [{"inputs":[{"internalType":"uint256","name":"initialBalance","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"TransferXibo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UpdateXibo","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"internalType":"bool","name":"sufficient","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]; // Replace with the actual ABI of the contract

// Create a contract instance
const contract = tronWeb.contract(contractAbi, contractAddress);

// Event listener for the UpdateXibo event
contract.UpdateXibo().watch((err, event) => {
    if (err) {
        console.error('Error with "UpdateXibo" event:', err);
    } else {
        console.group('New "UpdateXibo" event received');
        console.log('- Contract Address:', event.contract);
        console.log('- Event Name:', event.name);
        console.log('- Transaction:', event.transaction);
        console.log('- Block number:', event.block);
        console.log('- Result:', event.result, '\n');
        console.groupEnd();
    }
});


