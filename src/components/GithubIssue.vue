<template>
  <div v-if="keys.mine && keys.mine.privateKey">
    <div class="bg-gray-100 p-3">
      <label for="issue" class="font-semibold">Github Issue:</label>
      {{`https://github.com/${repo}/issue/`}}<input ref="issueInput" name="issue" @change="update" @keydown="update" class="border m" />
      <span v-if="!loading && issue">[<a :href="`${issue.html_url}`" target="_blank" class="text-blue-800 hover:underline">Link</a>]</span>
    </div>
    <div v-if="loading" class="color-gray">
      ... loading ...
    </div>
    <div v-if="!loading && error" >{{error.message}}</div>
    <div v-if="!loading && issue" class="mt-5">
      <div class="border-solid border-l-2 pl-2 border-gray-300 mb-5">
        <div class="font-semibold">{{`@${issue.user.login}`}}</div>
        <partially-encrypted-markdown :parts="issue.parts" />
      </div>
      <div v-for="comment in comments" :key="`${comment.id}`" class="border-solid border-l pl-4 border-gray-300 mb-5">
        <div class="font-semibold">{{`@${comment.user.login}`}}</div>
        <partially-encrypted-markdown :parts="comment.parts" />
      </div>
      <div>
        <h2>Reply</h2>
        <textarea @input="encryptReply" v-model="reply" class="border-solid border-black border p-2 w-full h-40 text-sm" />
        <div v-if="encryptedReply">
          <h3 class="mb-2 mt-3 font-semibold">Your Encrypted Reply</h3>
          <p>
            Unfortunately we can not prefill this for you. You need to copy-paste this <a :href="`${issue.html_url}`" target="_blank" class="text-blue-800 hover:underline">here</a>.
          </p>
          <!-- eslint-disable-next-line vue/no-textarea-mustache -->
          <pre readonly class="border-solid border-gray-300 border p-2 w-full h-40 text-sm select-all overflow-scroll wrap">{{ encryptedReply }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import * as axios from 'axios'
import { runAsync } from '../lib/async'
import PartiallyEncryptedMarkdown from './PartiallyEncryptedMarkdown.vue'
import { receivePartiallyEncrypted, sendMessage } from '../lib/crypto.js'

const props = defineProps({
  repo: {
    type: String,
    required: true
  },
  keys: {
    type: Object
  }
})

const comments = ref([])
const issueInput = ref(null)
const issue = ref(null)
const loading = ref(false)
const error = ref(null)
const reply = ref(null)
const encryptedReply = ref(null)

let previous = null
let current = 0

function encryptReply () {
 runAsync(async () => {
    encryptedReply.value = await sendMessage(props.keys.mine, props.keys.theirs, reply.value)
  })
}

function update (e) {
  if (e instanceof KeyboardEvent && e.code !== 'Enter') {
    return
  }
  current += 1
  const index = current 
  if (previous !== null) {
    previous()
    previous = null
  }
  issue.value = null
  comments.value = null
  loading.value = true
  error.value = null
  ;(async () => {
    const cancelToken = new axios.CancelToken((c) => { previous = c })
    const issueNr = parseInt(issueInput.value.value)
    if (isNaN(issueNr) || issueNr === Infinity || issueNr === -Infinity) {
      throw new Error('The issue needs to be a valid number')
    }
    if (issueNr < 1) {
      throw new Error('We need positive numbers')
    }
    const issueURL = `https://api.github.com/repos/${props.repo}/issues/${issueNr}`
    const issueRes = await axios.get(issueURL, { cancelToken })
    const commentsRes = await axios.get(issueRes.data.comments_url, { cancelToken })
    issue.value = {
      ...issueRes.data,
      parts: receivePartiallyEncrypted(props.keys.theirs, props.keys.mine, issueRes.data.body)
    }
    comments.value = 
      commentsRes.data.map((comment, index) => {
        return {
          ...comment,
          parts: receivePartiallyEncrypted(props.keys.theirs, props.keys.mine, comment.body)
        }
      })
  })()
    .then(
      () => {
        if (index === current) {
          loading.value = false
        }
      },
      err => {
      if (index === current) {
        loading.value = false
        error.value = err
      }
      console.warn(err)
    })
}
</script>