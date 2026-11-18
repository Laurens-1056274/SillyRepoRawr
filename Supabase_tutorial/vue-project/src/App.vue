<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { supabase } from './lib/supabaseClient'

type Instrument = {
  id: number
  name: string
}

const instruments = ref<Instrument[]>([])
const error = ref<string | null>(null)

async function getInstruments() {
  const { data, error: fetchError } = await supabase.from('instruments').select()

  if (fetchError) {
    error.value = fetchError.message
    return
  }

  instruments.value = data
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <p v-if="error">Error loading instruments: {{ error }}</p>
  <ul v-else>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>
</template>