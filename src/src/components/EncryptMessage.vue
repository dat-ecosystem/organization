<template>
  <div v-if="keys.mine && keys.theirs">
    <h3 class="mb-2 mt-3 font-semibold">Enter your message to us below ↓</h3>
    <textarea @input="update" v-model="input" class="border-solid border-black border p-2 w-full h-40 text-sm mb-3" />
    <div v-if="encrypted !== ''">
      <p>
        <a 
          class="focus:outline-none mr-2 bg-yellow-200 rounded-md px-2 py-1 hover:bg-yellow-400 focus:bg-yellow-300"
          :href="`https://github.com/dat-ecosystem/organization/issues/new?title=${encodeURIComponent('Message to the consortium')}&body=${encodeURIComponent(`Private Message:\n\n\n${encrypted}\n`)}`"
          target="_blank">
          Open github issue form with encrypted text prefilled
        </a>
      </p>
      <h3 class="mb-2 mt-3 font-semibold">Your Encrypted Message</h3>
      <p>
        You can also manually copy the message below to our issue form, or send it to us by any other means.
      </p>
      <!-- eslint-disable-next-line vue/no-textarea-mustache -->
      <pre readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm select-all overflow-scroll wrap">{{ encrypted }}</pre>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
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
    encrypted.value = await sendMessage(props.keys.mine, props.keys.theirs, input.value)
  })
}
</script>