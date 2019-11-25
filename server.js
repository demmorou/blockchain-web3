const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/eduinblocks', require('./src/routes'));

app.listen(2020);

// get all accounts
// web3.eth.getAccounts().then((resources) => { account = resources[0]; console.log(resources)});

// add new
// CoursesContract.methods.setInstructor('Deusimar de Sousa', 26).send({ from: '0x9d50beF2600F350707b40d95662b3fDf39Cb5396' })
// .then(receipt => {
//     console.log(receipt);
// });

// get block by hash
// web3.eth.getBlock('0x2d6fb2f275aba1d1e2079b6df9d28c17966a43b11c9c8edc6bf5e5c94880f19f')
//     .then(resources => {
//         console.log(resources);
//     });