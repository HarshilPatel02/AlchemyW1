const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "ef889e513f3101910280751b55f6ea84edccf3a565ed13d767d413f884c8a50c": 100, //alice
  "a0aa2105c67c12b5a7de4c1d67c7b5555ce7206edb3bb0ed2a5f2733f0217885": 50, //bob
  "9b801c51e6c5cea8d3726f52b7beb871571e9aa3ba2c6afef3e63ddc25c2ae91": 75, //charlie
};

app.get("/balance/:address", (req, res) => {

  const { address } = req.params;
  const balance = balances[address] || 0;
  //const name = balances[address][1] || "noname";
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO: get a signature from the client-side application
  // recover the public address from the signature


  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
