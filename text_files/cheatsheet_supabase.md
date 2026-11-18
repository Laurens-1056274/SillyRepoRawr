To use supabase, you need to connect it to a framework. In this instance I will use Vue

# Use Supabase with vue

## 1. create supabase project
visit: https://supabase.com/dashboard/org/dgcczgqsjcnkmofmjczf

## IMPORTANT
once in your supabase project, open the connect sheet (green Connext in top row). This will
display all the important things, such as build API's, how to setup MCP etc
**The following steps are able to be found there: 4, 5, 6, 7, 8**

## 2. set up your database
start up with creating a table in `Database` and then `Tables`
You can also prefill it by clicking `clicking here to prefill the SQL ` in https://supabase.com/docs/guides/getting-started/quickstarts/vue

## 3. Create Vue app
create a vua app (see cheatseet_vue.md)

## 4. (Optional) set up AI tooling
to install agent skills: `npx skills add supabase/agent-skills`
Or use the Supabase MCP server. see link for documentation: https://supabase.com/docs/guides/ai-tools/mcp
### Why set up AI tooling, and when to use which
You want to setup AI tooling when you want to give AI context about your project
**agent skills** so AI can produce more accurate, reliable code using Supabase patterns
**MCP server** so AI can inspect your schema and act on your projects behalf

## 5. Install Supabase client library
navigate to the created vue app and run: `npm install @supabase/supabase-js`

## 6. Declare Supabase environment variables
create a `.env.local` file(same area as vite.config.js) an populate them with the following
```VITE_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
VITE_SUPABASE_PUBLISHABLE_KEY=<SUBSTITUTE_SUPABASE_PUBLISHABLE_KEY>
```
This file can be commited, because it's onlu the url and a publisable key
In case I need to use secrets, read: https://supabase.com/docs/guides/functions/secrets
### API details
to interact with data in database tables, you use the client libraries that wrap the auto-generated Data API endpoints, authenticating using the Project URL and key from the project Connect dialog.

## 7. Create the supabase client
>npm init vue@latest scaffolds a TypeScript project by default. If you chose a JavaScript-only project, use a .js extension instead and drop the type import.
Create a `/src/lib` directiory in your vue app. create file called `supabaseClient.ts`. Put code below in there
```
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
export const supabase = createClient(supabaseUrl, supabasePublishableKey)
```
## 8. Query data from the app
put code below in App.vue
```
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
```
## 9. start the app
run `npm run dev`