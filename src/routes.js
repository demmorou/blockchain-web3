const express = require('express');
const routes = express.Router();

var Web3 = require('web3');
var web3 = new Web3('ws://localhost:8545');

var CoursesContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructor",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	}
], '0xbBF289D846208c16EDc8474705C748aff07732dB');

routes.get('/get-accounts', (req, res) => {
    web3.eth.getAccounts().then((resources) => { account = resources[0]; console.log(resources); res.send(resources)});
});

routes.get('/get-instructor', (req, res) => {
    CoursesContract.methods.getInstructor().call().then((err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

routes.get('/get-block/:blockHash', (req, res) => {
    const blockHash = req.params.blockHash;
    web3.eth.getBlock(blockHash).then((result) => {
        res.send(result);
    });
});

routes.post('/set-instructor', (req, res) => {
    CoursesContract.methods.setInstructor(req.body.name, req.body.age).send({ from: '0x9d50beF2600F350707b40d95662b3fDf39Cb5396' })
    .then(receipt => {
        res.send(receipt);
    });
});

module.exports = routes;