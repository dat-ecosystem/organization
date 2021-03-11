<template>
  <div class="container mx-auto lg px-4 min-h-screen bg-white">
    <h1 class="text-4xl pt-3 mb-2"><img src="/key.svg" title="key icon" style="width: 1em; height: 1em; display: inline-block;"> Whisper</h1>
    <hr />
    <p class="bg-gray-100 p-2">
      <em>Whisper</em> is a browser tool <em>(it sends nothing to a server!)</em> to send private messages to other people using their private keys.
      It relies exclusively on the cryptographic tools provided by your browser.
    </p>
    <div class="flex justify-right" v-if="keys.theirs || keys.mine">
      <button tabindex="0" @click="clearEverything" class="mt-2 focus:outline-none mr-2 bg-red-200 rounded-md px-2 py-1 hover:bg-red-400 focus:bg-red-300">
        Reset Everything
      </button>
    </div>
    <div :key="session">
      <div class="flex mt-4">
        <button
          v-for="tab in [{ code: 'encrypt', name: 'Create a secret Message' }, { code: 'decrypt', name: 'Read a secret message' }]"
          :key="tab.code"
          tabindex="0"
          @click="() => { tabs = tab.code }"
          :class="`focus:outline-none p-2 border-b-2 ${tabs === tab.code ? 'border-yellow-400' : 'focus:border-grey-300 hover:border-yellow-200'}`">
          {{ tab.name }}
        </button>
        <div class="flex-grow border-b-2" />
      </div>
      <div class="block" :class="{ 'hidden': tabs !== 'encrypt' }">
        <encrypt-message :keys="keys" />
      </div>
      <div class="block" :class="{ 'hidden': tabs !== 'decrypt' }">
        <decrypt-message :keys="keys" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import EncryptMessage from './components/EncryptMessage.vue'
import DecryptMessage from './components/DecryptMessage.vue'
import { publicKeyFromLocation } from './lib/crypto'

const session = ref(Date.now())
const tabs = ref()
tabs.value = 'encrypt'

function clearEverything () {
  if (!confirm('Are you sure you want to reset this session? Did you copy your private key?')) {
    return
  }
  session.value = Date.now()
  keys.mine = null
  keys.theirs = null
  publicKeyFromLocation(key => { keys.theirs = key })
}

const keys = reactive({
  mine: null,
  theirs: null
})

publicKeyFromLocation(key => { keys.theirs = key })
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>