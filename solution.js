const got = require('got');
const crypto = require('crypto');

async function gen(url) {
  let Y = url + '9bde64a09e825d35a4128c813a05b5eff24b6ab6';
  const ts = Date.now();
  Y = Y + ts;
  const sig = await sha1Digest(Y);
  return {
    sig: sig,
    ts: ts,
  };
}

async function sha1Digest(str) {
  try {
    const hash = crypto.createHash('sha1');
    const buf = Buffer.from(str, 'utf8');
    hash.update(buf);
    return toHexString(hash.digest());
  } catch (e) {
    console.dir(e);
  }
}

function toHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

async function genZalandoSig(url) {
  try {
    const headers = await gen(url);
    console.dir(headers);
  } catch (e) {
    console.dir(e);
  }
}

genZalandoSig('https://www.zalando.nl/api/mobile/v3/config/appdomain.json');
