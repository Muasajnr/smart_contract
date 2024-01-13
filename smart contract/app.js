const express = require('express');
const ethers = require('ethers');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

// Load the compiled contract artifacts
try {
    const contractArtifacts = JSON.parse(fs.readFileSync('MultiSender.json', 'utf8'));
    const contractABI = contractArtifacts.abi;
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


} catch (error) {
    console.error('Error loading contract artifacts:', error.message);
    process.exit(1); // Exit the application with an error code
}



// Connect to Ethereum node
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/0313adaf9afa4f939d83af53fc82cf99');
const wallet = new ethers.Wallet('ceed5dd020aa778951a663160e8537a816fb0cf3cb0978a0d18992b1dfec1ff8', provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Endpoint to send tokens
app.post('/sendTokens', async (req, res) => {
    const { recipients, amounts } = req.body;

    const overrides = {
        gasLimit: 3000000, 
    };

    try {
        const transaction = await contract.sendTokens(recipients, amounts, overrides);
        res.json({ success: true, transactionHash: transaction.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
