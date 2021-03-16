<template>
  <div v-if="!(keys.mine && keys.mine.keyPair) && first" class="pl-5">
    <h2 class="text-xl mt-3 mb-2">Get Started</h2>
    <p class="text-gray-500 mb2">
      Before we can get started please <button tabindex="0" @click="createMyKeys" class="focus:outline-none mr-2 bg-yellow-200 rounded-md px-2 py-1 hover:bg-yellow-400 focus:bg-yellow-300">
        create a private key
      </button>.
    </p>
    <p class="text-gray-500 mb2">
      If you have been here before and remember your private key you should click on "New Message".
    </p>
  </div>
  <div v-else-if="!(keys.mine && keys.mine.keyPair) && !first" class="pl-5">
    <h2 class="text-xl mt-3 mb-2">Hello Again!</h2>
    <p class="text-gray-500 mb-2">
      Before we can get started, please
      <button tabindex="0" @click="promptMine" class="focus:outline-none mr-2 bg-yellow-200 rounded-md px-2 py-1 hover:bg-yellow-400 focus:bg-yellow-300">
        import your private key
      </button>.
    </p>
    <p class="text-gray-500 mb2">
      If you don't have one yet or lost your previous private key, you should click on "First Message".
    </p>
  </div>
  <div v-else>
    <details :open="first" class="pl-5">
      <summary class="text-lg mt-3 mb-2 focus:outline-none cursor-pointer select-none">Your Private Key</summary>
      <p>
        <strong>This is important!</strong>. Store this somewhere safe! It allows you to read replies and send new messages!
      </p>
      <pre class="border-solid border-gray-300 border p-2 w-full h-40 text-sm select-all overflow-scroll">{{ JSON.stringify(keys.mine.privateKey, null, 2) }}</pre>
    </details>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { createKeys, importPrivateKey } from '../lib/crypto'
import { runAsync } from '../lib/async'

const props = defineProps({
  first: {
    type: Boolean,
    required: true
  },
  keys: {
    type: Object
  }
})

function createMyKeys () {
  runAsync(async () => {
    props.keys.mine = await createKeys()
  })
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
</script>
