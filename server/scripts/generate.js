const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));
const hash1 = keccak256(utf8ToBytes("Hi"));

const sign1 = async () => {
    const [signature1, recov_bit] = await secp.sign(hash1, privateKey, { recovered: true });
    console.log('Signature:', toHex(signature1).toString());
    console.log(recov_bit);
}
sign1();
// sig.then(() => {

// });
const publickey = keccak256(secp.getPublicKey(privateKey)); //.slice(1)).slice(-20);

console.log('public key:', toHex(publickey));