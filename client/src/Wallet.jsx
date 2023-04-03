import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import * as k from 'ethereum-cryptography/keccak';
import * as H from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, sign, setSign }) {
  async function onChange(evt) {
    const sign = evt.target.value;
    console.log(H.toHex(secp.recoverPublicKey(k.keccak256(H.utf8ToBytes("Hi")), sign, 1)));
    setSign(sign);
    const address = H.toHex(k.keccak256(secp.recoverPublicKey(k.keccak256(H.utf8ToBytes("Hi")), sign, 1))); //.slice(1)).slice(-20);
    console.log(address);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Digital Signature
        <input placeholder="Type in a digital signature: fe5d97d0c75c50e815b1bf9889043e7a23b10d5af0df1e4b5fa6cb1a98a4ece0" value={sign} onChange={onChange}></input>
      </label>
      <label>
        Address
        <input placeholder={address}></input>
      </label>
      {/* <label>
        Name
        <input placeholder={name}></input>
      </label> */}
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
