<template>
  <div class="container mx-auto lg px-4 min-h-screen bg-white pb-10">
    <h1 class="text-4xl pt-3 mb-1"><img src="/key.svg" title="key icon" style="width: 1em; height: 1em; display: inline-block;"> Dat Ecosystem</h1>
    <sub class="text-lg mb-4 block pl-11 text-gray-600">Private messaging with the Consortium.</sub>
    <hr />
    <div class="bg-gray-100 p-2">
      <p class="mb-2">
        The Consortium of the <a href="https://github.com/dat-ecosystem/organization" target="_blank" class="text-blue-800 hover:underline">Dat Ecosystem</a> can be contacted through <a href="https://github.com/dat-ecosystem/organization/issues">issues on the github</a>.
      </p>
      <p class="mb-2">
        Sadly, github <a href="https://github.com/isaacs/github/issues/37#issuecomment-787800884" target="_blank" class="text-blue-800 hover:underline">doesn't support private messages</a>, 
        but with the help this website you can encrypt message to us!
      </p>
      <p>
        This webpage uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto"  target="_blank" class="text-blue-800 hover:underline">browser provided crypto</a> and nothing you enter here gets sent to a server!
      </p>
    </div>
    <details class="opacity-50 select-none">
      <summary>(Public Key of the Consortium)</summary>
      <pre class="border p-2 overflow-scroll text-sm select-all" v-if="keys.theirs">{{JSON.stringify(keys.theirs.publicKey, null, 2)}}</pre>
    </details>
    <div class="flex justify-right" v-if="keys.mine">
      <button tabindex="0" @click="clearEverything" class="mt-2 focus:outline-none mr-2 bg-red-200 rounded-md px-2 py-1 hover:bg-red-400 focus:bg-red-300">
        Reset Everything
      </button>
    </div>
    <div :key="session">
      <div class="flex mt-4">
        <button
          v-for="tab in [{ code: 'first-issue', name: 'First message' }, { code: 'second-issue', name: 'New message' }, { code: 'follow-up', name: 'Follow up' }, { code: 'decrypt', name: 'Decrypt message' }]"
          :key="tab.code"
          tabindex="0"
          @click="() => { tabs = tab.code }"
          :class="`focus:outline-none p-2 border-b-2 ${tabs === tab.code ? 'border-yellow-400' : 'focus:border-grey-300 hover:border-yellow-200'}`">
          {{ tab.name }}
        </button>
        <div class="flex-grow border-b-2" />
      </div>
      <key-management :keys="keys" :first="tabs === 'first-issue'" />
      <div class="block" :class="{ 'hidden': tabs !== 'first-issue' }">
        <encrypt-message :keys="keys" />
      </div>
      <div class="block" :class="{ 'hidden': tabs !== 'second-issue' }">
        <encrypt-message :keys="keys" />
      </div>
      <div class="block" :class="{ 'hidden': tabs !== 'follow-up' }">
        <github-issue repo="dat-ecosystem/organization" :keys="keys" />
      </div>
      <div class="block" :class="{ 'hidden': tabs !== 'decrypt' }">
        <decrypt-message :keys="keys" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import KeyManagement from './components/KeyManagement.vue'
import EncryptMessage from './components/EncryptMessage.vue'
import DecryptMessage from './components/DecryptMessage.vue'
import GithubIssue from './components/GithubIssue.vue'
import { publicKeyFromJSON } from './lib/crypto'

const session = ref(Date.now())
const tabs = ref()
tabs.value = 'first-issue'

function clearEverything () {
  if (!confirm('Are you sure you want to reset this session? Did you copy your private key?')) {
    return
  }
  session.value = Date.now()
  keys.mine = null
}

const keys = reactive({
  mine: null,
  theirs: null
})

publicKeyFromJSON({
  "alg": "RSA-OAEP-256",
  "e": "AQAB",
  "ext": true,
  "key_ops": [
    "encrypt"
  ],
  "kty": "RSA",
  "n": "rFjnlx9MtwsTE7TLOUaIDzLzZ8ESCDKhmUYxX6PVBsBbCG3ArwRCm191Yl8weBnoUUjIYO_xbHzxuWKwd4pkJzLjFe7sHat2-LtDKl6X5Cg84gxqwzXyRXC7LEC4ki8gb1Z0Gn733gfl5GKUjhIh_umJ2JtG6-FAAB79gKpI6M4jIFRvWTvVWtdPBmR_MDd7jrvPtg5IjPmo0YjVI3a7hy2RSuSEdUc9mKHBo9kCDRKjS5lP0rkciTLbehFTYd-y5qvIVFUAJG4bSewfBSsmf9gQzBdyLA5Oi8NfzyXnB6I7iCJ4VP_xiBL4oavsOc4SpHPo8EmpKyGDanyWNuPMJzHzSei5JjKnMqQGNiEwIamxzZLjnOKOyK4ctzfzHpWjXm-GZCWNMfqJf9hhXRkIh_pevWbR3c4g4ZcmrB_9JtTuoQ6YdGc3sZtR272i731L5waWHzngRwMq33QQDpoAKZgJ-yIMcB4oKowCHbzFfGIHOQqvO5SmP6cBWP_GSlEevIk8eJuCuGPCJkA9MTMRAi4kh738vFvYvFCEWfl7ov0oK9XXcAqYt_XoTEVhcEgbX4PkwLuVXWAC3VafMfLJH9tu19cvEN5cYq7k7DLJ5GtcN_YpaqGenY9JYq6cmpXuAlyRRPMED7pM4w__f3QRa9BhRciGV755W-Fgj3bD1O0"
}, key => keys.theirs = key)
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>