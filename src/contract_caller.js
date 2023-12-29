const TronWeb = require('tronweb');

// Configuring TronWeb with Shasta testnet
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
});

// Contract details
const contractAddress = 'TNqxjGeThzzL1UZXLCsd7f4Y8qzyL8uTj3';
const contractAbi =
    [{"inputs":[{"internalType":"uint256","name":"initialBalance","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"TransferXibo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UpdateXibo","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"internalType":"bool","name":"sufficient","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];    // ... // Replace with the actual ABI of the contract;

// Wallet details
const privateKey = 'caeea37fc3a98da34176647e7c33d3e9c5242203eabd213d95d314887ffcd8ae'; // Replace with your private key

// Interact with the contract
async function interactWithContract() {
    const contract = await tronWeb.contract(contractAbi, contractAddress);

    if (!contract) {
        return;
    }

    // Example: Call a read-only function
    // contract.sendCoin(contractAddress, 10).send({
    //     feeLimit: 100000000,
    //     callValue: 0,
    //     shouldPollResponse: true,
    // }, (err, transaction) => {
    //     if (err) {
    //         console.error('Error:', err);
    //     } else {
    //         console.log('Transaction:', transaction);
    //     }
    // });
    contract.sendBalance(contractAddress, 10).send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: true,
    }, (err, transaction) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Transaction:', transaction);
        }
    });
    

    // Example: Send a transaction to a state-changing function
    // const transaction = await contract.someStateChangingFunction().send({
    //     feeLimit: 1_000_000,
    //     callValue: 0,
    //     shouldPollResponse: true, // Wait for transaction confirmation
    // }).catch(error => {
    //     console.error('Error sending transaction:', error);
    // });
    //
    // console.log('Transaction result:', transaction);
}

// Unlock the wallet using the private key
async function unlockWallet() {
    await tronWeb.setPrivateKey(privateKey);
    const address = tronWeb.address.fromPrivateKey(privateKey);
    console.log('Wallet unlocked for address:', address);
}

// Main function
async function main() {
    await unlockWallet();
    await interactWithContract();
}

main();
