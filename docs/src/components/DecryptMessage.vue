<template>
  <div v-if="keys.mine">
    <h3 class="mb-2 mt-3 bold font-semibold">Enter an encrypted message ↓</h3>
    <textarea @input="update" v-model="input" class="border-solid border-black border p-2 w-full h-40 text-sm" />
    <div v-if="decrypted !== ''">
      <h3 class="mb-2 mt-3 bold font-semibold">Decrypted Message</h3>
      <!-- eslint-disable-next-line vue/no-textarea-mustache -->
      <textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ decrypted }}</textarea>
    </div>
    <div v-if="error">
      Error occured while decryption.
    </div>
    <div v-if="sender">
      <h2 class="mb-2 mt-3 text-lg">Reply to sender</h2>
      <encrypt-message :keys="senderKeys()" />
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import EncryptMessage from './EncryptMessage.vue'
import { runAsync } from '../lib/async'
import { receiveMessage } from '../lib/crypto'

const props = defineProps({
  keys: {
    type: Object
  }
})

const input = ref('')
const decrypted = ref('')
const error = ref(null)
const sender = ref(undefined)

function senderKeys () {
  return {
    mine: props.keys.mine,
    theirs: sender.value
  }
}

function update () {
  let latest = 0
  runAsync(async () => {
    const run = ++latest
    decrypted.value = ''
    sender.value = undefined
    error.value = null
    try {
      const newMessage = await receiveMessage(props.keys.theirs, props.keys.mine, input.value.replace(/\n/mg, '').trim())
      if (run === latest) {
        decrypted.value = newMessage.decrypted
        sender.value = newMessage.sender
      }
    } catch (err) {
      error.value = err
      console.error(err)
    }
  })
}
</script>