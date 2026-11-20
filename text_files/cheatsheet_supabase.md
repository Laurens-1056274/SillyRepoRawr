# cheatsheet Supabase
To use Supabase, you need to connect it to a framework. In this instance I will use Vue

# Table of Contents
- [Use Supabase with Vue](#use-supabase-with-vue)
  - [1. Create Supabase project](#1-create-supabase-project)
  - [2. Set up your database](#2-set-up-your-database)
  - [3. Create Vue app](#3-create-vue-app)
  - [4. (Optional) Set up AI tooling](#4-optional-set-up-ai-tooling)
  - [5. Install Supabase client library](#5-install-supabase-client-library)
  - [6. Declare Supabase environment variables](#6-declare-supabase-environment-variables)
  - [7. Create the Supabase client](#7-create-the-supabase-client)
  - [8. Query data from the app](#8-query-data-from-the-app)
  - [9. Start the app](#9-start-the-app)

- [Auth](#auth)
  - [1. About authentication and authorization](#1-about-authentication-and-authorization)
  - [2. The Supabase ecosystem](#2-the-supabase-ecosystem)
  - [3. Get started](#3-get-started)
  - [4. Providers](#4-providers)
  - [5. Pricing](#5-pricing)
  - [6. Next steps](#6-next-steps)

- [Import data into Supabase](#import-data-into-supabase)
  - [1. How to import data into Supabase](#1-how-to-import-data-into-supabase)
    - [Option 1: CSV import via Supabase dashboard](#option-1-csv-import-via-supabase-dashboard)
    - [Option 2: Bulk import using pgloader](#option-2-bulk-import-using-pgloader)
    - [Option 3: Using Postgres copy command](#option-3-using-postgres-copy-command)
    - [Option 4: Using the Supabase API](#option-4-using-the-supabase-api)
  - [2. Preparing to import data](#2-preparing-to-import-data)
    - [Step 1: Back up your data](#step-1-back-up-your-data)
    - [Step 2: Increase statement timeouts](#step-2-increase-statement-timeouts)
    - [Step 3: Estimate your required disk size](#step-3-estimate-your-required-disk-size)
    - [Step 4: Disable triggers](#step-4-disable-triggers)
    - [Step 5: Rebuild indices after data import is complete](#step-5-rebuild-indices-after-data-import-is-complete)

- [Upload and serve static files using Storage](#upload-and-serve-static-files-using-storage)
  - [1. Key features](#1-key-features)
  - [2. Get started](#2-get-started)
  - [3. Examples](#3-examples)
  - [4. Resources](#4-resources)

- [Explore drop-in UI components for your Supabase app](#explore-drop-in-ui-components-for-your-supabase-app)
# Use Supabase with Vue
## 1. create Supabase project
visit: https://supabase.com/dashboard/org/dgcczgqsjcnkmofmjczf
## IMPORTANT
once in your Supabase project, open the connect sheet (green Connect in top row). This will
display all the important things, such as built APIs, how to setup MCP etc
**The following steps are able to be found there: 4, 5, 6, 7, 8**
## 2. Set up your database
start up with creating a table in `Database` and then `Tables`
You can also prefill it by clicking [`clicking here to prefill the SQL`](https://supabase.com/docs/guides/getting-started/quickstarts/vue) 
## 3. Create Vue app
Create a Vue app (see [Vue cheatsheet](cheatsheet_vue.md))
## 4. (Optional) set up AI tooling
to install agent skills: `npx skills add supabase/agent-skills`
[Or use the Supabase MCP server](https://supabase.com/docs/guides/ai-tools/mcp).
### Why set up AI tooling, and when to use which
You want to setup AI tooling when you want to give AI context about your project
**agent skills** so AI can produce more accurate, reliable code using Supabase patterns
**MCP server** so AI can inspect your schema and act on your project's behalf
## 5. Install Supabase client library
navigate to the created Vue app and run: `npm install @supabase/supabase-js`
## 6. Declare Supabase environment variables
create a `.env.local` file(same area as vite.config.js) and populate them with the following
```VITE_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
VITE_SUPABASE_PUBLISHABLE_KEY=<SUBSTITUTE_SUPABASE_PUBLISHABLE_KEY>
```
This file can be committed, because it's only the URL and a publishable key
In case you need to use secrets, [read this](https://supabase.com/docs/guides/functions/secrets)
### API details
to interact with data in database tables, you use the client libraries that wrap the auto-generated Data API endpoints, authenticating using the Project URL and key from the project Connect dialog.
## 7. Create the Supabase client
>npm init vue@latest scaffolds a TypeScript project by default. If you chose a JavaScript-only project, use a .js extension instead and drop the type import.
Create a `/src/lib` directory in your Vue app. create a file called `supabaseClient.ts`. Put code below in there
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
# Auth
Supabase auth makes it easy to implement authentication and authorization. They
provide client SDKs, API endpoints and pre built web ui [components](https://supabase.com/library?category=Authentication)
Your users can use many popular auth methods. see [*this*](https://supabase.com/docs/guides/auth) for the examples
## 1. about authentication and authorization
Authentication = checking if user is who they say they are
Authorization = checking what resources the user is allowed to access
## 2. The Supabase ecosystem
You can use Supabase auth as a standalone product, but it's also built to integrate with the Supabase ecosystem

Auth uses your project's Postgres database under the hood, storing user data and other info in a special schema.
You can connect this data to your own tables using triggers and foreign key references.

Auth also enables access control to your database's auto generated REST API. your data requests are
automatically sent with the user's auth token. 
## 3. Get started
If you're new, check the following links:
- [Password-based Auth](https://supabase.com/docs/guides/auth/passwords)
- [Server-Side Rendering](https://supabase.com/docs/guides/auth/server-side)
- [Which package to use](https://supabase.com/docs/guides/auth/choosing-a-server-package)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
## 4. Providers
Supabase auth works with many popular auth methods. see the [providers](https://supabase.com/docs/guides/auth) part in the document which you can use for what. I will not write these down because they might change
## 5. Pricing
Charges apply as followed
- [Monthly Active Users (MAU)](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users)
- [Monthly Active Third-Party Users (Third-Party MAU)](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-third-party)
- [Monthly Active SSO Users (SSO MAU)](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-sso)
- [Advanced MFA](https://supabase.com/docs/guides/platform/manage-your-usage/advanced-mfa-phone)
## 6. Next steps
Once you've covered the basics, the following guides will help with other cases and features:
- [Passwordless email sign-in](https://supabase.com/docs/guides/auth/auth-email-passwordless)
- [Enterprise Single Sign-On](https://supabase.com/docs/guides/auth/enterprise-sso)
- [User sessions](https://supabase.com/docs/guides/auth/sessions)
- [Third-party auth](https://supabase.com/docs/guides/auth/third-party/overview)
- [Supabase Auth multi-factor authentication](https://supabase.com/docs/guides/auth/auth-mfa)
- [JSON Web Token (JWT)](https://supabase.com/docs/guides/auth/jwts)
- [Auth Hooks](https://supabase.com/docs/guides/auth)
# Import data into Supabase
## 1. How to import data into Supabase
There are multiple ways to store data into Supabase. Which one you use depends on data size and app requirements
### Option 1: CSV import via Supabase dashboard
It's generally better suited for smaller datasets and quick data import. Size limit is 100MB
Consider using a different method such as pgloader for large-scale data imports
### How to use it
**1:** Navigate to the relevant table in the table editor (second option on vertical navbar on the left)

**2:** Click on + New table (for new, empty projects) or Insert (for existing tables), then choose Import Data from CSV and follow the on-screen instructions to upload your CSV file

---
### Option 2: Bulk import using pgloader
pgloader is a powerful tool for efficiently importing data into a Postgres database which supports a wide range of
source database engines(for example MySQL).
### How to use it
**1:** [Install pgloader](https://pgloader.readthedocs.io/en/latest/install.html) on your local machine/server.
first download the latest development build:
```
curl -L -o pgloader.jar \ 
https://github.com/dimitri/pgloader/releases/download/v4-dev/pgloader.jar
```
And then run it:
```
java -jar pgloader.jar --version
java -jar pgloader.jar SOURCE TARGET
java -jar pgloader.jar my.load
```
**2:** Create a configuration file (e.g., `config.load`) that specifies the source data and the target Supabase database.
Below an example (customize the source and the Supabase database URL and options to fit your specific use case):
```
LOAD DATABASE
    FROM sourcedb://USER:PASSWORD@HOST/SOURCE_DB
    INTO postgres://postgres.xxxx:password@xxxx.pooler.supabase.com:6543/postgres
ALTER SCHEMA 'public' OWNER TO 'postgres';
set wal_buffers = '64MB', max_wal_senders = 0, statement_timeout = 0, work_mem to '2GB';
```
`wal buffers` allocates megabytes (MB) of memory for write-ahead logging buffers.
larger value => improve write performance by caching more data in memory before writing it to disk.
useful for for example data import operation to speed up writing transaction logs

`max_wal_senders` set this to 0 to disable replication connections.
This is done during the data import process to prevent replication-related conflicts and issues

`statement_timeout` is set to 0, which means it's disabled, allowing SQL statements to run without a time limit.
if it was for example 60000, it has 60 seconds for each statement (60000 milliseconds) before it automatically cancels

`work_mem` is set to '2GB', allocating 2 GB of memory for query operations. This enhances the performance of complex queries by allowing larger in-memory datasets.
Setting this to for example 4GB would make this faster IF 2GB is running out of memory

---
### Option 3: Using Postgres copy command
Read more about [Bulk data loading](https://supabase.com/docs/guides/database/tables#bulk-data-loading)

---
### Option 4: Using the Supabase API
The Supabase API allows you to programmatically import data into your tables
This way is usefull for when you need to automate data imports. [see API guide](https://supabase.com/docs/guides/api)

---
## 2. Preparing to import data
Large data imports can affect  your database performance. failed imports can cause data corruption
### Step 1: Back up your data
Backups help you restore data if something goes wrong (duhh). Databases on pro,team and enterprise plans
do this automatically on schedule, [but you can  aslo take your own backup ](https://supabase.com/docs/guides/platform/backups)

---
### Step 2: Increase statement timeouts
When importing large datasets, you may encounter timeouts. [To address this increase the statement timeout](https://supabase.com/docs/guides/database/postgres/timeouts)

<img src="image_folder/something_to_address.webp" alt="Something to address" width="200">

---
### Step 3: Estimate your required disk size
Large datasets consume disk space. If you know how big your database is going to be, you can change the size in project database settings
(4th option vertical navbar on the left called: database. then press settings, and go to Disk management )

---
### Step 4: Disable triggers
When importing large datasets, temporarily disable triggers to speed up import progress
To disable and re-enable triggers, see code below
```
-- Disable triggers on a specific table
ALTER TABLE table_name DISABLE TRIGGER ALL;

-- To re-enable triggers
ALTER TABLE table_name ENABLE TRIGGER ALL;
```
---
### Step 5: Rebuild indices after data import is complete
Indexing is crucial for query performance (it for example avoids scanning unnecessary data), but building indiced while importing can take a lot of time.
Consider (re)building indices AFTER the data import is complete. see code below how to build a index after data import
`create index index_name on table_name (column_name);`
# Upload and *serve* static files using storage
## 1. Key features
- **Multi Protocol:** S3 compatible storage, RESTful API, TUS [resumable uploads](https://supabase.com/docs/guides/storage/uploads/resumable-uploads)
- **Global CDN:** *serve* your assets with fast performance from over 285 cities worldwide
- **Image Optimization:** resize, compress and transform media files with built in image processing
- **Fine-grained Access Control:** Manage file permissions with row-level security and custom policies
- **Multiple Bucket Types:** Specialized storage solutions for different use cases
## 2. Get started
Choose the bucket type that fits your use case:
- [Files buckets](https://supabase.com/docs/guides/storage/quickstart)
- [Analytics buckets](https://supabase.com/docs/guides/storage/analytics/introduction)
- [Vector buckets](https://supabase.com/docs/guides/storage/vector/introduction)
## 3. Examples
Working sample projects for common Storage integration patterns:
- [Storage templates and examples](https://github.com/supabase/supabase/tree/master/examples/storage)
- [Resumable Uploads with Uppy](https://github.com/supabase/supabase/tree/master/examples/storage/resumable-upload-uppy)
## 4. Resources
Source code and REST API reference for the Storage service:
- [Supabase Storage API](https://github.com/supabase/storage)
- [OpenAPI Spec](https://supabase.github.io/storage/)
# Explore drop-in UI components for your Supabase app
[ Explore drop-in UI components for your Supabase app](https://supabase.com/library)