<template>
  <key-management :keys="keys" />
  <div v-if="keys.mine && keys.theirs">
    <h2 class="mb-2 mt-3">Enter a message ↓</h2>
    <textarea @input="update" v-model="input" class="border-solid border-black border p-2 w-full h-40 text-sm" />
    <div v-if="encrypted !== ''">
      <h2 class="mb-2 mt-3">Encrypted Message - send this to the person you have been meaning to contact ↓</h2>
      <!-- eslint-disable-next-line vue/no-textarea-mustache -->
      <textarea readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm">{{ encrypted }}</textarea>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import KeyManagement from './KeyManagement.vue'
import { runAsync } from '../lib/async'
import { sendMessage } from '../lib/crypto'

const props = defineProps({
  keys: {
    type: Object
  }
})

const input = ref('')
const encrypted = ref('')

function update () {
  runAsync(async () => {
    const message = await sendMessage(props.keys.mine, props.keys.theirs, input.value)
    
    encrypted.value = message.match(/.{0,64}/g).join('\n')
  })
}
</script>