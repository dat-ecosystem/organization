<template>
  <key-management :keys="keys" :require-theirs="false"/>
  <div v-if="keys.mine">
    <h2 class="mb-2 mt-3">Enter an encrypted message ↓</h2>
    <textarea @input="update" v-model="input" class="border-solid border-black border p-2 w-full h-40 text-sm" />
    <div v-if="decrypted !== ''">
      <h2 class="mb-2 mt-3">Decrypted Message</h2>
      <!-- eslint-disable-next-line vue/no-textarea-mustache -->
      <textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ decrypted }}</textarea>
    </div>
    <div v-if="error">
      Error occured while decryption.
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import KeyManagement from './KeyManagement.vue'
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

function update () {
  let latest = 0
  runAsync(async () => {
    const run = ++latest
    decrypted.value = ''
    error.value = null
    try {
      const newMessage = await receiveMessage(props.keys.theirs, props.keys.mine, input.value.replace(/\n/mg, '').trim())
      if (run === latest) {
        decrypted.value = newMessage
      }
    } catch (err) {
      error.value = err
      console.error(err)
    }
  })
}
</script>