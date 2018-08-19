const express = require('express');
const bodyParser = require('body-parser');
const { Blockchain, Block } = require('./simpleChain');

const app = express();
const PORT = 8000;
const blockchain = new Blockchain();

app.use(bodyParser.text());
app.get('/block/:height', async (req, res) => {
  const { height } = req.params;
  const block = await blockchain.getBlock(height);
  console.log(block);
  return res.json(block);
});

app.post('/block', async (req, res) => {
  const block = new Block(req.body);
  await blockchain.addBlock(block);
  return res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
