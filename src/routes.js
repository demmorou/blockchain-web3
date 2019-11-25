const express = require('express');
const routes = express.Router();
const InputDataDecoder = require('ethereum-input-data-decoder');

require('dotenv/config');

var Web3 = require('web3');
var web3 = new Web3('ws://localhost:8545');

const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "string"
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
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	}
]
const decoder = new InputDataDecoder(ABI);
var CoursesContract = new web3.eth.Contract(ABI, process.env.ADDRESS);

routes.get('/get-accounts', (req, res) => {
    web3.eth.getAccounts().then((resources) => { account = resources[0]; console.log(resources); res.send(resources)});
});

routes.get('/get-instructor', (req, res) => {
    // res.sendStatus(200);
    // CoursesContract.methods.getInstructor().call().then((err, result) => {
    //     if (err) res.send(err);
    //     else res.send(result);
    // });
});

routes.get('/get-block/:blockHash', (req, res) => {
    const blockHash = req.params.blockHash;
    web3.eth.getBlock(blockHash).then((result) => {
        res.send(result);
    });
});

routes.post('/set-instructor', (req, res) => {
    CoursesContract.methods.setInstructor(req.body.name, req.body.age).send({ from: '0xCDB99309567ad0AbF3415d00d8cb6F34C1c01568' })
    .then(receipt => {
        res.send(receipt);
    });
});

routes.get('/get-transaction/:transactionHash', (req, res) => {
    const transactionHash = req.params.transactionHash;
    web3.eth.getTransaction(transactionHash, (err, result) => {
		const info = decoder.decodeData(result.input);
		console.log(info.inputs);
        res.send(info);
    });
});

module.exports = routes;