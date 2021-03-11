<template>
  <div v-if="!(keys.mine && keys.mine.keyPair)" class="pl-5">
    <h2 class="text-xl mt-3 mb-2">1. Your Key Setup</h2>
    <p class="text-gray-500 mb-2">
      Before we can get started you need some keys!
    </p>
    <ul class="list-disc">
      <li>
        If you have been here before you should have setup this page already and can just 
        <button tabindex="0" @click="promptMine" class="focus:outline-none mr-2 bg-yellow-200 rounded-md px-2 py-1 hover:bg-yellow-400 focus:bg-yellow-300">
          import your private key
        </button>.
      </li>
      <li>
        In case this is your first time please
        <button tabindex="0" @click="createMyKeys" class="focus:outline-none mr-2 bg-yellow-200 rounded-md px-2 py-1 hover:bg-yellow-400 focus:bg-yellow-300">
          create a new key
        </button>.
      </li>
    </ul>
  </div>
  <div v-else>
    <details open class="pl-5">
      <summary class="text-xl mt-3 mb-2 focus:outline-none cursor-pointer">Your Keys</summary>
      <p>
        Great! Your keys seem to work! Please copy your key somewhere safe to make sure you have them to read future messages!
      </p>
      <dl class="mt-2 mb-3">
        <dt><strong>Your Private Key</strong>. Store this somewhere safe! It allows you to read replies and send new messages!</dt>
        <!-- eslint-disable-next-line vue/no-textarea-mustache -->
        <dd><textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ JSON.stringify(keys.mine.privateKey, null, 2) }}</textarea></dd>
        <dt><strong>Your Public Key</strong>. Share this with other people so they can send you private messages!</dt>
        <!-- eslint-disable-next-line vue/no-textarea-mustache -->
        <dd><textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ JSON.stringify(keys.mine.publicKey, null, 2) }}</textarea></dd>
      </dl>
      <p>
        You can also give this link to a friend instead <a :href="url(keys.mine.publicKey)">{{ url(keys.mine.publicKey) }}</a>.
      </p>
    </details>
    <div v-if="requireTheirs && !(keys.theirs && keys.theirs.publicKey)" class="pl-5">
      <h2 class="text-xl mt-3 mb-2">2. Import their key</h2>
      <p class="text-gray-500 mb-2">
        Now we need to get <strong>the public key</strong> from the person you want to send a message to!
      </p>
      <ul class="list-disc">
        <li>
          <button tabindex="0" @click="promptTheirs" class="focus:outline-none mr-2 bg-purple-200 rounded-md px-2 py-1 hover:bg-purple-400 focus:bg-purple-300">
            Import the public key
          </button> that you got from the person you want to contact.
        </li>
      </ul>
    </div>
    <details v-else-if="requireTheirs" class="pl-5" open>
      <summary class="text-xl mt-3 mb-2 focus:outline-none cursor-pointer">Their Key</summary>
      <p>
        Great! It seems we got the key from the person you are exchanging with! Do you want to change this?
        <button tabindex="0" @click="clearTheirs" class="focus:outline-none mr-2 bg-purple-200 rounded-md px-2 py-1 hover:bg-purple-400 focus:bg-purple-300">
          Clear their key
        </button>
      </p>
      <dl class="mt-2 mb-3">
        <dt><strong>Their Public Key</strong>. Just for your clarity</dt>
        <!-- eslint-disable-next-line vue/no-textarea-mustache -->
        <dd><textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ JSON.stringify(keys.theirs.publicKey, null, 2) }}</textarea></dd>
      </dl>
    </details>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { createKeys, importPublicKey, importPrivateKey, publicKeyURL } from '../lib/crypto'
import { runAsync } from '../lib/async'

const url = publicKeyURL

const props = defineProps({
  keys: {
    type: Object
  },
  requireTheirs: {
    type: Boolean,
    default: true
  }
})

function createMyKeys () {
  runAsync(async () => {
    props.keys.mine = await createKeys()
  })
}

function clearTheirs () {
  props.keys.theirs = null
}

function promptJSON (msg) {
  const raw = prompt(msg)
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error(err)
    return null
  }
}

function promptMine () {
  const key = promptJSON('Insert your private key below!')
  if (key === null) {
    return
  }
  runAsync(async () => {
    props.keys.mine = await importPrivateKey(key)
  })
}

function promptTheirs () {
  const key = promptJSON('Insert their public key below!')
  if (key === null) {
    return
  }
  runAsync(async () => {
    props.keys.theirs = await importPublicKey(key)
  })
}
</script>
