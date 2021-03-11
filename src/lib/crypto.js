import * as cbor from 'cbor-web'
import { encode as base64encode, decode as base64decode } from 'uint8-to-base64'
import qcompare from 'qcompare'

async function exportKey (key) {
  return await crypto.subtle.exportKey('jwk', key)
}
const algo = {
  name: 'RSA-OAEP',
  hash: 'SHA-256',
  publicExponent: new Uint8Array([1, 0, 1]),
  modulusLength: 4096
}

export async function createKeys () {
  const keyPair = await crypto.subtle.generateKey(
    algo,
    true,
    ['decrypt', 'encrypt']
  )
  return {
    keyPair,
    privateKey: await exportKey(keyPair.privateKey),
    publicKey: await exportKey(keyPair.publicKey)
  }
}

export function getKeyType (jwk) {
  // https://stackoverflow.com/questions/56807959/generate-public-key-from-private-key-using-webcrypto-api
  if (jwk.d && jwk.dp && jwk.dq && jwk.q && jwk.qi && jwk.p && jwk.key_ops.includes('decrypt')) {
    return 'private'
  }
  return 'public'
}

export async function importKey (jwk) {
  if (getKeyType(jwk) === 'private') {
    return await importPrivateKey(jwk)
  }
  return await importPublicKey(jwk)
}

export async function importPublicKey (publicKey) {
  return {
    keyPair: {
      publicKey: await crypto.subtle.importKey(
        'jwk',
        publicKey,
        algo,
        true,
        ['encrypt']
      ),
      privateKey: null
    },
    publicKey,
    privateKey: null
  }
}

export function publicKeyURL (publicKey) {
  return `${document.location.href.replace(/#.*$/g, '')}#${base64encode(cbor.encode(publicKey))}`
}

export function publicKeyFromLocation (cb) {
  let { hash } = document.location
  if (hash.startsWith('#')) {
    hash = hash.substr(1)
  }
  if (hash === '') {
    return cb(null)
  }
  try {
    const publicKey = cbor.decode(base64decode(hash))
    importPublicKey(publicKey)
      .then(
        cb,
        err => {
          console.warn(err)
          cb(null)
        }
      )
  } catch (err) {
    console.warn(err)
    cb(null)
  }
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export async function encrypt (publicKey, message) {
  return new Uint8Array(await window.crypto.subtle.encrypt(
    algo,
    publicKey,
    message
  ))
}

export async function sendMessage (sender, receiver, message) {
  const encoded = encoder.encode(message)
  return base64encode(cbor.encode(
    sender.publicKey,
    await encrypt(
      receiver.keyPair.publicKey,
      encoded
    ),
    await encrypt(
      sender.keyPair.publicKey,
      encoded
    )
  ))
}

export async function receiveMessage (sender, receiver, message) {
  const raw = base64decode(message)
  const decoded = await cbor.decodeAll(raw)
  const [ senderPublicKey, encryptedForReceiver, encryptedForSender ] = decoded
  if (sender && qcompare(senderPublicKey, sender.publicKey)) {
    return await decrypt(sender.keyPair.privateKey, encryptedForSender)
  }
  if (receiver && qcompare(senderPublicKey, receiver.publicKey)) {
    return await decrypt(receiver.keyPair.privateKey, encryptedForSender)
  }
  return await decrypt(receiver.keyPair.privateKey, encryptedForReceiver)
}

export async function decrypt (privateKey, message) {
  return decoder.decode(new Uint8Array(await window.crypto.subtle.decrypt(
    algo,
    privateKey,
    message
  )))
}

export async function importPrivateKey (privateKey) {
  const keyPair = {
    privateKey: await crypto.subtle.importKey(
      'jwk',
      privateKey,
      algo,
      true,
      ['decrypt']
    )
  }

  const publicKey = { ...privateKey }
  // https://stackoverflow.com/questions/56807959/generate-public-key-from-private-key-using-webcrypto-api
  delete publicKey.d
  delete publicKey.dp
  delete publicKey.dq
  delete publicKey.q
  delete publicKey.qi
  delete publicKey.p
  publicKey.key_ops = ['encrypt']

  keyPair.publicKey = (await importPublicKey(publicKey)).keyPair.publicKey

  return {
    keyPair,
    publicKey,
    privateKey
  }
}
