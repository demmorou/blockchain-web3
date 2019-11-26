const express = require('express');
const routes = express.Router();
const InputDataDecoder = require('ethereum-input-data-decoder');

require('dotenv/config');

const Web3 = require('web3');
const web3 = new Web3(process.env.ADDRESS_NETWORK);

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
const CoursesContract = new web3.eth.Contract(ABI, process.env.ADDRESS);

routes.get('/get-accounts', (req, res) => {
    web3.eth.getAccounts().then((resources) => { account = resources[0]; console.log(resources); res.send(resources)});
});

routes.get('/get-block/:blockHash', (req, res) => {
    const blockHash = req.params.blockHash;
    web3.eth.getBlock(blockHash).then((result) => {
        res.send(result);
    });
});

routes.post('/set-instructor', (req, res) => {
    CoursesContract.methods.setInstructor(req.body.name, req.body.age).send({ from: process.env.ACCOUNT })
    .then(receipt => {
        res.send(receipt);
    });
});

routes.get('/get-transaction/:transactionHash', (req, res) => {
    const transactionHash = req.params.transactionHash;
    web3.eth.getTransaction(transactionHash, (err, result) => {
		if(err){
			console.log('Error in: ', err);
			res.send({ erro: true })
		}else{
			const info = decoder.decodeData(result.input);
			console.log(info.inputs);
			res.send(info);
		}
    });
});

module.exports = routes;