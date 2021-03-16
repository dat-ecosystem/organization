<template>
  <vue-markdown-it class="markdown-body" :source="source()" :html="true" :linkify="true" />
  <!-- {{ updated }} -->
</template>
<script setup>
import { defineProps, ref } from 'vue'
import VueMarkdownIt from 'vue3-markdown-it'

const props = defineProps({
  parts: {
    type: Array,
    default: []
  }
})

const updated = ref(Date.now())

function source () {
  return props.parts.map(part => {
    if (part.text) {
      return part.text
    }
    if (part.success) {
      return part.success.decrypted
    }
    if (part.error) {
      return `<span title="Error: Couldn't decrypt.">${part.b64}</span>`
    }
    return `_(Decrypting: ${part.b64.substr(0,6)}...)_`
  }).join('')
}

for (const block of props.parts) {
  if (block.process) {
    block.process
      .then(({ success, error }) => {
        block.success = success
        block.error = error
        console.log(error.stack)
        updated.value = Date.now()
      })
  }
}
</script>